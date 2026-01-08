import { Packet, StaticTypes } from "@/core";
const { bool, byte, long, int, short, string, stringASCII } = StaticTypes;

export class CharInfo {
    _packet: Packet = new Packet(0x3013);
    CharName = string();
    ServerTime = int();
    RefObjId = int();
    Scale = byte();
    CurLevel = byte();
    MaxLevel = byte();
    ExpOffset = long();
    SExpOffset = int();
    RemainGold = long();
    RemainSkillPoint = int();
    RemainStatPoint = short();
    RemainHwanCount = byte();
    GatheredExpPoint = int();
    Hp = int();
    Mp = int();
    AutoInverstExp = byte();
    DailyPK = byte();
    TotalPK = short();
    PkPenaltyPoint = int();
    HwanLevel = byte();
    PvpCape = byte();
    inventorySize = byte();
    inventoryItemCount = byte();

    Initalize() {
        this._packet = new Packet(0x3013);
        this._packet.massive = true;
    }
    Append(packet: Packet) {
        if (this._packet == null) {
            return;
        }

        for (let i = 0; i < packet.GetBytes().length; i++) {
            const b = byte();
            packet.TryRead(b);
            this._packet.TryWrite(b);
        }

    }
    Read() {
        this._packet.ToReadOnly();

        // const r = this._packet.reader;
        // this.ServerTime.read(r);
        // this.RefObjId.read(r);

        this._packet.TryRead(this.ServerTime);
        this._packet.TryRead(this.RefObjId);
        this._packet.TryRead(this.Scale);
        this._packet.TryRead(this.CurLevel);
        this._packet.TryRead(this.MaxLevel);
        this._packet.TryRead(this.ExpOffset);
        this._packet.TryRead(this.SExpOffset);
        this._packet.TryRead(this.RemainGold);
        this._packet.TryRead(this.RemainSkillPoint);
        this._packet.TryRead(this.RemainStatPoint);
        this._packet.TryRead(this.RemainHwanCount);
        this._packet.TryRead(this.GatheredExpPoint);
        this._packet.TryRead(this.Hp);
        this._packet.TryRead(this.Mp);
        this._packet.TryRead(this.AutoInverstExp);
        this._packet.TryRead(this.DailyPK);
        this._packet.TryRead(this.TotalPK);
        this._packet.TryRead(this.PkPenaltyPoint);
        this._packet.TryRead(this.HwanLevel);
        this._packet.TryRead(this.PvpCape);
        this._packet.TryRead(this.inventorySize);
        this._packet.TryRead(this.inventoryItemCount);
        console.log("OKUNAN", this.RefObjId.get(), this.ServerTime.get())


    }

}