// middlewares.js
import cors from 'cors';
import { json } from 'body-parser';

export const handleCors = cors();
export const handleJsonBody = json();
