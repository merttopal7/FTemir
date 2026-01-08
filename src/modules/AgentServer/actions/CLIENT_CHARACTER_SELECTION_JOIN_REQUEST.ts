import { Packet, StaticTypes } from "@/core";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class CLIENT_CHARACTER_SELECTION_JOIN_REQUEST extends Packet {
    static opcode = 0x7001;
    constructor() { super(CLIENT_CHARACTER_SELECTION_JOIN_REQUEST.opcode); }
    Name = string();

    Read() {
      this.TryRead(this.Name);
    }

    Build() {
        this.Reset();

        this.TryWrite(this.Name);
        
        return this;
    }
}