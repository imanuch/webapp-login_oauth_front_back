import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop()
  name?: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  password: string;

  @Prop({default: 'user'})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
