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
  body: "Welcome to CryptoRides chat app!",
  author: "Bot",
  authorName: "System",
};

interface ChatProps {
  onLogout: () => void;
  recipientId: string;
}

export const Chat: React.FC<ChatProps> = ({ onLogout, recipientId }) => {
  const [inputValue, setInputValue] = useState<string>("");
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
      try {
        const userId = (await getUserIdFromToken()) as string;
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
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
      console.log("New message added:", newMessage);
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

    const recipientIdNumber = parseInt(recipientId, 10);

    if (isNaN(recipientIdNumber)) {
      console.error("Invalid recipient ID:", recipientId);
      return;
    }

    console.log("Sending private message to recipient:", recipientId);

    const newMessage: Message = {
      id: Date.now(),
      body: inputValue.trim(),
      author: currentUserId!,
      authorName: "You",
    };

    // Add the sent message to the local state
    setMessages((previousMessages) => [...previousMessages, newMessage]);
    console.log(recipientIdNumber)
    socket.emit("privateMessage", {
      body: inputValue.trim(),
      recipientId: recipientIdNumber,
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
        <Typography variant="h6">Cryptorides Chat App</Typography>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", height: "60vh", overflowY: "scroll" }}>
        {messages.map((message, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: message.author === currentUserId ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Paper
              sx={{
                backgroundColor: message.author === currentUserId ? "#92bbff" : "lightgray",
                padding: 1,
                width: "fit-content",
                maxWidth: "80%",
                boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: '550', fontStyle: 'italic' }}>{message.authorName}</Typography>
              <Typography variant="body1">{message.body}</Typography>
            </Paper>
            <Typography variant="body2" sx={{ mt: 0.5, color: "#9E9E9E" }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>

          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant="outlined"
          placeholder="Type message here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSendMessage}
          fullWidth
        />
      </Box>
    </Paper>
  );
};
