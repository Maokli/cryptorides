import { Injectable } from '@nestjs/common';
import { jwtDecode } from "jwt-decode";

export const UserIdFromToken = (authorization : string): number =>   {
        const [type, token] = authorization?.split(' ') ?? [];
        if (!(type === 'Bearer') ){
            return null ; 
        }else{
            const payload = jwtDecode(token) ;
            const id = parseInt(payload.sub) ; 
            return id;
        }
    }
  