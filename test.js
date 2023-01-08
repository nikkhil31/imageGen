import { fabric } from 'fabric'
import fs from 'fs'



(() => {

    const out = fs.createWriteStream('output.png');

    var canvas = new fabric.Canvas(null, { width: 1080, height: 1920 });

    var json_data = fs.readFileSync('req.json', 'utf8');
    json_data = JSON.parse(json_data);
    const objects = JSON.stringify(json_data.template);
    canvas.loadFromJSON(objects, function () {
        canvas.renderAll();
        var stream = canvas.createPNGStream();
        stream.on('data', function (chunk) {
            out.write(chunk);
        });
    });

    // canvas.renderAll();

    // var stream = canvas.createPNGStream();
    // stream.on('data', function (chunk) {
    //     out.write(chunk);
    // });



})()