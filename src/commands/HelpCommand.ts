import { BaseCommand } from "../structures/BaseCommand";
import { MessageEmbed } from "discord.js";
import { IMessage } from "../../typings";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { createEmbed } from "../utils/createEmbed";

@DefineCommand({
    aliases: ["h", "command", "commands", "cmd", "cmds"],
    name: "help",
    description: "Mostrar la lista de comandos",
    usage: "{prefix}help [command]"
})
export class HelpCommand extends BaseCommand {
    public execute(message: IMessage, args: string[]): void {
        const command = message.client.commands.get(args[0]) ??
            message.client.commands.get(message.client.commands.aliases.get(args[0])!);
        if (command && !command.meta.disable) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.config.embedColor)
                    .setAuthor(`Información para el comando ${command.meta.name}`, "https://i.imgur.com/aPPapMg.png")
                    .addFields({ name: "**Nombre**", value: command.meta.name, inline: true },
                        { name: "**Descripción**", value: command.meta.description, inline: true },
                        { name: "**Alias**", value: `${Number(command.meta.aliases?.length) > 0 ? command.meta.aliases?.map(c => `${c}`).join(", ") as string : "None"}`, inline: true },
                        { name: "**Uso**", value: `**\`${command.meta.usage?.replace(/{prefix}/g, message.client.config.prefix) as string}\`**`, inline: true })
            ).catch(e => this.client.logger.error("HELP_CMD_ERR:", e));
        } else {
            message.channel.send(
                createEmbed("info", message.client.commands.filter(cmd => !cmd.meta.disable && cmd.meta.name !== "eval").map(c => `\`${c.meta.name}\``).join(" "))
                    .setAuthor("Lista de comandos")
                    .setThumbnail(message.client.user?.displayAvatarURL() as string)
                    .setFooter(`Usa ${message.client.config.prefix}help <command> para obtener más información sobre un comando específico.`, "https://i.imgur.com/aPPapMg.png")
            ).catch(e => this.client.logger.error("HELP_CMD_ERR:", e));
        }
    }
}