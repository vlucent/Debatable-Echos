// Key Word:Echo skill: Bravo
// var AWS = require('aws-sdk');
//P is not equal to NP
var https = require('https');

exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Hi, I'm a reasonable robot";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "StateRequestIntent") {
            say = "P is not equal to N P";
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "I'm never wrong";
            shouldEndSession = true;
            sessionAttributes = {};
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just say the name of a U.S. State, such as Massachusetts or California."
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        }
    }
};

function buildSpeechletResponse(say, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa App or alexa.amazon.com"
        },
        shouldEndSession: shouldEndSession
    };
}
