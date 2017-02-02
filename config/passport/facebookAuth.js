// Autenticacion con Facebook
'use strict'

const mongoose = require('mongoose')
const User = require('../../models/modelUsers')

const FacebookStrategy = require('passport-facebook').Strategy
// const TwitterStrategy = require('passport-twitter').Strategy
const config = require('./configAuth')



