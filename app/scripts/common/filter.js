'use strict';

angular.module("ones.common.filters", [])
        .filter("sprintf", function() {
            var filterFun = function(fmt, argv, _argv) {
                return sprintf(fmt, argv, _argv);
            };

            return filterFun;

//            var filterfun = function(person, sep) {
//                sep = sep || " ";
//                person = person || {};
//                person.first = person.first || "";
//                person.last = person.last || "";
//                return person.first + sep + person.last;
//            };
//            return filterfun;
        })
        .filter("rmbToBig", function() {
            return function(amount) {
                amount = amount || 0.00;
                return rmbToBig(amount);
            };
        })
        .filter('propsFilter', function() {
            return function(items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    items.forEach(function(item) {
                        var itemMatches = false;

                        var keys = Object.keys(props);
                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            };
        })
        .filter("dateFormat", function() {
            return function(timestamp, noTime) {
                if(!timestamp) {
                    return;
                }
                var d = new Date(parseInt(timestamp) * 1000);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var date = d.getDate();
                var hour = d.getHours();
                var minute = d.getMinutes();
                var second = d.getSeconds();
                
                var rs = sprintf("%s-%s-%s", year, month, date);
                if(!noTime) {
                    rs = rs+ sprintf(" %s:%s:%s", hour, minute, second);
                }
                
                return rs;
            };
        })
        .filter("idFormat", function(){
            return function(id) {
                return "#"+id;
            };
        })
        /**
         * 加个冒号
         * */
        .filter("colon", function(){
            return function(str, CJK) {
                return str + (CJK ? "：" : ":");
            };
        })
        //.filter("append|prepend")
        .filter("lang", ["$injector", function($injector){
            return function(str) {
                var rootScope = $injector.get("$rootScope");
                return rootScope.i18n.lang[str] || str;
            };
        }])
        .filter("toError", ["$rootScope", function($rootScope){
                return function(errors) {
                    console.log(errors);
                    if(!errors) {
                        return;
                    }
                    var i18n = $rootScope.i18n.lang;
                    var tips = [];
                    angular.forEach(errors, function(err, k){
                        if(err) {
                            return;
                        }
                        if(k in i18n.errors) {
                            tips.push(i18n.errors[k]);
                        } else {
                            tips.push(k);
                        }

                    });
                    return tips.join(", ");
                };
        }])
        ;
        