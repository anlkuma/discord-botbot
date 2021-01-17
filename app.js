//test test test


const Discord = require("discord.js");
const client = new Discord.Client();
//const {botToken, giphytoken} = require("./config.json");
//const giphyClient = require('giphy-js-sdk-core')
//gclient= giphyClient(giphytoken)
client.login(process.env.botToken);



/* BOT READY  */
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});


const prefix = "!"

/* React to messages */

client.on   ('message', msg => {

    /*replies to text messages*/
    if (msg.content.toLowerCase().startsWith(`${prefix}hello there`) ) {
        msg.reply("General Kenobi")
    }
    if (msg.content.toLowerCase().startsWith(`mfanami means`) ) {
        msg.reply("my boi")
    }
   

     
    /*replies to nudes (rickroll)*/
    if(msg.content.toLowerCase().startsWith(`${prefix}nudes`)){

        msg.reply("Here you go! <https://rb.gy/enaq3a>")
    }
/*==============================================================================================*/
    /*searches "random" on giphy and sends a random gif from top ten(two to ten?) results */
    // if(msg.content.toLowerCase().startsWith(`${prefix}randomgif`)){   
    //     gclient.search('gifs', {"q": "random"}).
    //     then((response)=>{
    //         var responses = response.data.length;
    //         var index = Math.floor(  (Math.random()*10)  +1  )   %responses;
    //         var output = response.data[index];
    //         console.log(output);
    //         msg.channel.send({files:[output.images.fixed_height.url]})
    //     }).catch(()=>{
    //         console.log('error')
    //     })
    // } 

    /*searches giphy with given keyword */
/*========================================================================*/
    if(msg.content.toLowerCase().startsWith(`${prefix}gif: `)){
       
        var searchTerm = msg.content.slice(5);
        console.log(searchTerm)
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.giphytoken}&limit=10&q=`
        url = url.concat(searchTerm)
        fetch(url).then(response => response.json())
                  .then(content => {
                                        let length = content.data.length;
                                        var index = Math.floor(  (Math.random()*10)  +1  )   %length;
                                        msg.channel.send(content.data[index].images.downsized.url);
                                    }).
        catch(()=>{
                    console.log('error')
                  })  
    } 

      /**fetches a random post from top 25 posts sorted by hot from r/memes  */ 
    if(msg.content.toLowerCase().startsWith(`${prefix}meme`)){
        var after = '';
           // const embed = new Discord.MessageEmbed();
            

        fetch(`https://www.reddit.com/r/memes.json?after=${after}`).then(response=> response.json())
        .then(body=>    {

            //Math.floor((Math.random() * x) + 1); random number between 1 and x
            //after = body.data.after


            var index = Math.floor((Math.random()* body.data.children.length ) + 1)

            if(body.data.children[index].data.post_hint==='image' || body.data.children[index].data.post_hint==='link' ){

                let imgsrc = body.data.children[index].data.url_overridden_by_dest
                // embed.setTitle(body.data.children[index].data.title)
                // embed.setImage(imgsrc);
                //`Hey there chief, ${member.user}! Welcome to the Dantaka dantaka official discord server!`, {files: [content.data[index].images.downsized.url]}
                msg.channel.send(`${body.data.children[index].data.title}`, {files:[imgsrc]});
            }

            else
            msg.channel.send("come again")

        }).catch(()=>{
            msg.channel.send("try again!");
        })

    }

    if(msg.content.toLowerCase().startsWith(`${prefix}sub: `)){
        
        var subreddit = msg.content.slice(6);
        console.log(subreddit);
        

        fetch(`https://www.reddit.com/r/${subreddit}.json?after=${after}`).then(response=> response.json())
        .then(body=>    {

            //Math.floor((Math.random() * x) + 1); random number between 1 and x
            //after = body.data.after


            var index = Math.floor((Math.random()* body.data.children.length ) + 1)

            if(body.data.children[index].data.post_hint==='image' || body.data.children[index].data.post_hint==='link' ){

                let imgsrc = body.data.children[index].data.url_overridden_by_dest
                // embed.setTitle(body.data.children[index].data.title)
                // embed.setImage(imgsrc);
                //`Hey there chief, ${member.user}! Welcome to the Dantaka dantaka official discord server!`, {files: [content.data[index].images.downsized.url]}
                msg.channel.send(`${body.data.children[index].data.title}`, {files:[imgsrc]});
            }

            else
            msg.channel.send("come again")

        })

    }
    



   
})


client.on('guildMemberAdd', member => {
    console.log("member added");
   

    


    let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphytoken}&limit=10&q=welcome`
   

    fetch(url).then(response => response.json())
    .then(content => {

       
        let length = content.data.length;
        var index = Math.floor(  (Math.random()*10)  +1  )   %length;
        client.channels.cache.get('747506311662534799').send(`Hey there chief, ${member.user}! Welcome to the Dantaka dantaka official discord server!`, {files: [content.data[index].images.downsized.url]});
       
     

    }).catch(()=>{

        console.log('error')
    })  


});


client.on('guildMemberRemove', member => {
    console.log("member left");

    


        let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphytoken}&limit=10&q=`
        url = url.concat("bye")

        fetch(url).then(response => response.json())
        .then(content => {

           
            let length = content.data.length;
            var index = Math.floor(  (Math.random()*10)  +1  )   %length;
            client.channels.cache.get('747506311662534799').send(`Goodbye, ${member.user}! `, {files: [content.data[index].images.downsized.url]});
           


        }).catch(()=>{

            console.log('error')
        })  
 
});







  