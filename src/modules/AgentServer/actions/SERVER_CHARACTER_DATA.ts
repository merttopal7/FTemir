import { Packet, StaticTypes } from "@/core";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class SERVER_CHARACTER_DATA extends Packet {
  static opcode = 0x3013;
  constructor() { super(SERVER_CHARACTER_DATA.opcode); }

  Read() {
    
  }

  Build() {
    this.Reset();

    return this;
  }
}