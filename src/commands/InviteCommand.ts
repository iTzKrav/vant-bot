import { BaseCommand } from "../structures/BaseCommand";
import { IMessage } from "../../typings";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { createEmbed } from "../utils/createEmbed";
import { disableInviteCmd } from "../config";

@DefineCommand({
    name: "invite",
    description: "Envía el enlace de invitación del bot",
    usage: "{prefix}invite",
    disable: disableInviteCmd
})
export class InviteCommand extends BaseCommand {
    public async execute(message: IMessage): Promise<void> {
        message.channel.send(
            createEmbed("info")
                .addField(`${this.client.user!.tag} - Invite Link`, `**[Haga clic aquí para invitar a este bot](${await this.client.generateInvite({ permissions: 53857345 })})**`)
        ).catch(e => this.client.logger.error("PLAY_CMD_ERR:", e));
    }
}
