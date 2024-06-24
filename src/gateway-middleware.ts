import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

export function verifyGatewayRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("req.headers", req.headers);
  if(!req.headers?.gatewaytoken){
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway-headers not present');
  }
  const token: string = req.headers?.gatewaytoken as string;
  if(!token){
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway-token not present');
  }
  try{
    const payload: {id: string, iat: number} = JWT.verify(token, '8f81e5ee261bd5a03f14b6b5316815ff') as {id: string, iat: number} ;
    if(!token.includes(payload?.id)){
      throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway-payload-id not present');
    }
  }catch(err){
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway-cartch error');

  }
  next();
}
