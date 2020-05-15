
const { exec } = require('child_process');

module.exports.run = async (MAIN, message, prefix, discord) => {

  let guild = MAIN.guilds.cache.get(discord.id);
  let convert_message = '';

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
    let log = '';
    if(stdout){log = `stdout: ${stdout}`}
    if(stderr){log += `\nstderr: ${stderr}`}
    let botRestart = log.indexOf('Already up to date') < 0 ? true : false;
    let restart = botRestart ? ', and restarting in 8sec.' : '.';

    if(MAIN.config.log_channel){
      let pull_embed = new MAIN.discordjs.MessageEmbed()
      .setColor('00ff00')
      .setAuthor('Pulling update'+restart)
      .setDescription(log);
      guild.members.fetch(message.author.id).then( TARGET => {
        TARGET.send(pull_embed).catch(console.error);
      });
    } else { console.log(MAIN.Color.green+log+MAIN.Color.reset); }
    setTimeout(async function() {
      if(botRestart){
        MAIN.restart('due to an update.');
      }
    }, 8000);

  });

}
