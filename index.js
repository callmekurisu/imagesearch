var fs = require("fs")
var express = require('express')
var app = express()
var http = require('http')
var https = require('https')
var request = require('request')
var random = require('random-js')
var Bing = require('node-bing-api')({accKey:"9a21f986757f4411a312afabd71f6f2a" })
var html = (fs.readFileSync('main.html').toString())
fs.writeFileSync('api.txt', " ")
var mongo = require('mongodb').MongoClient
app.set('port', (process.env.PORT || 5000));

  app.get('/',function (req, res) {
     res.send(html)
})

     /*??? do I need initialization ???
     var results;
     var date = new Date();
     //connect to database
     mongo.connect('mongodb://callmekurisu:password123@ds157479.mlab.com:57479/heroku_r7238prm', function(err, db){
  
      results = db.collection('latest').insert({
      searchTerm: 'money', 
      timestamp: date ,
      content: 'images',
      }, function(err, data){
      //handle error
      if (err){
	console.log('Mad bugs in yo code son!');
      }
	else {
	//stringify output
	  //console.log(JSON.stringify(data.ops[0]));
	
      
    }
    //other operations
    
  })
db.close();
});
     
mongo.connect('mongodb://callmekurisu:password123@ds157479.mlab.com:57479/heroku_r7238prm', function(err, db){
  
      results = db.collection('latest').insert({
      searchTerm: 'clock', 
      timestamp: date ,
      content: 'images',
      }, function(err, data){
      //handle error
      if (err){
	console.log('Mad bugs in yo code son!');
      }
	else {
	//stringify output
	  //console.log(JSON.stringify(data.ops[0]));
	
      
    }
    //other operations
    
  })
db.close();
});

mongo.connect('mongodb://callmekurisu:password123@ds157479.mlab.com:57479/heroku_r7238prm', function(err, db){
  
      results = db.collection('latest').insert({
      searchTerm: 'time', 
      timestamp: date ,
      content: 'images',
      }, function(err, data){
      //handle error
      if (err){
	console.log('Mad bugs in yo code son!');
      }
	else {
	//stringify output
	  //console.log(JSON.stringify(data.ops[0]));
	
      
    }
    //other operations
    
  })
db.close();
});
  */
  var latestSearch = (fs.readFileSync('latest.txt').toString())
  app.get('/api/latest/imagesearch/',function (req, res) {
     var grab;
    mongo.connect('mongodb://heroku_r7238prm:8tvj68r6go58dssh7imbgsipot@ds157479.mlab.com:57479/heroku_r7238prm', function(err, db){
    grab = db.collection('latest').find({ content: 'images'} ).toArray(function(err, doc) //find if a value exists
    {
        if(doc) //if it does
        {
	 
	    fs.writeFileSync('latest.txt', '{"what"'+' : '+'"'+doc[doc.length-1]['searchTerm']+'", '+'"when"'+' : '+'"'+doc[doc.length-1]['timestamp']+'"}'+', '+'{"what"'+' : '+'"'+doc[doc.length-2]['searchTerm']+'", '+'"when"'+' : '+'"'+doc[doc.length-2]['timestamp']+'"}'+', '+'{"what"'+'  : '+'"'+doc[doc.length-3]['searchTerm']+'", '+'"when"'+' : '+'"'+doc[doc.length-3]['timestamp']+'"}');
            //console.log(doc[doc.length-1]);
        }
        else{
            console.log('mongodb error');
        }
        db.close();
    });
    
}); 
    res.send('{"what"'+' : '+'"'+doc[doc.length-1]['searchTerm']+'", '+'"when"'+' : '+'"'+doc[doc.length-1]['timestamp']+'"}'+', '+'{"what"'+' : '+'"'+doc[doc.length-2]['searchTerm']+'", '+'"when"'+' : '+'"'+doc[doc.length-2]['timestamp']+'"}'+', '+'{"what"'+'  : '+'"'+doc[doc.length-3]['searchTerm']+'", '+'"when"'+' : '+'"'+doc[doc.length-3]['timestamp']+'"}') 
})
  
  
   app.get('/api/imagesearch/:searchTerm/',function (req, res) {
     var search = req.params.searchTerm
     var r = random() //fake pagination with random number generator
     Bing.images(search,{
       top: 100,
       skip: r.integer(1,10) * 10
    }, function(error, res, body){

         for (i=0;i<10;i++){
	 //for debugging
	 //console.log('{"webUrl"'+":"+'"'+body.value[i]['hostPageDisplayUrl']+'"'+', '+'"altText"'+":"+'"'+body.value[i]['name']+'", ' + '"thumbnail"'+':'+'"'+body.value[i]['thumbnailUrl']+'"'+"}")
	  
	  fs.appendFile('api.txt','{"webUrl"'+":"+'"'+body.value[i]['hostPageDisplayUrl']+'"'+', '+'"altText"'+":"+'"'+body.value[i]['name']+'", ' + '"thumbnail"'+':'+'"'+body.value[i]['thumbnailUrl']+'"'+"},", function(err,data){
	    if (err) {
	      console.log('Error!')
	    }
	  })
	}
    });  
     
     var results;
     var date = new Date();
     //connect to database
     mongo.connect('mongodb://heroku_r7238prm:8tvj68r6go58dssh7imbgsipot@ds157479.mlab.com:57479/heroku_r7238prm', function(err, db){
  
      results = db.collection('latest').insert({
      searchTerm: search,
      timestamp: date ,
      content: 'images',
      }, function(err, data){
      //handle error
      if (err){
	console.log('Mad bugs in yo code son!');
      }
	else {
	//stringify output
	  //console.log(JSON.stringify(data.ops[0]));
	
      
    }
    //other operations
    
  })
db.close();
});
     
     setTimeout((function () {
     var display = (fs.readFileSync('api.txt').toString())
     fs.writeFileSync('api.txt', " ")
     var end = display.length -1
     res.send('['+display.substring(1,end)+']')  
       
    }),3000) 
     
     
})
   
   
    
  /* Use this to debug search results
   *  
   app.get('/api/searchResults',function (req, res) {
     var display = (fs.readFileSync('api.txt').toString())
     var end = display.length -1
     res.send('['+display.substring(1,end)+']')
}) */


     //comment out to run local
    app.listen(process.env.PORT, '0.0.0.0', function(err) {
  console.log("Started listening on %s", app.url);
});
  
  /*uncomment out for running on localhost
    app.listen(5000, function(err) {
  console.log("Started listening on port 5000...");
});*/
    
    
