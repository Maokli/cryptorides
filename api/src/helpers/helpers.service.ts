import { Injectable } from '@nestjs/common';
import { jwtDecode } from "jwt-decode";
import { Request } from 'express';

@Injectable()
export class HelpersService {
    async idFromToken(authorization : string): Promise <null | number>  {
        const [type, token] = authorization?.split(' ') ?? [];
        if (!(type === 'Bearer') ){
            return null ; 
        }else{
            const payload = jwtDecode(token) ;
            const id = parseInt(payload.sub) ; 
            return id ; 
        }
      }
}
