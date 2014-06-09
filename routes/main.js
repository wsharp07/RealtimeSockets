/**
 * Created by wsharp on 6/8/14.
 */
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});