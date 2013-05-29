$(document).ready(function() {

  var tincan = new TinCan ({
    recordStores: [{
          endpoint: "http://uoc-lrs.herokuapp.com/xapi/",
          username: "<Test User>",
          password: "<Test User's Password>"
      }
    ]
  });

  var sample = {
    actor: {
      name: "Sally Glider",
      mbox: "mailto:sally@example.com"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/experienced",
      display: {
        ca: "ha experimentat"
      }
    },
    object: {
    },
    context: {
      instructor: {
        name: "Irene Instructor",
        mbox: "mailto:irene@example.com"
      },
      contextActivities:{
        parent: {
          id: "http://example.com/activities/hang-gliding-class-a"
        },
        grouping: {
          id: "http://example.com/activities/hang-gliding-school"
        }
      }
    }
  }

  $("a[data-lrs-object-id]").on("click", function (e) {

    e.preventDefault();

    sample.object.id = $(this).attr('data-lrs-object-id');
    sample.object.definition = {};
    sample.object.definition.type = $(this).attr('data-lrs-object-type');
    sample.object.definition.name = {};
    sample.object.definition.name.ca = $(this).attr('data-lrs-object-name');
    sample.object.definition.extensions = {};
    sample.object.definition.extensions['uoclrs:classroom:domain:id'] = $(this).attr('data-lrs-object-params-domainId');

    tincan.sendStatement(sample);
  });

});