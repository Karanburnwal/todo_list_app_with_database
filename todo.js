const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs')

mongoose.connect("mongodb+srv://dbkaran:Karan@123@cluster0.p32px.mongodb.net/datadb" ,{useNewUrlParser:true, useUnifiedTopology: true});

const listSchema=new mongoose.Schema({
    name:String
})
const List=mongoose.model('List',listSchema);



var dayName=['sun','mon','tue','wed','thu','fri','sat'];

var items=[
    {name:"eat"},
    {name:"food"}
];

app.get('/',function(req,res){
    const today=new Date();

    const day=today.getDay();
    var options={
        weekday: "short",
        day: "numeric",
        month: "long"
    };
    var name=today.toLocaleDateString("hi-IN",options)
    List.find(function(err,lists){
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{name:name,newItem:lists});
        }
        
    })

})


app.post('/',function(req,res){
    var item=req.body.newItem;
    let item_obj={name:item};
    // items.push(item_obj);

    const list=new List(item_obj);
    list.save();
    res.redirect('/');
})

app.post('/delete',function(req,res){
    console.log(req.body);
    List.findByIdAndRemove({_id:req.body.checkbox_id},{useFindAndModify:false},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("successfully deleted");
        }
    })
    res.redirect('/');
})

let port=process.env.PORT;
if(port==null || port==""){
    port=3000;
}

app.listen(port,function(){
    console.log("server is running");
})

