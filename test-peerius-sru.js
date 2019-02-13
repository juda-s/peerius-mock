window.PeeriusWtcTestCallbacks =
    [{
        name:'homeSection2',
        position: 'homepage_Section2_1_ru',
        recommendation: ["BP_310462", "BP_414489", "BP_423045", "BP_529947", "BP_543317", "BP_543345", "BP_556771", "BP_556806", "BP_556428", "BP_414468"]
    },{
        name:'productDetails2',
        position: 'productDetails_SectionCarousel_2_ru',
        recommendation: ["BP_310462", "BP_414489", "BP_423045", "BP_529947", "BP_543317", "BP_543345", "BP_556771", "BP_556806", "BP_556428", "BP_414468"]
    },{
        name:'searchEmpty3',
        position: 'SearchEmpty_SectionMarketing_3_ru',
        recommendation: ["BP_310462", "BP_414489", "BP_423045", "BP_529947", "BP_543317", "BP_543345", "BP_556771", "BP_556806", "BP_556428", "BP_414468"]
    },{
        name:'emptyCartPage4',
        position: 'emptyCartPage_Section1_4_ru',
        recommendation: ["BP_310462", "BP_414489", "BP_423045", "BP_529947", "BP_543317", "BP_543345", "BP_556771", "BP_556806", "BP_556428", "BP_414468"]
    },{
        name:'notFoundMarketing',
        position: 'notFound_SectionMarketing_5_ru',
        recommendation: ["BP_310462", "BP_414489", "BP_423045", "BP_529947", "BP_543317", "BP_543345", "BP_556771", "BP_556806", "BP_556428", "BP_414468"]
    },{
        name:'orderConfirmation1',
        position: 'orderConfirmationPage_Section1_6_ru',
        recommendation: ["BP_310462", "BP_414489", "BP_423045", "BP_529947", "BP_543317", "BP_543345", "BP_556771", "BP_556806", "BP_556428", "BP_414468"]
    }];

(function () {
    "use strict";

    var getUrlParameter = function (url, name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
        if (results == null) {
            return null;
        }
        else {
            return decodeURI(results[1]) || 0;
        }
    };

    window.Peerius = {
        smartRecsClick: function (id) {
            console.log("PEERIUS-TEST: Clicked on id " + id + ", going to another page");
        },
        smartRecsSendClick: function (id) {
            console.log("PEERIUS-TEST: Clicked on id " + id + ", staying on the same page");
        },
        sendAjax: function (url) {
            var ids = getUrlParameter(url, 'ids');
            var idsArray = ids.split(',');
            for (var i in idsArray) {
                if (idsArray.hasOwnProperty(i)) {
                    console.log('PEERIUS-TEST: Shown recommendation ' + idsArray[i]);
                }
            }
        }
    };

    console.log("PEERIUS-TEST: Test started");

    if (!window.PeeriusCallbacks) {
        console.error('PeeriusCallbacks not defined')
    } else {
        console.log('PeeriusCallbacks defined')
    }

    console.log('PEERIUS-TEST: Start parsing callback');

    var tracking = window.PeeriusCallbacks['track'] || undefined;
    var callback = window.PeeriusCallbacks['smartRecs'] || undefined;

    var type = tracking['type'] || undefined;
    var lang = tracking['lang'] || undefined;
    var user = tracking['user'] || undefined;
    var channel = tracking['channel'] || undefined;
    var abTestContent = tracking['abTestContent'] || undefined;
    var recContent = tracking['recContent'] || undefined;

    var name = user['name'] || undefined;
    var email = user['email'] || undefined;

    console.log("PEERIUS-TEST: Start parsing PeeriusCallbacks");

    if (!tracking) {
        console.error('track field is missing from PeeriusCallbacks');
    }
    if (!callback) {
        console.error('smartRecs field is missing from PeeriusCallbacks');
    }
    if (!(typeof callback == 'function')) {
        console.error('smartRecs field is not a function');
    }

    if (!type) {
        console.error('type field is missing from PeeriusCallbacks');
    } else {
        console.log('PEERIUS-TEST: type: ' + type);
    }

    if (!lang) {
        console.error('lang field is missing from PeeriusCallbacks');
    } else {
        console.log('PEERIUS-TEST: lang: ' + lang);
    }

    if (!user) {
        console.error('user field is missing from PeeriusCallbacks');
    } else {
        console.log('PEERIUS-TEST: user: ', user);
    }

    if (!channel) {
        console.warn('channel field is missing from PeeriusCallbacks');
    } else {
        console.log('PEERIUS-TEST: channel: ' + channel);
    }

    if (!abTestContent) {
        console.warn('abTestContent field is missing from PeeriusCallbacks');
    } else {
        console.log('PEERIUS-TEST: abTestContent: ' + abTestContent);
    }

    if (!recContent) {
        console.warn('recContent field is missing from PeeriusCallbacks');
    } else {
        console.log('PEERIUS-TEST: recContent: ' + recContent);
    }

    console.log("PEERIUS-TEST: End parsing PeeriusCallbacks");

    var wtcTest = window.PeeriusWtcTestCallbacks || undefined;

    var response;

    if (!wtcTest) {
        console.log("PEERIUS-TEST: PeeriusWtcTestCallbacks not defined, no recommendation will be provided");
    } else {
        console.log("PEERIUS-TEST: Preparing response")
        response = wtcTest.map(function(element){
            var recs = [],
                widget = element.recommendation,
                name = element.name;

            if(widget){
                recs = widget.map(function(id){
                    var recommendation = {
                        id: 'P_' + id,
                        refCode: id
                    };
                    if (recContent != 'refCodeOnly') {
                        recommendation.url = 'URL' + id;
                    }
                    return recommendation;
                });
            }
            return {
                widget: name + 'json',
                alias: name + 'widget',
                position: element.position,
                recs: recs
            }
        });

    }

    callback.call(this, response);
})();
