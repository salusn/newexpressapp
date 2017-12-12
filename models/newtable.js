// jshint ignore: start
var express    = require('express');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NewtableSchema   = new Schema({
    name: String,
    value : String
});

module.exports = mongoose.model('Newtable', NewtableSchema);