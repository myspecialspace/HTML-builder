//подключаем модуль path (для работы с путями)
const path = require('node:path');
//подключаем модуль fs(file system, для работы с файлами и папками => создавать,удалять,переименовывать файлы и папки,записывать и считывать данные)
const fs = require('node:fs');
//cтандартные потоки ввода/вывода информации (I/O - input/output),  process.stdin и process.stdout
//const { stdin, stdout } = process;
const process = require('node:process');
//константа с именем файла, откуда будем считывать данные
const filename = 'text.txt';

//создаем поток stream, fs.ReadStream наследует от stream.Readable
//получает путь к файлу __dirname и название файла filename
let stream = new fs.ReadStream(path.join(__dirname, filename), 'utf8');

//при помощи метода .on() мы подписываемся на событие 'readable' объекта stream.
stream.on('readable', function(){
  let data = stream.read();
  //console.log(data);
  //поток вывода process.stdout, метод stdout.write() принимает в качестве аргумента строку и выводит её в консоль
  if(data) process.stdout.write(data);
});
//закрываем поток
stream.on('end', () => {
    stream.close();
});