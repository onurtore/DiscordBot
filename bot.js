
Discord = require("discord.js");
const Quote = require('inspirational-quotes');

class Bot{
    constructor(name,token,authorID){
        this.name     = name;
        this.token    = token; 
        this.version  = 1.0; 
        this.bot      = new Discord.Client();
        this.authorID = authorID
        this.state    = "Ready"
    }
    init(){
        this.bot.login(this.token);
        this.bot.on("ready", () => { 
            console.log("Hello, I am connected as: " + this.bot.user.tag);
        });
        this.bot.on("message",(receivedMessage) => {
            this.processCommand(receivedMessage);
        });
    }
    processCommand(receivedMessage){
        console.log(this.state);

        if(this.state != "Ready")
            return;

        if(receivedMessage.author == this.bot.user) return;
        this.state = "Pending";

        let fullCommand    = receivedMessage.content.substr(4)
        let splitCommand   = fullCommand.split(' ') // Split the message up in to pieces for each space
        let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
        let args      = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

        console.log("Command received: " + primaryCommand)
        console.log("Arguments: " + args) // There may not be any arguments


        if(primaryCommand == "tanış"){
            if(!this.checkUser(receivedMessage)){
                receivedMessage.channel.send("Merhaba, yetkili değilsiniz..." );
            }
            this.tanisCommand(args,receivedMessage);
        }
        else if(primaryCommand == "quote"){this.quoteCommand(args,receivedMessage);}
        else if (primaryCommand.includes("*")){this.mulCommand(receivedMessage);}
        else if (primaryCommand.includes("/")){this.divCommand(receivedMessage);}
        else if (primaryCommand.includes("+")){this.addCommand(receivedMessage);}
        else if (primaryCommand.includes("-")){this.subCommand(receivedMessage);}

        console.log("hello world");
        this.state = "Ready";
        console.log(this.state);
    }
    quoteCommand(args,receivedMessage){
        receivedMessage.channel.send( Quote.getRandomQuote() );
        return;
    }
    mulCommand(receivedMessage){
        let fullCommand = receivedMessage.content.substr(4)
        let x = fullCommand.toString().split('*')[0];
        let y = fullCommand.toString().split('*')[1];
        let ans = parseFloat(x) * parseFloat(y);
        receivedMessage.channel.send( ans.toString() );
    }
    divCommand(receivedMessage){
        let fullCommand = receivedMessage.content.substr(4)
        let x = fullCommand.toString().split('/')[0];
        let y = fullCommand.toString().split('/')[1];
        let ans = parseFloat(x) / parseFloat(y);
        receivedMessage.channel.send( ans.toString() );
    }
     addCommand(receivedMessage){
        let fullCommand = receivedMessage.content.substr(4)
        let x = fullCommand.toString().split('+')[0];
        let y = fullCommand.toString().split('+')[1];
        let ans = parseFloat(x) + parseFloat(y);
        receivedMessage.channel.send( ans.toString() );
    }
    addCommand(receivedMessage){
        let fullCommand = receivedMessage.content.substr(4)
        let x = fullCommand.toString().split('+')[0];
        let y = fullCommand.toString().split('+')[1];
        let ans = parseFloat(x) + parseFloat(y);
        receivedMessage.channel.send( ans.toString() );
    }
    subCommand(receivedMessage){
        let fullCommand = receivedMessage.content.substr(4)
        let x = fullCommand.toString().split('-')[0];
        let y = fullCommand.toString().split('-')[1];
        let ans = parseFloat(x) - parseFloat(y);
        receivedMessage.channel.send( ans.toString() );
    }
    checkUser(receivedMessage){
        if (receivedMessage.author.toString() == this.authorID ){return true;}
        else{return false;}
    }
}

const Servant = new Bot("Servant","","<@184192958096998400>")
Servant.init();