import { Packet, StaticTypes } from "@/core";
import { AuthenticationErrorCode } from "@/utils/Types";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class SERVER_AUTH_RESPONSE extends Packet {
    static opcode = 0xA103;
    constructor() { super(SERVER_AUTH_RESPONSE.opcode); }

    AuthenticationErrorCode: AuthenticationErrorCode;
    Result = byte();

    Read() {
        this.TryRead(this.Result);
        if (this.Result == 0x02) this.TryRead(this.AuthenticationErrorCode);
    }

    Build() {
        this.Reset();
        this.TryWrite(this.Result);
        if (this.Result == 0x02) this.TryWrite(this.AuthenticationErrorCode);
        return this;
    }
}