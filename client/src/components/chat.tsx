import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";
import { createWebSocket } from "../webSockets/webSocket";
import { getUserIdFromToken } from "../services/account.service";

interface Message {
  id: number;
  body: string;
  author: string;
  authorName: string;
}

const SystemMessage: Message = {
  id: 1,
  body: "Welcome to the CryptoRides chat app!",
  author: "Bot",
  authorName: "System",
};

interface ChatProps {
  onLogout: () => void;
}

export const Chat: React.FC<ChatProps> = ({ onLogout }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([SystemMessage]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = createWebSocket();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId= await getUserIdFromToken() as string ;
     
        setCurrentUserId(userId);
    
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("privateMessage", (newMessage: Message) => {
      console.log("Private message received:", newMessage);
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });

    socket.on("chat", (newMessage: Message) => {
      console.log("New message added", newMessage);
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("privateMessage");
      socket.off("chat");
    };
  }, [socket]);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || inputValue.trim().length === 0 || !socket) return;

    console.log("Sending private message to recipient:", recipientId);

    socket.emit("privateMessage", {
      body: inputValue.trim(),
      recipientId: parseInt(recipientId.trim(), 10), // Convert recipientId to an integer
    });
    setInputValue("");
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    onLogout();
  };

  return (
    <Paper sx={{ width: "80%", margin: "auto", padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Nest Chat App</Typography>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </Box>
      <div>
        {messages.map((message, idx) => (
          <Paper
            key={idx}
            sx={{
              backgroundColor: "#E3F2FD",
              padding: 1,
              mb: 1,
              width: "fit-content",
              maxWidth: "80%",
              alignSelf: currentUserId && message.author === currentUserId ? "flex-start" : "flex-end",
            }}
          >
            <Typography variant="body1">{message.authorName}</Typography>
            <Typography variant="body1">{message.body}</Typography>
            <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
              {new Date().toLocaleTimeString()}
            </Typography>
          </Paper>
        ))}
      </div>
      <div>
        <TextField
          variant="outlined"
          placeholder="Recipient's ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Type message here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSendMessage}
          fullWidth
        />
      </div>
    </Paper>
  );
};
