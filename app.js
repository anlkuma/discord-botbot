const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require('node-fetch');
const prefix = "!"
const botToken = process.env.BOT_TOKEN
const giphytoken = process.env.GIPHY_TOKEN
//const {botToken, giphytoken} = require("./config.json");


client.login(botToken);


/* BOT READY  */
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});



/* React to messages */
client.on   ('message', msg => {

    /*replies to text messages*/
    if (msg.content.toLowerCase().startsWith(`${prefix}hellothere`) ) {
        msg.reply("General Kenobi")
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
/*========================================================================*/

    /*searches giphy with given keyword */

    if(msg.content.toLowerCase().startsWith(`g${prefix}`)){
       
        var searchTerm = msg.content.slice(2);
        console.log(searchTerm)
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphytoken}&limit=10&rating=g&q=`
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
           
        const sortOptions = ["top", "hot", "new", "rising"];
        var sortIndex = Math.floor(Math.random() * sortOptions.length);

        

        fetch(`https://www.reddit.com/r/memes/${sortOptions[sortIndex]}.json?after=${after}`).then(response=> response.json())
        .then(body=>    {

            //Math.floor((Math.random() * x) + 1); random number between 1 and x
            //after = body.data.after
               
            console.log(`https://www.reddit.com/r/memes/${sortOptions[sortIndex]}.json?after=${after}`);
            var index = Math.floor((Math.random()* body.data.children.length ) + 1)

            if(body.data.children[index].data.post_hint==='image' || body.data.children[index].data.post_hint==='link' ){

                let imgsrc = body.data.children[index].data.url_overridden_by_dest
                // embed.setTitle(body.data.children[index].data.title)
                // embed.setImage(imgsrc);
              
                msg.channel.send(`${body.data.children[index].data.title}`, {files:[imgsrc]});
            }

            else
            msg.channel.send("come again")

        }).catch(()=>{
            msg.channel.send("try again!");
        })

    }

    if(msg.content.toLowerCase().startsWith(`r${prefix}`)){

        const sortOptions = ["top", "hot", "new", "rising"];
        const sort = Math.floor(Math.random() * sortOptions.length);
        
        var subreddit = msg.content.slice(2);
        console.log(subreddit);
        

        fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?after=${after}`).then(response=> response.json())
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

    let urls = [ 'https://media4.giphy.com/media/cJSDRt8csBx0A7YFfh/giphy.gif',
                'https://media3.giphy.com/media/3owzWkGtQ3us1pV0qc/giphy.gif', 'https://media.tenor.com/images/2afb6067cab74f3258c330035d909333/tenor.gif']

            const random = Math.floor(Math.random() * urls.length);    // 3 urls  ==> returns 0 to 2    
            console.log(random, urls[random]);
         //   url = urls. array[Math.floor(Math.random() * array.length)];
              //  url1 = urls[random]
              
              const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
              const serverName = member.guild.name;
              if (!channel) return;
              channel.send(`Hey there chief, ${member.user}! Welcome to the ${serverName} official discord server!`, {files: [urls[random]]});
   // client.channels.cache.get('747506311662534799').send(`Hey there chief, ${member.user}! Welcome to the Dantaka dantaka official discord server!`, {files: [urls[random]]});
       
    


    // let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphytoken}&limit=10&q=welcome`
   

    // fetch(url).then(response => response.json())
    // .then(content => {

       
    //     let length = content.data.length;
    //     var index = Math.floor(  (Math.random()*10)  +1  )   %length;
    //     client.channels.cache.get('747506311662534799').send(`Hey there chief, ${member.user}! Welcome to the Dantaka dantaka official discord server!`, {files: url1});
       
     

    // }).catch(()=>{

    //     console.log('error')
    // })  


});


client.on('guildMemberRemove', member => {
    console.log("member left");

    


        let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphytoken}&limit=10&q=`
        url = url.concat("bye")

        fetch(url).then(response => response.json())
        .then(content => {

           
            let length = content.data.length;
            var index = Math.floor(  (Math.random()*10)  +1  )   %length;


            const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
            
            if (!channel) return;
            //channel.send(`Goodbye, ${member.user}! `, {files: [content.data[index].images.downsized.url]});
            channel.send(`Goodbye, ${member.user}! `);


        }).catch(()=>{

            console.log('error')
        })  
 
});







  