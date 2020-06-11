function $bu_getBrowser(t) {
    var e,
        i,
        a = t || navigator.userAgent,
        s = !1,
        n = { i: "Internet Explorer", e: "Edge", f: "Firefox", o: "Opera", s: "Safari", n: "Netscape", c: "Chrome", a: "Android Browser", y: "Yandex Browser", v: "Vivaldi", x: "Other" };
    if (
        /bot|googlebot|facebook|SMART-TV|Dorado|slurp|wii|Opera Mini|silk|maxthon|SmartTV|maxton|mediapartners|dolfin|dolphin|adsbot|silk|bingbot|google web preview|chromeframe|seamonkey|opera mini|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|epiphany|konqueror|rekonq|symbian|webos|coolnovo|blackberry|bb10|RIM|PlayBook|PaleMoon|QupZilla|Otter|Midori|qutebrowser/i.test(
            a
        )
    )
        return { n: "x", v: 0, t: "unknown", donotnotify: "niche browser" };
    if (/iphone|ipod|ipad|kindle/i.test(a)) return { n: "x", v: 0, t: "mobile browser", donotnotify: "mobile" };
    for (
        var o = /iphone|ipod|ipad|android|mobile|phone|ios|iemobile/i.test(a),
            r = [
                ["Trident.*rv:VV", "i"],
                ["Trident.VV", "io"],
                ["MSIE.VV", "i"],
                ["Edge.VV", "e"],
                ["Vivaldi.VV", "v"],
                ["OPR.VV", "o"],
                ["YaBrowser.*Chrome.VV", "y"],
                ["Chrome.VV", "c"],
                ["Firefox.VV", "f"],
                ["Version.VV.{0,10}Safari", "s"],
                ["Safari.VV", "so"],
                ["Opera.*Version.VV", "o"],
                ["Opera.VV", "o"],
                ["Netscape.VV", "n"],
            ],
            l = 0;
        l < r.length;
        l++
    )
        if (a.match(new RegExp(r[l][0].replace("VV", "(\\d+\\.?\\d?)")), "i")) {
            e = r[l][1];
            break;
        }
    var c = parseFloat(RegExp.$1);
    if (!e) return { n: "x", v: 0, t: n[e], mobile: o };
    if (a.indexOf("Android") > -1) {
        var u = parseInt((/WebKit\/([0-9]+)/i.exec(a) || 0)[1], 10) || 2e3;
        return u <= 534 ? { n: "a", v: u, t: n.a, mob: !0, donotnotify: s, mobile: o } : { n: e, v: c, t: n[e] + " " + c, donotnotify: "mobile on android", mobile: o };
    }
    return (
        /windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(a) && (s = "oldOS"),
        "f" != e || (38 != Math.round(c) && 45 != Math.round(c)) || (s = "ESR"),
        "so" == e && ((c = 4), (e = "s")),
        "i" == e && 7 == c && window.XDomainRequest && (c = 8),
        "io" == e && ((e = "i"), (c = c > 6 ? 11 : c > 5 ? 10 : c > 4 ? 9 : c > 3.1 ? 8 : c > 3 ? 7 : 9)),
        "e" == e ? { n: "i", v: c, t: n[e] + " " + c, donotnotify: s, mobile: o } : { n: e, v: c, t: n[e] + " " + c, donotnotify: s, mobile: o }
    );
}
!(function (t, e, i) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? (module.exports = t(require("jquery"))) : t(e || i);
})(
    function (t) {
        var e = function (e, i, a) {
            "object" == typeof i && (i = i.mask);
            var s = {
                invalid: [],
                getCaret: function () {
                    try {
                        var t,
                            i = 0,
                            a = e.get(0),
                            n = document.selection,
                            o = a.selectionStart;
                        return n && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((t = n.createRange()).moveStart("character", -s.val().length), (i = t.text.length)) : (o || "0" === o) && (i = o), i;
                    } catch (t) {}
                },
                setCaret: function (t) {
                    try {
                        if (e.is(":focus")) {
                            var i,
                                a = e.get(0);
                            a.setSelectionRange ? a.setSelectionRange(t, t) : ((i = a.createTextRange()).collapse(!0), i.moveEnd("character", t), i.moveStart("character", t), i.select());
                        }
                    } catch (t) {}
                },
                events: function () {
                    e.on("keydown.mask", function (t) {
                        e.data("mask-keycode", t.keyCode || t.which), e.data("mask-previus-value", e.val());
                    })
                        .on(t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", s.behaviour)
                        .on("paste.mask drop.mask", function () {
                            setTimeout(function () {
                                e.keydown().keyup();
                            }, 100);
                        })
                        .on("change.mask", function () {
                            e.data("changed", !0);
                        })
                        .on("blur.mask", function () {
                            o === s.val() || e.data("changed") || e.trigger("change"), e.data("changed", !1);
                        })
                        .on("blur.mask", function () {
                            o = s.val();
                        })
                        .on("focus.mask", function (e) {
                            !0 === a.selectOnFocus && t(e.target).select();
                        })
                        .on("focusout.mask", function () {
                            a.clearIfNotMatch && !r.test(s.val()) && s.val("");
                        });
                },
                getRegexMask: function () {
                    for (var t = [], e, a, s, o, r, l, c = 0; c < i.length; c++)
                        (e = n.translation[i.charAt(c)])
                            ? ((a = e.pattern.toString().replace(/.{1}$|^.{1}/g, "")), (s = e.optional), (o = e.recursive) ? (t.push(i.charAt(c)), (r = { digit: i.charAt(c), pattern: a })) : t.push(s || o ? a + "?" : a))
                            : t.push(i.charAt(c).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    return (l = t.join("")), r && (l = l.replace(new RegExp("(" + r.digit + "(.*" + r.digit + ")?)"), "($1)?").replace(new RegExp(r.digit, "g"), r.pattern)), new RegExp(l);
                },
                destroyEvents: function () {
                    e.off(["input", "keydown", "keyup", "paste", "drop", "blur", "focusout", ""].join(".mask "));
                },
                val: function (t) {
                    var i,
                        a = e.is("input") ? "val" : "text",
                        s;
                    return arguments.length > 0 ? (e[a]() !== t && e[a](t), (s = e)) : (s = e[a]()), s;
                },
                calculateCaretPosition: function (t, i) {
                    var a = i.length,
                        s = e.data("mask-previus-value") || "",
                        n = s.length;
                    return 8 === e.data("mask-keycode") && s !== i ? (t -= i.slice(0, t).length - s.slice(0, t).length) : s !== i && (t >= n ? (t = a) : (t += i.slice(0, t).length - s.slice(0, t).length)), t;
                },
                behaviour: function (i) {
                    (i = i || window.event), (s.invalid = []);
                    var a = e.data("mask-keycode");
                    if (-1 === t.inArray(a, n.byPassKeys)) {
                        var o = s.getMasked(),
                            r = s.getCaret();
                        return (
                            setTimeout(
                                function (t, e) {
                                    s.setCaret(s.calculateCaretPosition(t, e));
                                },
                                10,
                                r,
                                o
                            ),
                            s.val(o),
                            s.setCaret(r),
                            s.callbacks(i)
                        );
                    }
                },
                getMasked: function (t, e) {
                    var o = [],
                        r = void 0 === e ? s.val() : e + "",
                        l = 0,
                        c = i.length,
                        u = 0,
                        d = r.length,
                        h = 1,
                        p = "push",
                        f = -1,
                        m,
                        g,
                        v;
                    for (
                        a.reverse
                            ? ((p = "unshift"),
                              (h = -1),
                              (m = 0),
                              (l = c - 1),
                              (u = d - 1),
                              (g = function () {
                                  return l > -1 && u > -1;
                              }))
                            : ((m = c - 1),
                              (g = function () {
                                  return l < c && u < d;
                              }));
                        g();

                    ) {
                        var b = i.charAt(l),
                            w = r.charAt(u),
                            y = n.translation[b];
                        y
                            ? (w.match(y.pattern)
                                  ? (o[p](w), y.recursive && (-1 === f ? (f = l) : l === m && (l = f - h), m === f && (l -= h)), (l += h))
                                  : w === v
                                  ? (v = void 0)
                                  : y.optional
                                  ? ((l += h), (u -= h))
                                  : y.fallback
                                  ? (o[p](y.fallback), (l += h), (u -= h))
                                  : s.invalid.push({ p: u, v: w, e: y.pattern }),
                              (u += h))
                            : (t || o[p](b), w === b ? (u += h) : (v = b), (l += h));
                    }
                    var _ = i.charAt(m);
                    return c !== d + 1 || n.translation[_] || o.push(_), o.join("");
                },
                callbacks: function (t) {
                    var n = s.val(),
                        r = n !== o,
                        l = [n, t, e, a],
                        c = function (t, e, i) {
                            "function" == typeof a[t] && e && a[t].apply(this, i);
                        };
                    c("onChange", !0 === r, l), c("onKeyPress", !0 === r, l), c("onComplete", n.length === i.length, l), c("onInvalid", s.invalid.length > 0, [n, t, e, s.invalid, a]);
                },
            };
            e = t(e);
            var n = this,
                o = s.val(),
                r;
            (i = "function" == typeof i ? i(s.val(), void 0, e, a) : i),
                (n.mask = i),
                (n.options = a),
                (n.remove = function () {
                    var t = s.getCaret();
                    return s.destroyEvents(), s.val(n.getCleanVal()), s.setCaret(t), e;
                }),
                (n.getCleanVal = function () {
                    return s.getMasked(!0);
                }),
                (n.getMaskedVal = function (t) {
                    return s.getMasked(!1, t);
                }),
                (n.init = function (o) {
                    if (
                        ((o = o || !1),
                        (a = a || {}),
                        (n.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch),
                        (n.byPassKeys = t.jMaskGlobals.byPassKeys),
                        (n.translation = t.extend({}, t.jMaskGlobals.translation, a.translation)),
                        (n = t.extend(!0, {}, n, a)),
                        (r = s.getRegexMask()),
                        o)
                    )
                        s.events(), s.val(s.getMasked());
                    else {
                        a.placeholder && e.attr("placeholder", a.placeholder), e.data("maskcfg") && e.attr("autocomplete", "off");
                        for (var l = 0, c = !0; l < i.length; l++) {
                            var u = n.translation[i.charAt(l)];
                            if (u && u.recursive) {
                                c = !1;
                                break;
                            }
                        }
                        c && e.attr("maxlength", i.length), s.destroyEvents(), s.events();
                        var d = s.getCaret();
                        s.val(s.getMasked()), s.setCaret(d);
                    }
                }),
                n.init(!e.is("input"));
        };
        t.maskWatchers = {};
        var i = function () {
                var i = t(this),
                    s = {},
                    n = "data-maskcfg-",
                    o = i.attr("data-maskcfg");
                if ((i.attr(n + "reverse") && (s.reverse = !0), i.attr(n + "clearifnotmatch") && (s.clearIfNotMatch = !0), "true" === i.attr(n + "selectonfocus") && (s.selectOnFocus = !0), a(i, o, s)))
                    return i.data("maskcfg", new e(this, o, s));
            },
            a = function (e, i, a) {
                a = a || {};
                var s = t(e).data("maskcfg"),
                    n = JSON.stringify,
                    o = t(e).val() || t(e).text();
                try {
                    return "function" == typeof i && (i = i(o)), "object" != typeof s || n(s.options) !== n(a) || s.mask !== i;
                } catch (t) {}
            },
            s = function (t) {
                var e = document.createElement("div"),
                    i;
                return (i = (t = "on" + t) in e) || (e.setAttribute(t, "return;"), (i = "function" == typeof e[t])), (e = null), i;
            };
        (t.fn.mask = function (i, s) {
            s = s || {};
            var n = this.selector,
                o = t.jMaskGlobals,
                r = o.watchInterval,
                l = s.watchInputs || o.watchInputs,
                c = function () {
                    if (a(this, i, s)) return t(this).data("maskcfg", new e(this, i, s));
                };
            return (
                t(this).each(c),
                n &&
                    "" !== n &&
                    l &&
                    (clearInterval(t.maskWatchers[n]),
                    (t.maskWatchers[n] = setInterval(function () {
                        t(document).find(n).each(c);
                    }, r))),
                this
            );
        }),
            (t.fn.masked = function (t) {
                return this.data("maskcfg").getMaskedVal(t);
            }),
            (t.fn.unmask = function () {
                return (
                    clearInterval(t.maskWatchers[this.selector]),
                    delete t.maskWatchers[this.selector],
                    this.each(function () {
                        var e;
                        t(this).data("maskcfg") && t(this).removeData("maskcfg");
                    })
                );
            }),
            (t.fn.cleanVal = function () {
                return this.data("maskcfg").getCleanVal();
            }),
            (t.applyDataMask = function (e) {
                var a;
                ((e = e || t.jMaskGlobals.maskElements) instanceof t ? e : t(e)).filter(t.jMaskGlobals.dataMaskAttr).each(i);
            });
        var n = {
            maskElements: "input,td,span,div",
            dataMaskAttr: "*[data-maskcfg]",
            dataMask: !0,
            watchInterval: 300,
            watchInputs: !0,
            useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && s("input"),
            watchDataMask: !1,
            byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
            translation: { 0: { pattern: /\d/ }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, recursive: !0 }, A: { pattern: /[a-zA-Z0-9]/ }, S: { pattern: /[a-zA-Z]/ } },
        };
        (t.jMaskGlobals = t.jMaskGlobals || {}),
            (n = t.jMaskGlobals = t.extend(!0, {}, n, t.jMaskGlobals)).dataMask && t.applyDataMask(),
            setInterval(function () {
                t.jMaskGlobals.watchDataMask && t.applyDataMask();
            }, n.watchInterval);
    },
    window.jQuery,
    window.Zepto
);
var psLibCarouselTimer = [],
    psLib = {
        BrowserRequeriments: { ie: 7, ff: 30, op: 12.1, sa: 7, ch: "auto" },
        IsMobile: !1,
        IsTablet: !1,
        IsTabletPortrait: !1,
        IsDesktop: !1,
        IsHD: !1,
        isOldIE: !1,
        DetectMobile: function (t) {
            var e = {
                detectMobileBrowsers: {
                    fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                    shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                },
            };
            return e.detectMobileBrowsers.fullPattern.test(t) || e.detectMobileBrowsers.shortPattern.test(t.substr(0, 4));
        },
        DetectTablet: function (t) {
            var e = { detectMobileBrowsers: { tabletPattern: /android|ipad|playbook|silk/i } };
            return e.detectMobileBrowsers.tabletPattern.test(t);
        },
        SetScreen: function () {
            var t = $(window).innerWidth();
            if ((t > 990 && (psLib.IsDesktop = !0), t > 1206 && (psLib.IsHD = !0), psLib.DetectMobile(navigator.userAgent) && (psLib.IsMobile = !0), psLib.DetectTablet(navigator.userAgent))) {
                var e = window.matchMedia("(orientation: portrait)").matches;
                (psLib.IsTablet = !0),
                    (psLib.IsTabletPortrait = !!e),
                    window.addEventListener("orientationchange", function () {
                        0 == screen.orientation.angle ? (psLib.IsTabletPortrait = !0) : (psLib.IsTabletPortrait = !1);
                    });
            }
            (navigator.appVersion.indexOf("MSIE 10") > -1 || navigator.appVersion.indexOf("MSIE 9") > -1 || navigator.appVersion.indexOf("MSIE 8") > -1) &&
                ((psLib.IsMobile = !1), (psLib.IsTablet = !1), (psLib.IsDesktop = !0), (psLib.IsHD = !1), (psLib.IsOldIE = !0)),
                navigator.appVersion.indexOf("MSIE 8") > -1 && $("html").addClass("lt-ie9");
        },
        CheckCompatibility: function () {
            (window.$buo_f = function () {
                $bu_getBrowser();
            }),
                $buo_f();
        },
        TableStripes: function (t) {
            psLib.IsOldIE &&
                $(".ps-table-stripped tbody tr", t).each(function () {
                    var t = $(this),
                        e,
                        i;
                    t.parent().find("tr").index(t) % 2 != 0 && t.addClass("ps-table-oddLine");
                });
        },
        FormResources: function (ctn) {
            var maskDefaults = { watchInterval: 10, clearIfNotMatch: !0, dataMask: !1, translation: { a: { pattern: /[a-zA-Z]/ }, "*": { pattern: /[a-zA-Z0-9]/ }, "?": { pattern: /\d/, optional: !0 }, 9: { pattern: /\d/, optional: !1 } } };
            $(".ps-frm-multiselect", ctn)
                .each(function () {
                    var t = $(this),
                        e = void 0 !== t.data("multiselecttitle") ? t.data("multiselecttitle") : "Selecione uma op&ccedil;&atilde;o",
                        i,
                        a = 0 == t.next(".ps-frm-multiselect-change").length,
                        s = t.is(".ps-frm-valid"),
                        n = !(!s || void 0 === t.data("onerror")) && t.data("onerror"),
                        o = t.is(":disabled"),
                        r = { title: e, isValid: s, onError: n },
                        l,
                        c;
                    t.removeData("onerror"), void 0 !== t.attr("id") ? (c = l = t.attr("id")) : ((c = "psLib-select-" + (l = Math.floor(100 * Math.random()))), t.attr("id", c));
                    var u = "psLib-ModalMultiple-" + l.toString(),
                        d = "psLib-ListMultiple-" + l.toString();
                    a && t.after("<div class='ps-frm-multiselect-change " + (s ? "ps-frm-valid" : "") + " " + (o ? "ps-frm-disabled" : "") + "' id='" + d + "' " + (n ? "data-onerror='" + n + "'" : "") + "></div>"),
                        t.data({ multiselectmodal: u, multiselectlist: d }),
                        psLib.FormMultiSelectCreateContent(d, u, c, l, a, r);
                })
                .off("change.pslib")
                .on("change.pslib", function () {
                    var t = $(this),
                        e = t.attr("id"),
                        i = t.data("multiselectlist"),
                        a = t.data("multiselectmodal"),
                        s;
                    t.find("option").each(function () {
                        var t = $(this),
                            e = t.is(":selected");
                        $("#" + a)
                            .find("input[value='" + t.val() + "']")
                            .prop("checked", e);
                    }),
                        psLib.FormMultiSelectConfig(e, a, i);
                }),
                $(".ps-frm-valid[data-onerror]").each(function () {
                    var t = $(this),
                        e = t.attr("data-onerror"),
                        i = e.indexOf("clone:") > -1;
                    if ((void 0 === t.data("guideinitialized") || "null" == typeof t.data("guideinitialized") || "false" == t.data("guideinitialized")) && !t.is(".ps-frm-multiselect")) {
                        i && ((e = e.replace("clone:", "")), (e = $(e).clone().html()));
                        var a =
                                "ps-frm-ctt-error-" +
                                Math.random()
                                    .toString(36)
                                    .replace(/[^a-z]+/g, "")
                                    .substr(0, 5),
                            s = '\t\t\t\t<div style="display:none;" class="ps-frm-ctt-error" id="' + a + '">';
                        i || (s += '\t\t\t\t\t<div class="ps-panel ps-panel-ico ps-panel-error">\t\t\t\t\t\t <div class="ps-panel-ctt">\t\t\t\t\t\t\t<span class="ps-ico ps-ico-alert"></span>'),
                            (s += e),
                            i || (s += "\t\t\t\t\t\t </div>\t\t\t\t\t</div>"),
                            (s += "\t\t\t\t</div>"),
                            $(this).data("onerror", "#" + a),
                            psLib.IsMobile
                                ? t.prev().is(".ps-frm-lbl-internal")
                                    ? t.prev().prev().is(".ps-frm-ctt-error") || t.prev().before(s)
                                    : t.is(".ps-frm-multiselect-change") && t.prev().prev().is(".ps-frm-lbl-internal")
                                    ? t.prev().prev().prev().is(".ps-frm-ctt-error") || t.prev().prev().before(s)
                                    : t.parent().is(".ps-frm-select")
                                    ? t.parent().before(s)
                                    : t.prev().is(".ps-frm-ctt-error") || t.before(s)
                                : t.parent().is(".ps-frm-select")
                                ? t.parent().after(s)
                                : t.after().is(".ps-frm-ctt-error") || t.after(s);
                    }
                }),
                $(".ps-frm-entry", ctn)
                    .off("change.pslib")
                    .on("change.pslib", function () {
                        var t = this.value;
                        (t = $.trim(t)), (this.value = t);
                    }),
                $(".ps-frm-phone", ctn)
                    .unmask()
                    .mask("(99) 9999.9999", maskDefaults)
                    .on("blur.pslib", function () {
                        var t = this.value,
                            e = psLib.FormValidatePhone(this.value);
                        psLib.FormShowFieldError(this, e);
                    }),
                $(".ps-frm-celPhone", ctn)
                    .unmask()
                    .mask("(99) 9.9999.999?", maskDefaults)
                    .on("blur.pslib", function () {
                        var t = this.value,
                            e = psLib.FormValidatePhone(this.value);
                        psLib.FormShowFieldError(this, e);
                    }),
                $(".ps-frm-phone[data-onlynumber='true']", ctn)
                    .unmask()
                    .mask("9999.9999?", maskDefaults)
                    .on("blur.pslib", function () {
                        var t = this.value,
                            e = psLib.FormValidatePhone(this.value);
                        psLib.FormShowFieldError(this, e);
                    }),
                $(".ps-frm-celPhone[data-onlynumber='true']", ctn)
                    .unmask()
                    .mask("9.9999.999?", maskDefaults)
                    .on("blur.pslib", function () {
                        var t = this.value,
                            e = psLib.FormValidatePhone(this.value);
                        psLib.FormShowFieldError(this, e);
                    }),
                $(".ps-frm-zipcode", ctn).unmask().mask("99999-999", maskDefaults),
                $(".ps-frm-money", ctn).unmask().mask("#.##0,00", maskDefaults),
                $(".ps-frm-date", ctn)
                    .unmask()
                    .mask("99/99/9999", maskDefaults)
                    .on("change.pslib", function () {
                        var t = $(this),
                            e = $.trim(t.val()),
                            i = !0;
                        e = e.split("/");
                        var a = new Date(e[2], parseInt(e[1]) - 1, e[0]);
                        "" == e || (parseInt(e[0]) == parseInt(a.getDate()) && parseInt(e[1]) == parseInt(a.getMonth()) + 1) || ((i = !1), psLib.IsOldIE && e == t.attr("placeholder") && (i = !0)), psLib.FormShowFieldError(this, i);
                    }),
                $(".ps-frm-cpf", ctn)
                    .unmask()
                    .mask("999.999.999-99", maskDefaults)
                    .on("blur.pslib", function () {
                        var t,
                            e = !0;
                        "" != this.value.replace(/[^\d]+/g, "") && (e = psLib.FormValidateCPF(this.value)), psLib.FormShowFieldError(this, e);
                    }),
                $(".ps-frm-cnpj", ctn)
                    .unmask()
                    .mask("99.999.999/9999-99", maskDefaults)
                    .on("blur.pslib", function () {
                        var t,
                            e = !0;
                        "" != this.value.replace(/[^\d]+/g, "") && (e = psLib.FormValidateCNPJ(this.value)), psLib.FormShowFieldError(this, e);
                    }),
                $(".ps-frm-email", ctn)
                    .off("blur.pslib")
                    .on("blur.pslib", function () {
                        var t = !0;
                        "" != this.value && (t = psLib.FormValidateMail(this.value)), psLib.FormShowFieldError(this, t);
                    }),
                $(".ps-frm-number", ctn)
                    .off("keydown.pslib")
                    .on("keydown.pslib", function (t) {
                        -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110]) ||
                            (65 == t.keyCode && !0 === t.ctrlKey) ||
                            (86 == t.keyCode && !0 === t.ctrlKey) ||
                            (82 == t.keyCode && !0 === t.ctrlKey) ||
                            (t.keyCode >= 35 && t.keyCode <= 39) ||
                            (!t.shiftKey && ((t.keyCode >= 48 && t.keyCode <= 57) || (t.keyCode >= 96 && t.keyCode <= 105))) ||
                            t.preventDefault();
                    }),
                $(".ps-frm-cleanup", ctn)
                    .off("keyup.fb blur.fb")
                    .on("keyup.fb blur.fb", function (t) {
                        var e = this.value,
                            i = "allowNumbers" == $(this).data("cleanuptext");
                        if (-1 !== $.inArray(t.keyCode, [38, 39, 40, 37, 16, 9]) || ((t.shiftKey || t.ctrlKey || t.altKey) && -1 !== $.inArray(t.keyCode, [38, 39, 40, 37, 16, 9]))) return !1;
                        (e = e.toUpperCase()), (e = psLib.FormCleanupString(e, i)), $(this).val(e);
                    }),
                $(".ps-frm-split", ctn)
                    .off("change.pslib")
                    .on("change.pslib", function () {
                        var t = $(this).data("split"),
                            e = this.value;
                        if ("string" == typeof t) {
                            (t = t.split(";")), (e = (e = e.replace(/\./g, "").replace(/\(/g, "")).split(t[0]));
                            for (var i = 1, a = t.length; i < a; i++)
                                $(t[i])
                                    .val(e[i - 1])
                                    .trigger("change");
                        }
                    }),
                $(".ps-frm-autocomplete", ctn).each(function () {
                    var t = $(this),
                        min = void 0 !== t.data("autocompleteminlength") ? t.data("autocompleteminlength") : 2,
                        source = t.data("autocompletesource"),
                        onselect = t.data("autocompleteselect"),
                        config = { minLength: min };
                    if (void 0 === source) return !1;
                    source.indexOf("function:") > -1
                        ? (config.source = eval("(window." + source.replace("function:", "") + ")"))
                        : source.indexOf("remote:") > -1
                        ? (config.source = source.replace("remote:", ""))
                        : (config.source = eval("window." + source)),
                        void 0 !== onselect && ((onselect = onselect.replace("()", "")), (config.select = eval("window." + onselect))),
                        $(this).autocomplete(config);
                }),
                psLib.IsMobile || $(".ps-frm-calendar", ctn).mask("99/99/9999"),
                $(".ps-frm-calendar", ctn)
                    .each(function () {
                        var t = $(this),
                            min = t.data("calendarmindate"),
                            max = t.data("calendarmaxdate"),
                            onselect = t.data("calendarselect"),
                            dft = t.data("calendardefaultdate"),
                            val = t.val();
                        if (void 0 !== t.data("guideinitialized") && "null" != typeof t.data("guideinitialized")) {
                            if ("false" != t.data("guideinitialized")) return;
                            t.next().remove();
                        }
                        if (psLib.IsMobile && t.is("input")) {
                            var nMin = psLib.FormCalendarMobileParams(min),
                                nMax = psLib.FormCalendarMobileParams(max),
                                nVal = psLib.FormCalendarMobileParams(val);
                            t.attr("type", "hidden").removeClass("ps-frm-entry");
                            var n =
                                '<input type="date" name="" class="ps-frm-entry ps-frm-valid ps-mob-dateBuffer" ' +
                                ("" != nMin ? 'min="' + nMin + '"' : "") +
                                " " +
                                ("" != nMax ? 'max="' + nMax + '"' : "") +
                                " " +
                                ("" != nVal ? 'value="' + nVal + '"' : "") +
                                ' placeholder="Selecione uma data" required/>';
                            t.after(n).prev().addClass("ps-frm-lbl-focus"),
                                $(".ps-mob-dateBuffer", ctn)
                                    .off("change.calendar_pslib")
                                    .on("change.calendar_pslib", function () {
                                        var t = $(this),
                                            e = t.prev("input"),
                                            i = t.val(),
                                            a = new Date(i).setHours(24),
                                            s = "",
                                            n = 0;
                                        if (void 0 !== this.getAttribute("min")) {
                                            for (var o = this.getAttribute("min"), r = 0, l = (o = o.split("-")).length; r < l; r++) o[r] = parseInt(o[r]);
                                            var c = new Date(o[0], o[1] - 1, o[2]);
                                            a < c && (alert("Data inválida, a data mínima permitida é " + $.datepicker.formatDate("dd/mm/yy", c)), n++);
                                        }
                                        if (void 0 !== this.getAttribute("max")) {
                                            for (var u = this.getAttribute("max"), r = 0, l = (u = u.split("-")).length; r < l; r++) u[r] = parseInt(u[r]);
                                            var d = new Date(u[0], u[1] - 1, u[2]);
                                            a > d && (alert("Data inválida, a data máxima permitida é " + $.datepicker.formatDate("dd/mm/yy", d)), n++);
                                        }
                                        n > 0 ? t.addClass("ps-frm-error") : t.removeClass("ps-frm-error"), (s = (i = i.split("-"))[2] + "/" + i[1] + "/" + i[0]), e.val(s).trigger("change");
                                    }),
                                t.off("change.calendar_pslib").on("change.calendar_pslib", function () {
                                    var fn;
                                    void 0 !== onselect && ((onselect = onselect.replace("()", "")), eval("fn = window." + onselect), fn.apply(this));
                                });
                        } else {
                            var nom = void 0 !== t.data("calendarnumberofmonths") ? t.data("calendarnumberofmonths") : 1,
                                config = {
                                    numberOfMonths: nom,
                                    onSelect: function (v, o) {
                                        var fn;
                                        ($(this).prev().addClass("ps-frm-lbl-focus"), void 0 !== onselect) && ((onselect = onselect.replace("()", "")), eval("fn = window." + onselect), fn.apply(this, [v, o]));
                                        psLib.FormShowFieldError(this, !0);
                                    },
                                };
                            void 0 !== dft && (config.defaultDate = dft), void 0 !== min && (config.minDate = min), void 0 !== max && (config.maxDate = max), $(this).datepicker("destroy").datepicker(config);
                        }
                        t.data("guideinitialized", "true");
                    })
                    .off("blur.psLib change.psLib")
                    .on("blur.psLib change.psLib", function (t) {
                        var e = $(this),
                            i = e.val(),
                            a = e.data("calendarmindate"),
                            s = e.data("calendarmaxdate"),
                            n = !0;
                        if (("blur" == t.type && psLib.IsMobile) || ("change" == t.type && !psLib.IsMobile)) {
                            i = psLib.IsMobile ? i.split("-") : i.split("/");
                            var o = psLib.IsMobile ? new Date(i[0], parseInt(i[1]) - 1, i[2]) : new Date(i[2], parseInt(i[1]) - 1, i[0]);
                            if ("" != i) {
                                if (
                                    (((!psLib.IsMobile || (parseInt(i[2]) == parseInt(o.getDate()) && parseInt(i[1]) == parseInt(o.getMonth()) + 1)) &&
                                        (psLib.IsMobile || (parseInt(i[0]) == parseInt(o.getDate()) && parseInt(i[1]) == parseInt(o.getMonth()) + 1))) ||
                                        ((n = !1), psLib.IsOldIE && i == e.attr("placeholder") && (n = !0)),
                                    void 0 !== a && a.indexOf("/") > -1)
                                ) {
                                    a = a.split("/");
                                    var r = new Date(a[2], parseInt(a[1]) - 1, a[0]);
                                    o.getTime() < r.getTime() && (n = !1);
                                }
                                if (void 0 !== s && s.indexOf("/") > -1) {
                                    s = s.split("/");
                                    var l = new Date(s[2], parseInt(s[1]) - 1, s[0]);
                                    o.getTime() > l.getTime() && (n = !1), console.log(n);
                                }
                            }
                            psLib.FormShowFieldError(this, n);
                        }
                    }),
                $(".ps-frm-slider", ctn).each(function () {
                    var t = $(this),
                        dft = t.data("sliderdefaultvalues"),
                        min = t.data("sliderminvalue"),
                        max = t.data("slidermaxvalue"),
                        icon = t.data("slidericon"),
                        step = t.data("slidersteps"),
                        orient = void 0 !== t.data("sliderorientation") ? t.data("sliderorientation") : "horizontal",
                        rge = void 0 === t.data("sliderrange") || t.data("sliderrange"),
                        onchange = t.data("slideronchange"),
                        config = { range: rge, orientation: orient };
                    void 0 !== dft && ("string" == typeof dft ? ((dft = dft.split(",")), (config.values = dft)) : (config.value = dft)),
                        void 0 !== min && (config.min = min),
                        void 0 !== max && (config.max = max),
                        void 0 !== step && (config.step = step),
                        void 0 !== onchange && ((onchange = onchange.replace("()", "")), (config.change = eval("window." + onchange))),
                        $(this).slider(config),
                        void 0 !== icon &&
                            $(this)
                                .children(".ui-slider-handle")
                                .addClass("ps-ico ps-glyph " + icon);
                }),
                $(".ps-frm-validate", ctn)
                    .off("click.pslib")
                    .on("click.pslib", function (e) {
                        e.preventDefault();
                        var t = $(this),
                            frm = t.data("validatescope");
                        if (void 0 === frm) return !1;
                        frm = $(frm);
                        var onlyVisible = void 0 === t.data("validateonlyvisible") || t.data("validateonlyvisible"),
                            scrollFirst = void 0 === t.data("validatescrollfirst") || t.data("validatescrollfirst");
                        if (psLib.FormValidate(frm, onlyVisible, scrollFirst)) {
                            var success = t.data("validatesuccess");
                            void 0 !== success && eval(success);
                        }
                    }),
                $(".ps-frm-lbl-internal + .ps-frm-entry", ctn)
                    .off("focus.psLib")
                    .on("focus.psLib", function () {
                        $(this).prev("label.ps-frm-lbl-internal").addClass("ps-frm-lbl-focus");
                    })
                    .off("blur.tsFrmLbl change.tsFrmLbl")
                    .on("blur.tsFrmLbl change.tsFrmLbl", function () {
                        var t = $(this),
                            e;
                        "" == t.val() ? t.prev("label.ps-frm-lbl-internal").removeClass("ps-frm-lbl-focus") : t.prev("label.ps-frm-lbl-internal").addClass("ps-frm-lbl-focus");
                    })
                    .each(function () {
                        var t;
                        $(this).trigger("change");
                    }),
                setTimeout(function () {
                    $(".ps-frm-lbl-internal + input.ps-frm-entry:-webkit-autofill", ctn).each(function () {
                        $(this).prev("label.ps-frm-lbl-internal").addClass("ps-frm-lbl-focus");
                    });
                }, 200),
                $(".ps-frm-lbl-internal + .ps-frm-select, .ps-frm-lbl-internal + .ps-frm-multiselect", ctn).each(function () {
                    var t;
                    $(this).prev("label.ps-frm-lbl-internal").addClass("ps-frm-lbl-focus");
                }),
                $(".ps-frm-calendar-availability", ctn).each(function () {
                    for (
                        var t = $(this),
                            opts = psLib.FormSelectValues2Array(t),
                            params = t.data(),
                            cfg = {
                                beforeShowDay: function (t) {
                                    return $.inArray($.datepicker.formatDate("dd/mm/yy", t), opts) > -1 ? [!0, "ps-frm-datepicker-availableDate", ""] : [!1, "", ""];
                                },
                            },
                            dMin = 0,
                            dMax = 0,
                            minDate,
                            maxDate,
                            i = 0,
                            l = opts.length;
                        i < l;
                        i++
                    ) {
                        var cDate = opts[i].split("/"),
                            dDate = new Date(parseInt(cDate[2]), parseInt(cDate[1]) - 1, parseInt(cDate[0]));
                        (0 == dMin || dDate.valueOf() < dMin) && ((dMin = dDate.valueOf()), (minDate = dDate)), dMax < dDate.valueOf() && ((dMax = dDate.valueOf()), (maxDate = dDate));
                    }
                    if (((minDate = new Date(minDate.setDate(minDate.getDate() - 1))), (maxDate = new Date(maxDate.setDate(maxDate.getDate()))), (cfg.minDate = minDate), (cfg.maxDate = maxDate), void 0 === params.calendarid)) {
                        var thisId = Math.floor(1e3 * Math.random());
                        params.calendarid = "psLib-calendar-availability-" + thisId;
                    }
                    void 0 !== params.calendarcallback &&
                        ((params.calendarcallback = params.calendarcallback.replace("()", "")),
                        eval("var fnVal = typeof window." + params.calendarcallback + " == 'function';"),
                        (cfg.onSelect = function (e, i) {
                            t.val(e), fnVal && window[params.calendarcallback].apply(this, [e, i]);
                        })),
                        opts.length > 0 &&
                            (void 0 === params.calendaravailabilityref
                                ? (t.after('<div class="ps-frm-calendar-availability ' + (t.is(".ps-frm-calendar-availability-white") ? "ps-frm-calendar-availability-white" : "") + '" id="' + params.calendarid + '"></div>'),
                                  t.data("calendaravailabilityref", params.calendarid))
                                : (params.calendarid = t.next().attr("id")),
                            $("#" + params.calendarid)
                                .datepicker("destroy")
                                .datepicker(cfg),
                            $("#" + params.calendarid)
                                .find(".ui-datepicker-today .ui-state-highlight")
                                .removeClass("ui-state-active"));
                }),
                $(".ps-frm-select-list", ctn).each(function () {
                    var t = $(this),
                        opts = psLib.FormSelectValues2Array(t, !1),
                        params = t.data(),
                        selectId = t.attr("id");
                    if (void 0 === params.selectlistid) {
                        var thisId = Math.floor(1e3 * Math.random());
                        params.selectlistid = "ps-frm-select-list-" + thisId;
                    }
                    if (void 0 === selectId) {
                        var thisId = Math.floor(1e3 * Math.random());
                        (selectId = "ps-frm-select-list-opts-" + thisId), t.attr("id", selectId);
                    }
                    if (opts.length > 0) {
                        var ctt = "",
                            generatedList = params.selectlistref,
                            listId = void 0 !== params.selectlistref ? params.selectlistref : params.selectlistid;
                        void 0 === params.selectlistref &&
                            (t.after('<ul class="ps-frm-select-list ' + (t.is(".ps-frm-select-list-white") ? "ps-frm-select-list-white" : "") + '" id="' + params.selectlistid + '"></ul>'), t.data("selectlistref", params.selectlistid));
                        for (var i = 0, l = opts.length; i < l; i++)
                            "" != opts[i].val && (ctt += '<li><a href="' + opts[i].val + '" class="' + (opts[i].isSel ? "ps-frm-sl-selected" : "") + '" data-selectlistref="#' + selectId + '">' + opts[i].text + "</a></li>");
                        $("#" + listId)
                            .html(ctt)
                            .find("a")
                            .off("click.pslib")
                            .on("click.pslib", function (e) {
                                e.preventDefault();
                                var t = $(this),
                                    list = t.parent().parent(),
                                    cl = "ps-frm-sl-selected",
                                    select = t.data("selectlistref"),
                                    val = t.attr("href"),
                                    txt = t.text();
                                list.find("a").removeClass(cl),
                                    t.addClass(cl),
                                    $(select).val(val),
                                    void 0 !== params.selectcallback &&
                                        ((params.selectcallback = params.selectcallback.replace("()", "")),
                                        eval("var fnVal = typeof window." + params.selectcallback + " == 'function';"),
                                        fnVal && window[params.selectcallback].apply(this, [val, txt, select, t]));
                            });
                    }
                }),
                psLib.IsMobile &&
                    $(".ps-frm-lbl-internal + .ps-frm-entry:disabled, .ps-frm-lbl-internal + .ps-frm-select-disabled, .ps-frm-lbl-internal + .ps-frm-multiselect:disabled").each(function () {
                        $(this).prev().addClass("ps-frm-lbl-disabled");
                    }),
                window.navigator.appVersion.indexOf("MSIE 8") > -1 &&
                    ($("label.ps-frm-radio, label.ps-frm-checkbox", ctn)
                        .each(function () {
                            var t = $(this).prev("input");
                            t.is(":checked") ? $(this).addClass("ps-frm-selected") : $(this).removeClass("ps-frm-selected"), t.is(":disabled") && $(this).addClass("ps-frm-disabled");
                        })
                        .off("click")
                        .on("click", function () {
                            var t = $(this),
                                e = t.prev("input"),
                                i = e.attr("name");
                            t.is(".ps-frm-disabled") ||
                                ($("input[name='" + i + "']").each(function () {
                                    $(this).next("label").removeClass("ps-frm-selected");
                                }),
                                e.trigger("click"),
                                e.is(":radio") ? t.addClass("ps-frm-selected") : e.is(":checkbox") && (e.is(":checked") ? t.addClass("ps-frm-selected") : t.removeClass("ps-frm-selected")));
                        }),
                    $("label.ps-frm-onOff-lbl", ctn)
                        .each(function () {
                            var t = $(this).prev("input");
                            t.is(":checked") ? $(this).addClass("ps-frm-onOff-selected") : $(this).removeClass("ps-frm-onOff-selected"), t.is(":disabled") && $(this).addClass("ps-frm-onOff-disabled");
                        })
                        .off("click")
                        .on("click", function () {
                            var t = $(this),
                                e = t.prev("input"),
                                i = e.attr("name");
                            t.is(".ps-frm-onOff-disabled") || (e.trigger("click"), e.is(":checked") ? t.addClass("ps-frm-onOff-selected") : t.removeClass("ps-frm-onOff-selected"));
                        }),
                    window.setTimeout(function () {
                        $("input[placeholder!='']", ctn).each(function () {
                            var t = $(this).attr("placeholder");
                            void 0 !== t &&
                                "" != t &&
                                ($(this)
                                    .on("focus blur keydown", function (e) {
                                        "focus" == e.type ? this.value == t && $(this).val("") : "blur" == e.type && ("" == $.trim(this.value) ? $(this).val(t) : $(this).removeClass("ps-frm-notFilled"));
                                    })
                                    .addClass("ps-frm-notFilled"),
                                $(this).val("").trigger("blur"));
                        });
                    }, 200));
        },
        FormCalendarMobileParams: function (t) {
            var e;
            return (
                0 == $("#ps-datepicker-buffer").length &&
                    ($("body").append('<input type="text" name="" id="ps-datepicker-buffer" style="position: absolute; left: -20000px; visibility: hidden;">'), $("#ps-datepicker-buffer").datepicker({ dateFormat: "yy-mm-dd" })),
                void 0 !== t && ((t = t.split("/")), $("#ps-datepicker-buffer").datepicker("setDate", t[2] + "-" + t[1] + "-" + t[0]), (e = $("#ps-datepicker-buffer").val())),
                e
            );
        },
        FormCalendarDateFormatter: function (t) {
            if (void 0 === t) return !1;
            var e = "";
            return t.indexOf("/") > -1 && (e = (t = t.split("/"))[2] + "-" + t[1] + "-" + t[0]), e;
        },
        FormValidateMail: function (t) {
            var e;
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
        },
        FormValidateCPF: function (t) {
            var e, a;
            if (
                ((e = 0),
                "00000000000" == (t = t.replace(/[^\d]+/g, "")) ||
                    "11111111111" == t ||
                    "22222222222" == t ||
                    "33333333333" == t ||
                    "44444444444" == t ||
                    "55555555555" == t ||
                    "66666666666" == t ||
                    "77777777777" == t ||
                    "88888888888" == t ||
                    "99999999999" == t)
            )
                return !1;
            for (i = 1; i <= 9; i++) e += parseInt(t.substring(i - 1, i)) * (11 - i);
            if (((10 != (a = (10 * e) % 11) && 11 != a) || (a = 0), a != parseInt(t.substring(9, 10)))) return !1;
            for (e = 0, i = 1; i <= 10; i++) e += parseInt(t.substring(i - 1, i)) * (12 - i);
            return (10 != (a = (10 * e) % 11) && 11 != a) || (a = 0), a == parseInt(t.substring(10, 11));
        },
        FormValidateCNPJ: function (t) {
            if ("" == (t = t.replace(/[^\d]+/g, ""))) return !1;
            if (14 != t.length) return !1;
            if (
                "00000000000000" == t ||
                "11111111111111" == t ||
                "22222222222222" == t ||
                "33333333333333" == t ||
                "44444444444444" == t ||
                "55555555555555" == t ||
                "66666666666666" == t ||
                "77777777777777" == t ||
                "88888888888888" == t ||
                "99999999999999" == t
            )
                return !1;
            for (tamanho = t.length - 2, numeros = t.substring(0, tamanho), digitos = t.substring(tamanho), soma = 0, pos = tamanho - 7, i = tamanho; i >= 1; i--) (soma += numeros.charAt(tamanho - i) * pos--), pos < 2 && (pos = 9);
            if (((resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)), resultado != digitos.charAt(0))) return !1;
            for (tamanho += 1, numeros = t.substring(0, tamanho), soma = 0, pos = tamanho - 7, i = tamanho; i >= 1; i--) (soma += numeros.charAt(tamanho - i) * pos--), pos < 2 && (pos = 9);
            return (resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)), resultado == digitos.charAt(1);
        },
        FormValidatePhone: function (t) {
            var e = !0;
            return (
                "" != (t = t.replace(/\(/g, "").replace(/\)/g, "").replace(/ /g, "").replace(/\./g, "")) &&
                    (t.indexOf("0000000") > -1 ||
                        t.indexOf("1111111") > -1 ||
                        t.indexOf("2222222") > -1 ||
                        t.indexOf("3333333") > -1 ||
                        t.indexOf("4444444") > -1 ||
                        t.indexOf("5555555") > -1 ||
                        t.indexOf("6666666") > -1 ||
                        t.indexOf("7777777") > -1 ||
                        t.indexOf("8888888") > -1 ||
                        t.indexOf("9999999") > -1) &&
                    (e = !1),
                e
            );
        },
        FormCleanupString: function (t, e) {
            return (
                void 0 === e && (e = !1),
                (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(
                    /[áàâãä]/g,
                    "a"
                )).replace(/[ÁÀÂÃÄ]/g, "A")).replace(/[éèêë]/g, "e")).replace(/[ÉÈÊË]/g, "E")).replace(/[íìîï]/g, "i")).replace(/[ÍÌÎÏ]/g, "I")).replace(/[óòôõö]/g, "o")).replace(/[ÓÒÔÕÖ]/g, "O")).replace(/[úùûü]/g, "u")).replace(
                    /[ÚÙÛÜ]/g,
                    "U"
                )).replace(/[ç]/g, "c")).replace(/[Ç]/g, "C")).replace(/\˜/g, "")).replace(/\`/g, "")).replace(/\;/g, "")).replace(/\'/g, "")).replace(/\//g, "")).replace(/\\/g, "")).replace(/\|/g, "")).replace(/\[/g, "")).replace(
                    /\]/g,
                    ""
                )).replace(/\{/g, "")).replace(/\}/g, "")).replace(/\?/g, "")).replace(/\</g, "")).replace(/\>/g, "")).replace(/\-/g, "")).replace(/\+/g, "")).replace(/\=/g, "")).replace(/\(/g, "")).replace(/\)/g, "")).replace(
                    /\!/g,
                    ""
                )).replace(/\@/g, "")).replace(/\#/g, "")).replace(/\$/g, "")).replace(/\%/g, "")).replace(/\^/g, "")).replace(/\&/g, "")).replace(/\*/g, "")),
                e || (t = t.replace(/\d/g, "")),
                t
            );
        },
        FormShowFieldError: function (t, e) {
            var i = void 0 !== $(t).data("onerror") && $(t).data("onerror"),
                a = $(t).data("onerror");
            e ? ($(t).removeClass("ps-frm-error"), void 0 !== a && $(a).slideUp()) : ($(t).addClass("ps-frm-error"), void 0 !== a && $(a).slideDown());
        },
        FormValidate: function (t, e, i) {
            void 0 === e && (e = !0), void 0 === i && (i = !0);
            var a =
                    "input[type='date']:visible,input[type='text']:visible,input[type='tel']:visible, input[type='number']:visible,input[type='email']:visible,input[type='password']:visible,textarea:visible,select:visible,select.ps-frm-multiselect,input[type='radio']:visible,input[type='checkbox']:visible",
                s = "ps-frm-error",
                n = !0;
            e || (a = "input,textarea,select");
            for (var o = $(a, t), r = 0, l = o.length; r < l; r++) {
                var c = $(o[r]).val(),
                    u = $(o[r]).attr("class"),
                    d = $(o[r]).is("select"),
                    h = $(o[r]).is(":radio"),
                    p = $(o[r]).is(":checkbox");
                if (void 0 !== u && !$(o[r]).is(":disabled")) {
                    if ((d && (c = $("option:selected", o[r]).val()), h || p)) {
                        var f = $(o[r]).attr("name");
                        c = void 0 !== $("input[name='" + f + "']:checked").val() ? $("input[name='" + f + "']:checked").val() : "";
                    }
                    if (u.match(/ps-frm-error/i)) n = !1;
                    else if (u.match(/ps-frm-valid/i))
                        if (d && $(o[r]).is(".ps-frm-multiselect") && 0 == c) {
                            var m = "#" + $(o[r]).data("multiselectlist"),
                                c = $("option:selected", o[r]).length;
                            $(o[r])
                                .off("change.pslib")
                                .on("change.pslib", function (t) {
                                    var e = $(this),
                                        i = e.data("multiselectlist"),
                                        a,
                                        s = !1;
                                    null !== e.val() && (s = !0), psLib.FormShowFieldError(o[r], s), psLib.FormShowFieldError(m, s);
                                }),
                                psLib.FormShowFieldError(o[r], !1),
                                psLib.FormShowFieldError(m, !1);
                        } else
                            "" == c || u.match(/ps-frm-notFilled/i)
                                ? ((n = !1),
                                  d
                                      ? ($(o[r])
                                            .off("change.pslib")
                                            .on("change.pslib", function (t) {
                                                $(this).parent().removeClass(s), psLib.FormShowFieldError(this, !0);
                                            })
                                            .parent()
                                            .addClass(s),
                                        psLib.FormShowFieldError(o[r], !1))
                                      : h || p
                                      ? ($(o[r])
                                            .off("click.pslib")
                                            .on("click.pslib", function (t) {
                                                var e = $(this).attr("name");
                                                $("input[name='" + e + "']").removeClass(s), psLib.FormShowFieldError(this, !0);
                                            }),
                                        psLib.FormShowFieldError(o[r], !1))
                                      : ($(o[r])
                                            .off("keyup")
                                            .on("keyup", function (t) {
                                                psLib.FormShowFieldError(this, !0);
                                            }),
                                        psLib.FormShowFieldError(o[r], !1)))
                                : ($(o[r]).removeClass(s), psLib.FormShowFieldError(o[r], !0));
                }
            }
            var g = void 0 !== $(t).data("formerrorpanel") && $(t).data("formerrorpanel"),
                v;
            return (
                !n &&
                    i &&
                    (g
                        ? $(g).slideDown(200, function () {
                              (v = $(g).offset()), psLib.ScrollTo(v.top - 32);
                          })
                        : ((v = $(".ps-frm-error:eq(0)").offset()), psLib.ScrollTo(v.top - 32))),
                n && g && $(g).slideUp(200),
                n
            );
        },
        FormMultiSelectCreateListItem: function (t, e, i, a, s) {
            return (
                "<li class='" +
                i +
                "'>\t\t\t\t\t" +
                t +
                "\t\t\t\t\t<a href='javascript:;' \t\t\t\t\t\tclass='ps-frm-multiselect-remove' \t\t\t\t\t\tdata-multiselect='" +
                a +
                "' \t\t\t\t\t\tdata-multiselectmodal='" +
                s +
                "' \t\t\t\t\t\tdata-multiselectvalue='" +
                e +
                "' >\t\t\t\t\t\t<span class='ps-ico ps-ico-close'></span>\t\t\t\t\t</a>\t\t\t\t</li>"
            );
        },
        FormMultiSelectConfig: function (t, e, i) {
            var a = $(".ps-modal-content", "#" + e),
                s = $(".ps-frm-multiselect-selecteditens", "#" + i),
                n = s.parent().find(".ps-btn-multiselect-trigger"),
                o = s.parent().find(".ps-btn-multiselect-addremove"),
                r = $("#" + t),
                l = 0;
            $("input[type='checkbox']", a).each(function () {
                var i = $(this),
                    a = this.id,
                    n = i.val(),
                    o = i.is(":checked"),
                    c = i.data("multiselecttext"),
                    u = $("li." + a, s);
                if (o) {
                    if (0 == u.length) {
                        var d = psLib.FormMultiSelectCreateListItem(c, n, a, t, e);
                        s.append(d), psLib.FormMultiSelectRemove(s);
                    }
                    l++;
                } else u.length > 0 && $(".ps-frm-multiselect-remove", u).trigger("click");
                r.find("option[value='" + n + "']").prop("selected", o);
            }),
                l > 0 ? (s.show(), n.hide(), o.show(), psLib.FormShowFieldError("#" + i, !0), psLib.FormShowFieldError("#" + t, !0)) : (s.hide(), n.show(), o.hide());
        },
        FormMultiSelectRemove: function (t) {
            $(".ps-frm-multiselect-remove", t)
                .off("click.pslib")
                .on("click.pslib", function () {
                    var t,
                        e = $(this).data(),
                        i = $(this).parent(),
                        a = i.parent(),
                        s = a.parent().find(".ps-btn-multiselect-trigger"),
                        n = a.parent().find(".ps-btn-multiselect-addremove");
                    $("#" + e.multiselect + " option[value='" + e.multiselectvalue + "']").prop("selected", !1),
                        $("#" + e.multiselectmodal + " input:checkbox[value='" + e.multiselectvalue + "']").prop("checked", !1),
                        i.fadeOut("fast", function () {
                            $(this).remove(), 0 == $("#" + e.multiselect + " option:selected").length ? (n.hide(), s.show()) : (s.hide(), n.show());
                        });
                });
        },
        FormMultiSelectCreateContent: function (t, e, i, a, s, n) {
            var o = $("#" + i + " option"),
                r = "",
                l = "";
            o.each(function () {
                var t = $(this).val(),
                    s = t.replace(/\//g, "-").replace(/\./g, "-").replace(/\|/g, "-").replace(/\#/g, "-"),
                    n = $(this).text(),
                    o = $(this).is(":selected"),
                    c = "ps-frm-chk-" + s + "-" + a;
                (l +=
                    '\t\t\t\t\t<div class="ps-frm-multiselect-label">\t\t\t\t\t\t<input type="checkbox" \t\t\t\t\t\t\tname="ps-frm-chk-multiselect-' +
                    a +
                    '" \t\t\t\t\t\t\tvalue="' +
                    t +
                    '" \t\t\t\t\t\t\tclass="ps-frm-checkbox" \t\t\t\t\t\t\tdata-multiselecttext="' +
                    n +
                    '"\t\t\t\t\t\t\tid="' +
                    c +
                    '" \t\t\t\t\t\t\t' +
                    (o ? "checked" : "") +
                    '\t\t\t\t\t\t\t/>\t\t\t\t\t\t<label \t\t\t\t\t\t\tclass="ps-frm-checkbox" \t\t\t\t\t\t\tfor="' +
                    c +
                    '">' +
                    n +
                    "</label>\t\t\t\t\t</div>"),
                    o && (r += psLib.FormMultiSelectCreateListItem(n, t, c, i, e));
            });
            var c =
                    '\t\t\t\t<div class="ps-modal ps-multiselect-modal" id="' +
                    e +
                    '">\t\t\t\t\t<a href="javascript:;" class="ps-modal-close ps-modal-close-default"><span class="ps-ico ps-ico-sm ps-sm-ico-lg ps-ico-close"></span></a>\t\t\t\t\t<div class="ps-modal-container">\t\t\t\t\t\t<div class="ps-modal-title">\t\t\t\t\t\t\t' +
                    n.title +
                    '\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="ps-modal-content">\t\t\t\t\t\t\t' +
                    l +
                    '\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="ps-modal-foot">\t\t\t\t\t\t\t<div class="ps-mod8 ps-sm-mod4 ps-sm-lspan4">\t\t\t\t\t\t\t\t<a href="javascript:;" class="ps-btn ps-btn-primary ps-modal-close" data-modal="#' +
                    e +
                    '">Selecionar</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>',
                u = "<ul class='ps-frm-multiselect-selecteditens' style='display: none;'>\t\t\t\t\t" + r + "\t\t\t\t</ul>\t\t\t   ",
                d =
                    '\t\t\t\t<a href="javascript:;" \t\t\t\t\tdata-id="' +
                    a +
                    '" \t\t\t\t\tclass="ps-btn ps-btn-multiselect-trigger ps-open-modal" \t\t\t\t\tdata-modal="#' +
                    e +
                    '"\t\t\t\t\tdata-modalonhide="psLib.FormMultiSelectConfig(\'' +
                    i +
                    "','" +
                    e +
                    "','" +
                    t +
                    '\')">\t\t\t\t\tSelecionar\t\t\t\t</a>\t\t\t\t<a href="javascript:;" \t\t\t\t\tdata-id="' +
                    a +
                    '" \t\t\t\t\tclass="ps-btn ps-btn-primary ps-btn-multiselect-addremove ps-open-modal" \t\t\t\t\tdata-modal="#' +
                    e +
                    '"\t\t\t\t\tstyle="display: none;" \t\t\t\t\tdata-modalonhide="psLib.FormMultiSelectConfig(\'' +
                    i +
                    "','" +
                    e +
                    "','" +
                    t +
                    "')\">\t\t\t\t\t...\t\t\t\t</a>";
            s ? ($("body").append(c), $("#" + t).html(u + d)) : ($("ul.ps-frm-multiselect-selecteditens", "#" + t).html(r), $(".ps-modal-content", "#" + e).html(l)),
                "" != r && ($(".ps-btn-multiselect-trigger", "#" + t).hide(), $(".ps-btn-multiselect-addremove", "#" + t).show(), $(".ps-frm-multiselect-selecteditens", "#" + t).show(), psLib.FormMultiSelectRemove("#" + t));
        },
        FormSelectValues2Array: function (t, e) {
            void 0 === e && (e = !0);
            var i = [];
            return (
                !!t.is("select") &&
                ($("option", t).each(function () {
                    var t = $(this).val(),
                        a = $(this).text(),
                        s = $(this).is(":selected");
                    "" != t && (e ? i.push(t) : i.push({ text: a, val: t, isSel: s }));
                }),
                i)
            );
        },
        Loading: function (t) {
            $(".ps-ico-loading-bar", t).each(function () {
                var t = $(this),
                    e = '<div class="ps-ico-bar-container"><div class="ps-ico-bar-spinner"></div></div>';
                t.html(e);
                var i = t.find(".ps-ico-bar-spinner");
                psLib.LoadingBarRotate(i);
            });
        },
        LoadingBarRotate: function (t) {
            var e = t.parent();
            $(t).animate({ left: e.width() }, 1500, function () {
                t.css("left", -t.width() + "px"), psLib.LoadingBarRotate(t);
            });
        },
        Notify: function (t) {
            $(".ps-open-notify", t)
                .off("click.pslib")
                .on("click.pslib", function (t) {
                    t.preventDefault();
                    var e = $(this),
                        i = e.data("notifycontent"),
                        a = void 0 !== e.data("notifyduration") ? e.data("notifyduration") : 5e3,
                        s = void 0 !== e.data("notifyonshow") && e.data("notifyonshow"),
                        n = void 0 !== e.data("notifyonhide") && e.data("notifyonhide");
                    if (void 0 === i) return !1;
                    psLib.NotifyShowHide(i, a, s, n);
                });
        },
        NotifyShowHide: function (dest, duration, onShow, onHide) {
            var obj,
                notifyCreate = !1;
            if (void 0 === dest || "integer" == typeof dest) return console.warn("Notificação inexistente"), !1;
            "string" == typeof dest
                ? 0 == dest.indexOf("#") || 0 == dest.indexOf(".")
                    ? (obj = $(dest))
                    : (0 != dest.indexOf("success:") && 0 != dest.indexOf("alert:") && 0 != dest.indexOf("error:")) || ((notifyCreate = psLib.NotifyCreate(dest)), (obj = $("#" + notifyCreate)))
                : "object" == typeof dest && (obj = dest),
                (duration = void 0 === duration ? 5e3 : parseInt(duration)),
                void 0 === onShow && (onShow = !1),
                void 0 === onHide && (onHide = !1),
                obj
                    .find(".ps-notify-close")
                    .off("click.pslib")
                    .on("click.pslib", function (t) {
                        var e = $(this).parent();
                        notifyCreate ? psLib.NotifyClose(e, !0) : psLib.NotifyClose(e);
                    }),
                $(window)
                    .off("keyup.notify_pslib")
                    .on("keyup.notify_pslib", function (t) {
                        27 == t.keyCode && (psLib.NotifyClose($(".ps-notify")), $(this).off("keyup.notify_pslib"));
                    });
            var h = obj.outerHeight();
            onShow && eval(onShow),
                onHide && obj.data("notifyonhide", onHide),
                psLib.NotifyClose($(".ps-notify")),
                obj.stop(!0, !1).animate({ "margin-bottom": -h }, 500),
                window.notifyTimer && window.clearTimeout(window.notifyTimer),
                (window.notifyTimer = setTimeout(function () {
                    notifyCreate ? psLib.NotifyClose(obj, !0) : psLib.NotifyClose(obj);
                }, duration));
        },
        NotifyClose: function (obj, erase) {
            if (void 0 === obj) return console.warn("Impossível fechar notificação"), !1;
            void 0 === erase && (erase = !1),
                obj.stop(!0, !1).animate({ "margin-bottom": 0 }, 500, function () {
                    void 0 !== $(this).data("notifyonhide") && eval($(this).data("notifyonhide")), erase && obj.remove();
                });
        },
        NotifyCreate: function (t) {
            var e = "",
                i,
                a = "",
                s = "Notify" + new Date().valueOf();
            return (
                0 == t.indexOf("error:") ? ((a = "ps-notify-error"), (t = t.replace("error:", ""))) : 0 == t.indexOf("alert:") ? ((a = "ps-notify-alert"), (t = t.replace("alert:", ""))) : (t = t.replace("success:", "")),
                (e +=
                    '<div class="ps-notify ps-caption ps-caption-uppercased ' +
                    a +
                    '" id="' +
                    s +
                    '">\t\t\t\t\t<span class="ps-ico ps-ico-sm ps-ico-alert"></span>\t\t\t\t\t' +
                    t +
                    '\t\t\t\t\t<a href="javascript:;" class="ps-notify-close ps-notify-close-default"><span class="ps-ico ps-ico-xsm ps-ico-close"></span></a>\t\t\t\t</div>'),
                $("body").append(e),
                s
            );
        },
        Organism: function (ctn) {
            var top = $(".ps-site-top", ctn),
                foot = $(".ps-site-foot", ctn),
                year = $(".ps-currentYear", ctn),
                fontsizeWidget = $(".ps-fontSize-widget", ctn),
                legalAccept = $(".ps-legalAccept-widget", ctn),
                fixedScroll = $(".ps-fixedscroll");
            if (
                ($(".ps-scrollTo", ctn)
                    .off("click.pslib")
                    .on("click.pslib", function (t) {
                        t.preventDefault();
                        var e = $(this),
                            i = e.is("a") ? e.attr("href") : e.data("scrollto"),
                            a = void 0 !== e.data("scrolloffset") ? e.data("scrolloffset") : 0;
                        if ((i = $(i)).length) {
                            var s = i.offset();
                            psLib.ScrollTo(s.top - a);
                        }
                    }),
                top.length)
            ) {
                var bodyBgColor = $("body").css("backgroundColor"),
                    topBgColor = top.css("backgroundColor");
                if (
                    (("rgb(255, 255, 255)" != bodyBgColor && "#fff" != bodyBgColor) || ("rgb(255, 255, 255)" != topBgColor && "#fff" != topBgColor) || top.addClass("ps-site-bgWhite"),
                    top.is(".ps-site-top-fixed") || (top.is(".ps-site-top-mob-fixed") && psLib.IsMobile))
                ) {
                    var h = top.outerHeight();
                    $("body").css("padding-top", h + "px"),
                        top.css("top", "0"),
                        $(window)
                            .off("resize.topFixed_pslib")
                            .on("resize.topFixed_pslib", function () {
                                var t = top.outerHeight();
                                $("body").css("padding-top", t + "px");
                            })
                            .off("scroll.topFixed_pslib")
                            .on("scroll.topFixed_pslib", function () {
                                var t;
                                (window.scrollY > 0 ? window.scrollY : window.pageYOffset) > h ? top.addClass("ps-site-top-fixed-min") : top.removeClass("ps-site-top-fixed-min");
                            });
                }
            }
            if ((foot.length && $(".ps-site-container", ctn).css("padding-bottom", foot.outerHeight() + "px"), year.length)) {
                var d = new Date();
                year.html(d.getFullYear());
            }
            if (
                (fontsizeWidget.length &&
                    $("a", fontsizeWidget)
                        .off("click.pslib")
                        .on("click.pslib", function (t) {
                            t.preventDefault();
                            var e = $(this),
                                i = e.data("fontsizecontainer");
                            if (void 0 === i) return !1;
                            e.is(".ps-fontSize-small")
                                ? $(i).removeClass("ps-fontSize-medium ps-fontSize-large").addClass("ps-fontSize-small")
                                : e.is(".ps-fontSize-medium")
                                ? $(i).removeClass("ps-fontSize-small ps-fontSize-large").addClass("ps-fontSize-medium")
                                : e.is(".ps-fontSize-large") && $(i).removeClass("ps-fontSize-small ps-fontSize-medium").addClass("ps-fontSize-large");
                        }),
                legalAccept.length)
            ) {
                var d = legalAccept.data("legalaccepttext");
                if (void 0 === d) return !1;
                var btn = legalAccept.find(".ps-btn"),
                    objD = $(d);
                $(".ps-btn", legalAccept)
                    .off("click.psLib_legalAccept")
                    .on("click.psLib_legalAccept", function (e) {
                        var t = $(this),
                            modaldest = t.data("modaldisabledalert"),
                            enabledAction = t.data("enableaction");
                        void 0 !== modaldest && t.is(".ps-btn-disabled") && psLib.ModalShowHide(modaldest), void 0 === enabledAction || t.is(".ps-btn-disabled") || eval(enabledAction);
                    }),
                    $(window)
                        .off("scroll.legalAccept_pslib")
                        .on("scroll.legalAccept_pslib", function () {
                            var t = window.scrollY > 0 ? window.scrollY : window.pageYOffset,
                                e = objD.offset(),
                                i = objD.outerHeight(),
                                a = e.top + i - $(this).outerHeight();
                            void 0 === t && (t = window.document.documentElement.scrollTop), t >= a && (legalAccept.addClass("ps-legalAccept-enabled"), btn.removeClass("ps-btn-disabled"));
                        });
            }
            fixedScroll.length &&
                (psLib.IsTablet || psLib.IsOldIE
                    ? fixedScroll.each(function () {
                          var t = $(this),
                              e = t.outerWidth(),
                              i = t.offset(),
                              a = void 0 !== t.data("fixedscrolltopoffset") ? t.data("fixedscrolltopoffset") : 0;
                          $(window)
                              .off("scroll.fixedScroll_pslib")
                              .on("scroll.fixedScroll_pslib", function () {
                                  var s = window.scrollY > 0 ? window.scrollY : window.pageYOffset;
                                  void 0 === s && (s = window.document.documentElement.scrollTop),
                                      s >= i.top
                                          ? t
                                                .addClass("ps-fixedscroll-on")
                                                .css({ top: a + "px", left: i.left + "px" })
                                                .attr("style", t.attr("style") + ";width:" + e + "px !important")
                                          : t.removeClass("ps-fixedscroll-on");
                              });
                      })
                    : fixedScroll.each(function () {
                          var t,
                              e = $(this).outerHeight();
                          $(".ps-site-container").css("margin-bottom", e + "px");
                      }));
        },
        StrToIdString: function (t) {
            return (
                (t = t.toLowerCase()),
                (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = $.trim(t)).replace(/[áàâãä]/g, "a")).replace(
                    /[éèêë]/g,
                    "e"
                )).replace(/[íìîï]/g, "i")).replace(/[óòôõö]/g, "o")).replace(/[úùûü]/g, "u")).replace(/[ç]/g, "c")).replace(/\˜/g, "")).replace(/\`/g, "")).replace(/\;/g, "")).replace(/\'/g, "")).replace(/\//g, "")).replace(
                    /\\/g,
                    ""
                )).replace(/\|/g, "")).replace(/\[/g, "")).replace(/\]/g, "")).replace(/\{/g, "")).replace(/\}/g, "")).replace(/\?/g, "")).replace(/\</g, "")).replace(/\>/g, "")).replace(/\=/g, "")).replace(/\(/g, "")).replace(
                    /\)/g,
                    ""
                )).replace(/\!/g, "")).replace(/\@/g, "")).replace(/\#/g, "")).replace(/\$/g, "")).replace(/\%/g, "")).replace(/\^/g, "")).replace(/\&/g, "")).replace(/\*/g, "")).replace(/ /g, "-"))
            );
        },
        ScrollTo: function (t, e, i) {
            void 0 === e && (e = 200),
                $(".ps-site-top-mob-fixed").length > 0 ? (t -= $(".ps-site-top-mob-fixed").outerHeight()) : $(".ps-site-top-fixed").length > 0 && (t -= $(".ps-site-top-fixed").outerHeight()),
                $("html,body").animate({ scrollTop: t }, e, i);
        },
        ConvertHexToRGB: function (t) {
            var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return (e = parseInt(e[1], 16) + "," + parseInt(e[2], 16) + "," + parseInt(e[3], 16));
        },
        Tooltip: function (t) {
            var e = null,
                i = { top: !0, right: !1, bottom: !1, left: !1 },
                a = !1;
            $(".ps-tooltip", t)
                .off("mouseenter.pslib mouseleave.pslib click.pslib focusout.pslib")
                .on("mouseenter.pslib mouseleave.pslib click.pslib focusout.pslib", function (t) {
                    var s = $(this),
                        n = s.attr("title"),
                        o = s.data("title", n),
                        r = t.type;
                    (i.right = s.is(".ps-tooltip-right")),
                        (i.bottom = s.is(".ps-tooltip-bottom")),
                        (i.left = s.is(".ps-tooltip-left")),
                        ("mouseenter" !== r && "click" !== r) || a
                            ? ("mouseleave" !== r && "focusout" !== r) || !a || (psLib.TooltipUtil.hide(e, s), (a = !1))
                            : ((e = psLib.TooltipUtil.create(s.data("title"))), psLib.TooltipUtil.show(e, i, s), (psLib.IsMobile && psLib.IsTablet) || s.removeAttr("title"), (a = !0));
                });
        },
        TooltipUtil: {
            create: function (t) {
                return $('<div class="ps-tooltip-ctt"/>').html(t);
            },
            show: function (t, e, i) {
                var a = { top: 0, left: 0, opacity: 1, visibility: "visible" };
                $("body").append(t);
                var s = i.offset().top,
                    n = i.offset().left,
                    o = i.outerWidth(),
                    r = i.outerHeight(),
                    l = t.outerWidth(),
                    c = t.outerHeight(),
                    u = $(window).outerWidth(),
                    d = $(window).outerHeight(),
                    h = $(window).scrollTop(),
                    p = $(window).scrollLeft(),
                    f = 14,
                    m = 7,
                    g = "ps-arrow-bottom",
                    v = "ps-arrow-side-left",
                    b = "ps-arrow-top",
                    w = "ps-arrow-side-right",
                    y = {
                        _TOP: function () {
                            if (((a.top = s - c - m), a.top - h <= 0)) return y._BOTTOM();
                            t.addClass(g);
                        },
                        _RIGHT: function () {
                            if (((a.top = s + (r / 2 - c / 2)), (a.left = n + o + m), a.left + l > u)) return y._LEFT();
                            t.addClass(v);
                        },
                        _BOTTOM: function () {
                            if (((a.top = s + r + m), a.top >= d + h)) return y._TOP();
                            t.addClass(b);
                        },
                        _LEFT: function () {
                            if (((a.top = s + (r / 2 - c / 2)), (a.left = n - l - m), a.left <= 0)) return y._RIGHT();
                            t.addClass(w);
                        },
                    },
                    _ = "ps-arrow-right",
                    k = "ps-arrow-center",
                    x = "ps-arrow-left",
                    D = {
                        _LEFT: function () {
                            if (((a.left = n + (o / 2 - (l + f))), a.left <= 0)) return D._RIGHT();
                            t.addClass(_);
                        },
                        _CENTER: function () {
                            return (a.left = n + (o / 2 - l / 2)), a.left + l > u ? D._LEFT() : a.left <= 0 ? D._RIGHT() : void t.addClass(k);
                        },
                        _RIGHT: function () {
                            if (((a.left = n + o / 2 - f), a.left + l > u)) return D._LEFT();
                            t.addClass(x);
                        },
                    };
                e.right ? y._RIGHT() : e.bottom ? (y._BOTTOM(), D._CENTER()) : e.left ? y._LEFT() : (y._TOP(), D._CENTER()), t.css(a);
            },
            hide: function (t, e) {
                var i, a;
                null != t && null != e && (t.text(e.data("title")), t.remove());
            },
        },
        Popover: function (ctn) {
            $(".ps-popover-close", ctn)
                .off("click.pslib")
                .on("click.pslib", function (e) {
                    e.preventDefault();
                    var t = $(this),
                        p = t.parent(),
                        callback = void 0 !== p.data("onpopoverhide") && p.data("onpopoverhide");
                    p.fadeOut(200, function () {
                        callback && eval(callback);
                    });
                }),
                $(".ps-popover-toggle", ctn)
                    .off("mouseenter.pslib mouseleave.pslib click.pslib")
                    .on("mouseenter.pslib mouseleave.pslib click.pslib", function (e) {
                        var t = $(this),
                            d = t.data("popover"),
                            dw = $(d).outerWidth(),
                            ref = t.offset(),
                            tw = t.outerWidth(),
                            th = t.outerHeight(),
                            config = {},
                            isHelper = t.is(".ps-lbl-helper") || t.parent().is(".ps-lbl-helper"),
                            parentW = t.parents(".ps-container").eq(0).width(),
                            parentRef = t.parents(".ps-container").eq(0).offset(),
                            maxW = $(".ps-container:eq(0)").outerWidth() - (ref.left + tw - 7),
                            marginTop = t.parent().is(".ps-lbl-helper") ? t.parent().outerHeight() + 7 : th + 7;
                        if (((marginLeft = t.parent().is(".ps-lbl-helper") ? t.parent().outerWidth() + 7 : tw + 7), void 0 !== d))
                            if (
                                (psLib.IsMobile
                                    ? ($(d).addClass("ps-popover-top"), (config = { margin: "7px 0", width: "100%" }))
                                    : maxW < 100
                                    ? ((maxW = 271),
                                      dw > maxW && (dw = maxW),
                                      $(d).addClass("ps-popover-left"),
                                      (config = { right: "35px", "margin-top": "-" + marginTop + "px", "max-width": maxW + "px" }),
                                      isHelper || (config = { "margin-top": "-" + (th / 2 + 21) + "px", right: parentW - ref.left + parentRef.left + 7 + "px" }))
                                    : (maxW > 271 && (maxW = 271),
                                      $(d).removeClass("ps-popover-left"),
                                      (config = { "margin-left": marginLeft + "px", "margin-top": "-" + marginTop + "px", "max-width": maxW + "px" }),
                                      isHelper || (config = { "margin-top": "-" + (th / 2 + 21) + "px", "margin-left": tw + 7 + "px" })),
                                t.parent("td").each(function () {
                                    $(this).css("position", "relative"), $(d).removeClass("ps-popover-left").addClass("ps-popover-bottom"), (config = { "margin-top": "9px", width: tw + "px" });
                                }),
                                $(d).css(config),
                                (!t.is(".ps-popover-toggle-over") && "click" == e.type) || (t.is(".ps-popover-toggle-over") && "mouseenter" == e.type))
                            ) {
                                var callback = void 0 !== $(d).data("onpopovershow") && $(d).data("onpopovershow");
                                $(d).fadeIn(200, function () {
                                    callback && eval(callback);
                                });
                            } else if (t.is(".ps-popover-toggle-over") && "mouseleave" == e.type) {
                                var callback = void 0 !== $(d).data("onpopoverhide") && $(d).data("onpopoverhide");
                                $(d).fadeOut(200, function () {
                                    callback && eval(callback);
                                });
                            }
                    });
        },
        Tabs: function (ctn) {
            $(".ps-tab", ctn)
                .off("click.pslib")
                .on("click.pslib", function (e) {
                    e.preventDefault();
                    var t = $(this),
                        d = t.attr("href"),
                        p = t.parent().parent(),
                        ctt = p.next(".ps-tab-content").find(".ps-tab-content-item"),
                        tabSelectedClass = "ps-tab-selected";
                    p.find(".ps-tab").removeClass(tabSelectedClass),
                        t.addClass(tabSelectedClass),
                        ctt.each(function () {
                            if ($(this).attr("id") != d.replace("#", "")) {
                                $(this).hide();
                                var callback = void 0 !== $(this).data("ontabhide") && $(this).data("ontabhide");
                                callback && eval(callback);
                            }
                        }),
                        $(d).fadeIn(200, function () {
                            var callback = void 0 !== $(this).data("ontabshow") && $(this).data("ontabshow");
                            callback && eval(callback);
                        });
                }),
                "" != location.hash && $("a.ps-tab[href='" + location.hash + "']", ctn).trigger("click.pslib");
        },
        Accordion: function (ctn) {
            var c = 0;
            $(".ps-accordion .ps-panel", ctn).each(function () {
                $(this).data("accordionidx", c), c++;
            }),
                $(".ps-accordion .ps-openAccordion", ctn)
                    .off("click.pslib")
                    .on("click.pslib", function (t) {
                        t.preventDefault();
                        var e = $(this),
                            i = e.closest(".ps-accordion"),
                            a = e.data("accordionidx");
                        void 0 !== a &&
                            i.find(".ps-panel").each(function () {
                                var t;
                                if ($(this).data("accordionidx") == a) return $(this).find(".ps-panel-head").trigger("click"), !0;
                            });
                    }),
                $(".ps-accordion .ps-panel-head", ctn)
                    .off("click.pslib")
                    .on("click.pslib", function (e) {
                        e.preventDefault();
                        var t = $(this),
                            p = t.parent(),
                            idx = p.data("accordionidx"),
                            ctt = p.parent().find(".ps-panel"),
                            selectedAccordionClass = "ps-accordion-opened";
                        if (p.is(".ps-accordion-disabled")) return !1;
                        if (p.is("." + selectedAccordionClass)) {
                            var callback = void 0 !== p.data("onaccordionclose") && p.data("onaccordionclose");
                            callback && eval(callback),
                                p.find(".ps-panel-ctt,.ps-panel-foot").slideUp(200, function () {
                                    p.removeClass(selectedAccordionClass);
                                });
                        } else {
                            ctt.each(function () {
                                if ($(this).data("accordionidx") != idx) {
                                    var callback = void 0 !== $(this).data("onaccordionclose") && $(this).data("onaccordionclose");
                                    callback && eval(callback), $(this).removeClass(selectedAccordionClass).find(".ps-panel-ctt,.ps-panel-foot").hide();
                                }
                            }),
                                p.find(".ps-panel-ctt,.ps-panel-foot").slideDown(200, function () {
                                    p.addClass(selectedAccordionClass);
                                });
                            var callback = void 0 !== p.data("onaccordionopen") && p.data("onaccordionopen");
                            callback && eval(callback);
                        }
                        if (psLib.IsMobile) {
                            var pos = p.offset().top,
                                posSub = $(".ps-site-top-mob-fixed:visible,.ps-site-top-fixed:visible").length > 0 ? $(".ps-site-top-mob-fixed,.ps-site-top-fixed").outerHeight() : 0;
                            (pos = pos - posSub - 30), psLib.ScrollTo(pos);
                        }
                    });
        },
        Menu: function (t) {
            psLib.IsMobile &&
                ($(".ps-menu.ps-menu-mobile", t).each(function () {
                    var t = $(this),
                        e = void 0 !== t.data("mobilewithouttext") && t.data("mobilewithouttext");
                    (toggle = '<a href="javascript:;" class="ps-menu-mobile-toggle ' + (e ? "ps-menu-mobile-toggle-noText" : "") + '"><span class="ps-ico ps-ico-sm ps-ico-menu"></span></a>'), $(toggle).insertBefore(t);
                }),
                $(".ps-menu-mobile-toggle", t)
                    .off("click.pslib")
                    .on("click.pslib", function (t) {
                        t.preventDefault();
                        var e = $(this),
                            i = e.next("ul.ps-menu"),
                            a = "ps-menu-opened";
                        if (i.is(":visible")) e.removeClass(a), i.slideUp("fast");
                        else {
                            var s = e.offset();
                            e.addClass(a), i.slideDown("fast"), psLib.ScrollTo(s.top - 30);
                        }
                    })),
                $(".ps-menu > li", t).each(function () {
                    var t = $(this);
                    ((!psLib.IsMobile && t.not(".ps-menu-vertical,.ps-menu-horizontal")) || psLib.IsMobile) &&
                        t.children("ul").length > 0 &&
                        t
                            .children("a")
                            .addClass("ps-menu-hasLevel")
                            .off("click.pslib")
                            .on("click.pslib", function (t) {
                                t.preventDefault();
                                var e = $(this).offset(),
                                    i = $(this).next("ul");
                                (c = "ps-menu-opened"), $(this).toggleClass(c), i.is(":visible") ? i.slideUp("fast") : i.slideDown("fast"), psLib.IsMobile && psLib.ScrollTo(e.top - 30);
                            });
                });
        },
        Modal: function (t) {
            $(".ps-open-modal", t)
                .off("click.pslib")
                .on("click.pslib", function (t) {
                    t.preventDefault();
                    var e = $(this),
                        i = void 0 !== e.data("modal") && e.data("modal"),
                        a = void 0 !== e.data("modalbackdropstatic") && e.data("modalbackdropstatic");
                    if (
                        ((keyboard = void 0 === e.data("modalkeyboarddisable") || e.data("modalkeyboarddisable")),
                        (onShow = void 0 !== e.data("modalonshow") && e.data("modalonshow")),
                        (onHide = void 0 !== e.data("modalonhide") && e.data("modalonhide")),
                        0 != i)
                    ) {
                        if ($(".ps-modal-container", i).length > 0) {
                            var s = e[0].getBoundingClientRect(),
                                n = $(".ps-modal-container", i).attr("class"),
                                o = "";
                            (n = $.trim(n.replace("ps-modal-container", ""))),
                                psLib.IsMobile ||
                                    (e.addClass("ps-button-transition-modal"),
                                    (o = '<div class="ps-transition-modal ' + n + '" style="width:' + s.width + "px;height:" + s.height + "px;left:" + s.left + "px;top:" + s.top + 'px;"></div>'),
                                    e.after(o)),
                                window.setTimeout(function () {
                                    (mHeight = $(i).find(".ps-modal-container").outerHeight()),
                                        psLib.IsMobile ||
                                            (e.addClass("ps-button-transition-modal"),
                                            $(".ps-transition-modal")
                                                .addClass("ps-transition-modal-open")
                                                .css("cssText", "height: " + mHeight + "px !important"));
                                }, 50),
                                window.setTimeout(function () {
                                    psLib.IsMobile || $(".ps-transition-modal").remove(), $("#ps-modal-backdrop").length > 0 && psLib.Modal(i);
                                }, 1e3);
                        }
                        psLib.ModalShowHide(i, a, keyboard, onShow, onHide);
                    }
                });
        },
        ModalShowHide: function (dest, backdrop, keyboard, onShow, onHide) {
            if (void 0 === dest || !$(dest).length) return console.warn("Modal inexistente"), !1;
            var modal = $(dest),
                mode = modal.is(":visible") ? "hide" : "show";
            if ((void 0 === keyboard && (keyboard = !0), void 0 === backdrop && (backdrop = !1), void 0 === onShow && (onShow = !1), void 0 === onHide && (onHide = !1), "show" == mode)) {
                $("body").append("<div class='ps-modal-backdrop' id='ps-modal-backdrop'></div>").addClass("ps-modal-backdrop-visible"),
                    modal.show(),
                    setTimeout(function () {
                        backdrop ? modal.addClass("ps-modal-backdrop-static") : modal.removeClass("ps-modal-backdrop-static"), modal.addClass("ps-modal-visible").data({ modalonhide: onHide });
                    }, 100);
                var title = modal.find(".ps-modal-title").length ? modal.find(".ps-modal-title").outerHeight() : 0,
                    foot = modal.find(".ps-modal-foot").length ? modal.find(".ps-modal-foot").outerHeight() : 0,
                    windowH = $(window).height();
                if (psLib.IsMobile) {
                    var iosFactor = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) ? 50 : 0;
                    (defaultContentHeight = windowH - title - (0 == foot ? iosFactor : foot) + "px"),
                        (iframes = modal.find(".ps-modal-content iframe")),
                        modal.find(".ps-modal-content").css("max-height", defaultContentHeight),
                        1 == iframes.length && iframes.css("height", defaultContentHeight);
                } else modal.find(".ps-modal-content").css("padding-bottom", foot + 14 + "px");
                keyboard &&
                    $(window)
                        .off("keyup.modal_pslib")
                        .off("keyup.modal_pslib")
                        .on("keyup.modal_pslib", function (t) {
                            27 == t.keyCode && (psLib.ModalShowHide(dest), psLib.ModalShowHideBackdrop(), $(this).off("keyup.modal_pslib"));
                        }),
                    onShow && eval(onShow);
            } else {
                var callback = void 0 !== modal.data("modalonhide") && modal.data("modalonhide");
                modal.removeClass("ps-modal-visible").removeData("modalonhide"),
                    $(window).off("keyup.modal_pslib"),
                    setTimeout(function () {
                        modal.hide(), psLib.ModalShowHideBackdrop(), callback && eval(callback);
                    }, 200);
            }
            setTimeout(function () {
                $(".ps-modal-close")
                    .off("click.pslib")
                    .on("click.pslib", function () {
                        var t = $(this),
                            e = t.parent().hasClass("ps-modal-container") ? t.parent().parent() : t.parent(),
                            i = void 0 !== t.data("modal") ? t.data("modal") : e;
                        psLib.ModalShowHideBackdrop(), psLib.ModalShowHide(i);
                    }),
                    $(".ps-modal-backdrop")
                        .off("click.pslib")
                        .on("click.pslib", function () {
                            $(".ps-modal-visible").find(".ps-modal-close").trigger("click");
                        }),
                    backdrop ||
                        $(".ps-modal-visible")
                            .off("click.pslib")
                            .on("click.pslib", function (t) {
                                $(t.target).is(".ps-modal") && $(".ps-modal-backdrop").trigger("click");
                            });
            }, 150);
        },
        ModalShowHideBackdrop: function (t) {
            $("#ps-modal-backdrop").remove(), $("body").removeClass("ps-modal-backdrop-visible");
        },
        ScrollBar: function (t) {
            var e = !1;
            $(".ps-scrollbar").each(function () {
                var t = $(this),
                    i = void 0 !== t.data("ps-scrollbar-autohide") && t.data("ps-scrollbar-autohide");
                t.psScrollBar({ autoHide: i }),
                    t.on("mouseenter click", function () {
                        e || (t.recalculate(), (e = !0));
                    });
            });
        },
        Cards: function (t) {
            var e = 0,
                i = void 0 !== t ? $("#" + t) : $("#psLib-card-" + Math.floor(100 * Math.random()));
            i.each(function () {
                var t = $(this),
                    i = $(".ps-card", t),
                    a = $(".ps-caption", i),
                    s = i.height(),
                    n = a.height() > 60 ? 0 : a.height();
                s > e && (e = a.length > 0 ? s + n : s);
            }),
                i.find(".ps-card").is(".ps-card--smaller, .ps-card--small, .ps-card--medium, .ps-card--big, .ps-card--bigger") ? i.find(".ps-card").height(e) : i.find(".ps-card").height(e + 50);
        },
        Video: function (t) {
            $(".ps-video").each(function () {
                var t = $(this),
                    e = void 0 !== t.data("title") && t.data("title"),
                    i = void 0 !== t.data("description") && t.data("description"),
                    a = void 0 !== t.data("thumb") && t.data("thumb"),
                    s,
                    n =
                        '<a href="javascript:;" class="ps-open-video ps-rounded-border" data-modal="' +
                        (void 0 !== t.data("modal") ? t.data("modal") : "videoModal") +
                        '" data-content="video">\t\t\t\t\t\t\t\t<img src="' +
                        a +
                        '" alt="' +
                        e +
                        '" />\t\t\t\t\t\t\t\t<h2 class="ps-title ps-color-white ps-alignCenter ps-md-pad">' +
                        e +
                        '</h2>\t\t\t\t\t\t\t\t<p class="ps-title ps-video-description ps-color-white ps-alignCenter">' +
                        i +
                        "</p>\t\t\t\t\t\t\t </a>";
                t.append(n), psLib.Modal(".ps-open-modal");
            }),
                $(".ps-open-video")
                    .off("click.pslib")
                    .on("click.pslib", function (t) {
                        t.preventDefault();
                        var e,
                            i = $(this).parent(),
                            a = void 0 !== i.data("url") && i.data("url"),
                            s = void 0 !== i.data("autoplay") && i.data("autoplay") ? "1" : "0",
                            n = void 0 !== i.data("modal") ? $(i.data("modal")) : $("#videoModal"),
                            o = void 0 !== i.data("modalwidth") ? i.data("modalwidth") : "medium";
                        if (!a) return console.warn("Video inexistente"), !1;
                        var r = '<iframe id="psVideoIFrame" width="100%" height="100%" src="' + a + "&autoplay=" + s + '" frameborder="0" allowfullscreen="1"></iframe>',
                            l = "ps-sm-modal-" + o;
                        $(".ps-modal-content", n).html(r), $(".ps-modal-container", n).addClass(l), psLib.ModalShowHide(n, !1, !1, !1, "psLib.RemoveVideoIFrame()");
                    });
        },
        RemoveVideoIFrame: function () {
            var t = $("#psVideoIFrame")[0];
            t.parentNode.removeChild(t);
        },
        Wizard: function (ctn) {
            $(".ps-wizard a").on("click.pslib", function (t) {
                t.preventDefault();
            }),
                $(".ps-wizard-submit", ctn).on("click.pslib", function (e) {
                    e.preventDefault();
                    var t = $(this),
                        step = t.data("wizardsubmit");
                    if (void 0 === step) return !1;
                    location.hash = step.replace("#", "");
                    var validator = $(step).data("onstepsubmit");
                    if (void 0 !== validator) {
                        validator = validator.replace("this", "'" + step + "'");
                        var rtn = eval("(window." + validator + ")");
                        if (0 == rtn) return !1;
                    }
                    var selectedStep = $("a[href='" + step + "']", stepList).parent(),
                        stepList = selectedStep.parent(),
                        nextStep = $(step).next(".ps-wizard-content-item"),
                        stepSelectClass = "ps-wizard-step-selected",
                        stepAfterClass = "ps-wizard-step-after";
                    selectedStep.removeClass(stepSelectClass).addClass(stepAfterClass),
                        selectedStep.next(".ps-wizard-step").addClass(stepSelectClass),
                        $(step).hide(),
                        nextStep
                            .fadeIn(200, function () {
                                var callback = void 0 !== $(this).data("onstepshow") && $(this).data("onstepshow");
                                callback && eval(callback);
                            })
                            .data("wizardlock", !1),
                        (location.hash = nextStep.attr("id"));
                }),
                $(".ps-wizard-step-show", ctn).on("click.pslib", function (t) {
                    t.preventDefault();
                    var e,
                        i = $(this).data("wizardshow");
                    if (((location.hash = i.replace("#", "")), void 0 === i)) return !1;
                    psLib.WizardShow(i), (location.hash = i);
                }),
                $(window).on("hashchange", function () {
                    var t = $(".ps-wizard-content-item:visible").prev().attr("id");
                    psLib.WizardShow(location.hash),
                        (history.back = function () {
                            location.href = "#" + t;
                        });
                });
        },
        WizardShow: function (t) {
            if (!$(t).is(".ps-wizard-content-item") || (void 0 !== $(t).data("wizardlock") && 1 == $(t).data("wizardlock"))) return !1;
            var e = $(t).parent(),
                i = $(".ps-wizard a[href='" + t + "']").parent(),
                a = i.parent(),
                s = "ps-wizard-step-selected",
                n = "ps-wizard-step-after";
            e.find(".ps-wizard-content-item").hide(), $(t).fadeIn(200), i.removeClass(n).addClass(s), i.prevUntil().addClass(n).removeClass(s), i.nextUntil().removeClass(n).removeClass(s);
        },
        ReInit: function (obj) {
            for (var i = 0; i < obj.length; i++) {
                var o = obj[i];
                void 0 !== eval("window.psLib." + o) &&
                    $(".ps-" + o.toLowerCase()).filter(function () {
                        var t = $(this),
                            isGuideInitialized = t.data("guideinitialized");
                        "true" == isGuideInitialized && (t.data("guideinitialized", "false"), eval("window.psLib." + o + "()"));
                    });
            }
        },
    },
    $buoop = { vs: { i: psLib.BrowserRequeriments.ie, f: psLib.BrowserRequeriments.ff, o: psLib.BrowserRequeriments.op, s: psLib.BrowserRequeriments.sa }, c: 2, l: "pt" };
psLib.IsMobile ||
    $(window).resize(function () {
        clearTimeout(window.resizedFinished),
            (window.resizedFinished = setTimeout(function () {
                psLib.ReInit(["Carousel"]);
            }, 250));
    }),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
    })(function (t) {
        function e(e, a) {
            var s,
                n,
                o,
                r = e.nodeName.toLowerCase();
            return "area" === r
                ? ((n = (s = e.parentNode).name), !(!e.href || !n || "map" !== s.nodeName.toLowerCase()) && !!(o = t("img[usemap='#" + n + "']")[0]) && i(o))
                : (/^(input|select|textarea|button|object)$/.test(r) ? !e.disabled : ("a" === r && e.href) || a) && i(e);
        }
        function i(e) {
            return (
                t.expr.filters.visible(e) &&
                !t(e)
                    .parents()
                    .addBack()
                    .filter(function () {
                        return "hidden" === t.css(this, "visibility");
                    }).length
            );
        }
        function a(t) {
            for (var e, i; t.length && t[0] !== document; ) {
                if (("absolute" === (e = t.css("position")) || "relative" === e || "fixed" === e) && ((i = parseInt(t.css("zIndex"), 10)), !isNaN(i) && 0 !== i)) return i;
                t = t.parent();
            }
            return 0;
        }
        function s() {
            (this._curInst = null),
                (this._keyEvent = !1),
                (this._disabledInputs = []),
                (this._datepickerShowing = !1),
                (this._inDialog = !1),
                (this._mainDivId = "ui-datepicker-div"),
                (this._inlineClass = "ui-datepicker-inline"),
                (this._appendClass = "ui-datepicker-append"),
                (this._triggerClass = "ui-datepicker-trigger"),
                (this._dialogClass = "ui-datepicker-dialog"),
                (this._disableClass = "ui-datepicker-disabled"),
                (this._unselectableClass = "ui-datepicker-unselectable"),
                (this._currentClass = "ui-datepicker-current-day"),
                (this._dayOverClass = "ui-datepicker-days-cell-over"),
                (this.regional = []),
                (this.regional[""] = {
                    closeText: "Done",
                    prevText: "Prev",
                    nextText: "Next",
                    currentText: "Today",
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    weekHeader: "Wk",
                    dateFormat: "mm/dd/yy",
                    firstDay: 0,
                    isRTL: !1,
                    showMonthAfterYear: !1,
                    yearSuffix: "",
                }),
                (this._defaults = {
                    showOn: "focus",
                    showAnim: "fadeIn",
                    showOptions: {},
                    defaultDate: null,
                    appendText: "",
                    buttonText: "...",
                    buttonImage: "",
                    buttonImageOnly: !1,
                    hideIfNoPrevNext: !1,
                    navigationAsDateFormat: !1,
                    gotoCurrent: !1,
                    changeMonth: !1,
                    changeYear: !1,
                    yearRange: "c-10:c+10",
                    showOtherMonths: !1,
                    selectOtherMonths: !1,
                    showWeek: !1,
                    calculateWeek: this.iso8601Week,
                    shortYearCutoff: "+10",
                    minDate: null,
                    maxDate: null,
                    duration: "fast",
                    beforeShowDay: null,
                    beforeShow: null,
                    onSelect: null,
                    onChangeMonthYear: null,
                    onClose: null,
                    numberOfMonths: 1,
                    showCurrentAtPos: 0,
                    stepMonths: 1,
                    stepBigMonths: 12,
                    altField: "",
                    altFormat: "",
                    constrainInput: !0,
                    showButtonPanel: !1,
                    autoSize: !1,
                    disabled: !1,
                }),
                t.extend(this._defaults, this.regional[""]),
                (this.regional.en = t.extend(!0, {}, this.regional[""])),
                (this.regional["en-US"] = t.extend(!0, {}, this.regional.en)),
                (this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")));
        }
        function n(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e
                .delegate(i, "mouseout", function () {
                    t(this).removeClass("ui-state-hover"),
                        -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"),
                        -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover");
                })
                .delegate(i, "mouseover", o);
        }
        function o() {
            t.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) ||
                (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                t(this).addClass("ui-state-hover"),
                -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"),
                -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"));
        }
        function r(e, i) {
            for (var a in (t.extend(e, i), i)) null == i[a] && (e[a] = i[a]);
            return e;
        }
        function l(t) {
            return function () {
                var e = this.element.val();
                t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change");
            };
        }
        (t.ui = t.ui || {}),
            t.extend(t.ui, {
                version: "1.11.4",
                keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 },
            }),
            t.fn.extend({
                scrollParent: function (e) {
                    var i = this.css("position"),
                        a = "absolute" === i,
                        s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                        n = this.parents()
                            .filter(function () {
                                var e = t(this);
                                return (!a || "static" !== e.css("position")) && s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"));
                            })
                            .eq(0);
                    return "fixed" !== i && n.length ? n : t(this[0].ownerDocument || document);
                },
                uniqueId: (function () {
                    var t = 0;
                    return function () {
                        return this.each(function () {
                            this.id || (this.id = "ui-id-" + ++t);
                        });
                    };
                })(),
                removeUniqueId: function () {
                    return this.each(function () {
                        /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
                    });
                },
            }),
            t.extend(t.expr[":"], {
                data: t.expr.createPseudo
                    ? t.expr.createPseudo(function (e) {
                          return function (i) {
                              return !!t.data(i, e);
                          };
                      })
                    : function (e, i, a) {
                          return !!t.data(e, a[3]);
                      },
                focusable: function (i) {
                    return e(i, !isNaN(t.attr(i, "tabindex")));
                },
                tabbable: function (i) {
                    var a = t.attr(i, "tabindex"),
                        s = isNaN(a);
                    return (s || a >= 0) && e(i, !s);
                },
            }),
            t("<a>").outerWidth(1).jquery ||
                t.each(["Width", "Height"], function (e, i) {
                    function a(e, i, a, n) {
                        return (
                            t.each(s, function () {
                                (i -= parseFloat(t.css(e, "padding" + this)) || 0), a && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), n && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
                            }),
                            i
                        );
                    }
                    var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                        n = i.toLowerCase(),
                        o = { innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight };
                    (t.fn["inner" + i] = function (e) {
                        return void 0 === e
                            ? o["inner" + i].call(this)
                            : this.each(function () {
                                  t(this).css(n, a(this, e) + "px");
                              });
                    }),
                        (t.fn["outer" + i] = function (e, s) {
                            return "number" != typeof e
                                ? o["outer" + i].call(this, e)
                                : this.each(function () {
                                      t(this).css(n, a(this, e, !0, s) + "px");
                                  });
                        });
                }),
            t.fn.addBack ||
                (t.fn.addBack = function (t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                }),
            t("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
                (t.fn.removeData = (function (e) {
                    return function (i) {
                        return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this);
                    };
                })(t.fn.removeData)),
            (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
            t.fn.extend({
                focus: (function (e) {
                    return function (i, a) {
                        return "number" == typeof i
                            ? this.each(function () {
                                  var e = this;
                                  setTimeout(function () {
                                      t(e).focus(), a && a.call(e);
                                  }, i);
                              })
                            : e.apply(this, arguments);
                    };
                })(t.fn.focus),
                disableSelection: (function () {
                    var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                    return function () {
                        return this.bind(t + ".ui-disableSelection", function (t) {
                            t.preventDefault();
                        });
                    };
                })(),
                enableSelection: function () {
                    return this.unbind(".ui-disableSelection");
                },
                zIndex: function (e) {
                    if (void 0 !== e) return this.css("zIndex", e);
                    if (this.length)
                        for (var i, a, s = t(this[0]); s.length && s[0] !== document; ) {
                            if (("absolute" === (i = s.css("position")) || "relative" === i || "fixed" === i) && ((a = parseInt(s.css("zIndex"), 10)), !isNaN(a) && 0 !== a)) return a;
                            s = s.parent();
                        }
                    return 0;
                },
            }),
            (t.ui.plugin = {
                add: function (e, i, a) {
                    var s,
                        n = t.ui[e].prototype;
                    for (s in a) (n.plugins[s] = n.plugins[s] || []), n.plugins[s].push([i, a[s]]);
                },
                call: function (t, e, i, a) {
                    var s,
                        n = t.plugins[e];
                    if (n && (a || (t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))) for (s = 0; n.length > s; s++) t.options[n[s][0]] && n[s][1].apply(t.element, i);
                },
            });
        var c = 0,
            u = Array.prototype.slice;
        (t.cleanData = (function (e) {
            return function (i) {
                var a, s, n;
                for (n = 0; null != (s = i[n]); n++)
                    try {
                        (a = t._data(s, "events")) && a.remove && t(s).triggerHandler("remove");
                    } catch (t) {}
                e(i);
            };
        })(t.cleanData)),
            (t.widget = function (e, i, a) {
                var s,
                    n,
                    o,
                    r,
                    l = {},
                    c = e.split(".")[0];
                return (
                    (e = e.split(".")[1]),
                    (s = c + "-" + e),
                    a || ((a = i), (i = t.Widget)),
                    (t.expr[":"][s.toLowerCase()] = function (e) {
                        return !!t.data(e, s);
                    }),
                    (t[c] = t[c] || {}),
                    (n = t[c][e]),
                    (o = t[c][e] = function (t, e) {
                        return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new o(t, e);
                    }),
                    t.extend(o, n, { version: a.version, _proto: t.extend({}, a), _childConstructors: [] }),
                    ((r = new i()).options = t.widget.extend({}, r.options)),
                    t.each(a, function (e, a) {
                        return t.isFunction(a)
                            ? void (l[e] = (function () {
                                  var t = function () {
                                          return i.prototype[e].apply(this, arguments);
                                      },
                                      s = function (t) {
                                          return i.prototype[e].apply(this, t);
                                      };
                                  return function () {
                                      var e,
                                          i = this._super,
                                          n = this._superApply;
                                      return (this._super = t), (this._superApply = s), (e = a.apply(this, arguments)), (this._super = i), (this._superApply = n), e;
                                  };
                              })())
                            : void (l[e] = a);
                    }),
                    (o.prototype = t.widget.extend(r, { widgetEventPrefix: (n && r.widgetEventPrefix) || e }, l, { constructor: o, namespace: c, widgetName: e, widgetFullName: s })),
                    n
                        ? (t.each(n._childConstructors, function (e, i) {
                              var a = i.prototype;
                              t.widget(a.namespace + "." + a.widgetName, o, i._proto);
                          }),
                          delete n._childConstructors)
                        : i._childConstructors.push(o),
                    t.widget.bridge(e, o),
                    o
                );
            }),
            (t.widget.extend = function (e) {
                for (var i, a, s = u.call(arguments, 1), n = 0, o = s.length; o > n; n++)
                    for (i in s[n]) (a = s[n][i]), s[n].hasOwnProperty(i) && void 0 !== a && (e[i] = t.isPlainObject(a) ? (t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], a) : t.widget.extend({}, a)) : a);
                return e;
            }),
            (t.widget.bridge = function (e, i) {
                var a = i.prototype.widgetFullName || e;
                t.fn[e] = function (s) {
                    var n = "string" == typeof s,
                        o = u.call(arguments, 1),
                        r = this;
                    return (
                        n
                            ? this.each(function () {
                                  var i,
                                      n = t.data(this, a);
                                  return "instance" === s
                                      ? ((r = n), !1)
                                      : n
                                      ? t.isFunction(n[s]) && "_" !== s.charAt(0)
                                          ? (i = n[s].apply(n, o)) !== n && void 0 !== i
                                              ? ((r = i && i.jquery ? r.pushStack(i.get()) : i), !1)
                                              : void 0
                                          : t.error("no such method '" + s + "' for " + e + " widget instance")
                                      : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + s + "'");
                              })
                            : (o.length && (s = t.widget.extend.apply(null, [s].concat(o))),
                              this.each(function () {
                                  var e = t.data(this, a);
                                  e ? (e.option(s || {}), e._init && e._init()) : t.data(this, a, new i(s, this));
                              })),
                        r
                    );
                };
            }),
            (t.Widget = function () {}),
            (t.Widget._childConstructors = []),
            (t.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: { disabled: !1, create: null },
                _createWidget: function (e, i) {
                    (i = t(i || this.defaultElement || this)[0]),
                        (this.element = t(i)),
                        (this.uuid = c++),
                        (this.eventNamespace = "." + this.widgetName + this.uuid),
                        (this.bindings = t()),
                        (this.hoverable = t()),
                        (this.focusable = t()),
                        i !== this &&
                            (t.data(i, this.widgetFullName, this),
                            this._on(!0, this.element, {
                                remove: function (t) {
                                    t.target === i && this.destroy();
                                },
                            }),
                            (this.document = t(i.style ? i.ownerDocument : i.document || i)),
                            (this.window = t(this.document[0].defaultView || this.document[0].parentWindow))),
                        (this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e)),
                        this._create(),
                        this._trigger("create", null, this._getCreateEventData()),
                        this._init();
                },
                _getCreateOptions: t.noop,
                _getCreateEventData: t.noop,
                _create: t.noop,
                _init: t.noop,
                destroy: function () {
                    this._destroy(),
                        this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
                        this.widget()
                            .unbind(this.eventNamespace)
                            .removeAttr("aria-disabled")
                            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
                        this.bindings.unbind(this.eventNamespace),
                        this.hoverable.removeClass("ui-state-hover"),
                        this.focusable.removeClass("ui-state-focus");
                },
                _destroy: t.noop,
                widget: function () {
                    return this.element;
                },
                option: function (e, i) {
                    var a,
                        s,
                        n,
                        o = e;
                    if (0 === arguments.length) return t.widget.extend({}, this.options);
                    if ("string" == typeof e)
                        if (((o = {}), (a = e.split(".")), (e = a.shift()), a.length)) {
                            for (s = o[e] = t.widget.extend({}, this.options[e]), n = 0; a.length - 1 > n; n++) (s[a[n]] = s[a[n]] || {}), (s = s[a[n]]);
                            if (((e = a.pop()), 1 === arguments.length)) return void 0 === s[e] ? null : s[e];
                            s[e] = i;
                        } else {
                            if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                            o[e] = i;
                        }
                    return this._setOptions(o), this;
                },
                _setOptions: function (t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this;
                },
                _setOption: function (t, e) {
                    return (
                        (this.options[t] = e), "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
                    );
                },
                enable: function () {
                    return this._setOptions({ disabled: !1 });
                },
                disable: function () {
                    return this._setOptions({ disabled: !0 });
                },
                _on: function (e, i, a) {
                    var s,
                        n = this;
                    "boolean" != typeof e && ((a = i), (i = e), (e = !1)),
                        a ? ((i = s = t(i)), (this.bindings = this.bindings.add(i))) : ((a = i), (i = this.element), (s = this.widget())),
                        t.each(a, function (a, o) {
                            function r() {
                                return e || (!0 !== n.options.disabled && !t(this).hasClass("ui-state-disabled")) ? ("string" == typeof o ? n[o] : o).apply(n, arguments) : void 0;
                            }
                            "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || t.guid++);
                            var l = a.match(/^([\w:-]*)\s*(.*)$/),
                                c = l[1] + n.eventNamespace,
                                u = l[2];
                            u ? s.delegate(u, c, r) : i.bind(c, r);
                        });
                },
                _off: function (e, i) {
                    (i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                        e.unbind(i).undelegate(i),
                        (this.bindings = t(this.bindings.not(e).get())),
                        (this.focusable = t(this.focusable.not(e).get())),
                        (this.hoverable = t(this.hoverable.not(e).get()));
                },
                _delay: function (t, e) {
                    function i() {
                        return ("string" == typeof t ? a[t] : t).apply(a, arguments);
                    }
                    var a = this;
                    return setTimeout(i, e || 0);
                },
                _hoverable: function (e) {
                    (this.hoverable = this.hoverable.add(e)),
                        this._on(e, {
                            mouseenter: function (e) {
                                t(e.currentTarget).addClass("ui-state-hover");
                            },
                            mouseleave: function (e) {
                                t(e.currentTarget).removeClass("ui-state-hover");
                            },
                        });
                },
                _focusable: function (e) {
                    (this.focusable = this.focusable.add(e)),
                        this._on(e, {
                            focusin: function (e) {
                                t(e.currentTarget).addClass("ui-state-focus");
                            },
                            focusout: function (e) {
                                t(e.currentTarget).removeClass("ui-state-focus");
                            },
                        });
                },
                _trigger: function (e, i, a) {
                    var s,
                        n,
                        o = this.options[e];
                    if (((a = a || {}), ((i = t.Event(i)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase()), (i.target = this.element[0]), (n = i.originalEvent))) for (s in n) s in i || (i[s] = n[s]);
                    return this.element.trigger(i, a), !((t.isFunction(o) && !1 === o.apply(this.element[0], [i].concat(a))) || i.isDefaultPrevented());
                },
            }),
            t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
                t.Widget.prototype["_" + e] = function (a, s, n) {
                    "string" == typeof s && (s = { effect: s });
                    var o,
                        r = s ? (!0 === s || "number" == typeof s ? i : s.effect || i) : e;
                    "number" == typeof (s = s || {}) && (s = { duration: s }),
                        (o = !t.isEmptyObject(s)),
                        (s.complete = n),
                        s.delay && a.delay(s.delay),
                        o && t.effects && t.effects.effect[r]
                            ? a[e](s)
                            : r !== e && a[r]
                            ? a[r](s.duration, s.easing, n)
                            : a.queue(function (i) {
                                  t(this)[e](), n && n.call(a[0]), i();
                              });
                };
            }),
            t.widget;
        var d = !1;
        t(document).mouseup(function () {
            d = !1;
        }),
            t.widget("ui.mouse", {
                version: "1.11.4",
                options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 },
                _mouseInit: function () {
                    var e = this;
                    this.element
                        .bind("mousedown." + this.widgetName, function (t) {
                            return e._mouseDown(t);
                        })
                        .bind("click." + this.widgetName, function (i) {
                            return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0;
                        }),
                        (this.started = !1);
                },
                _mouseDestroy: function () {
                    this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
                },
                _mouseDown: function (e) {
                    if (!d) {
                        (this._mouseMoved = !1), this._mouseStarted && this._mouseUp(e), (this._mouseDownEvent = e);
                        var i = this,
                            a = 1 === e.which,
                            s = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                        return (
                            !(a && !s && this._mouseCapture(e)) ||
                            ((this.mouseDelayMet = !this.options.delay),
                            this.mouseDelayMet ||
                                (this._mouseDelayTimer = setTimeout(function () {
                                    i.mouseDelayMet = !0;
                                }, this.options.delay)),
                            this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = !1 !== this._mouseStart(e)), !this._mouseStarted)
                                ? (e.preventDefault(), !0)
                                : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"),
                                  (this._mouseMoveDelegate = function (t) {
                                      return i._mouseMove(t);
                                  }),
                                  (this._mouseUpDelegate = function (t) {
                                      return i._mouseUp(t);
                                  }),
                                  this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                                  e.preventDefault(),
                                  (d = !0),
                                  !0))
                        );
                    }
                },
                _mouseMove: function (e) {
                    if (this._mouseMoved) {
                        if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
                        if (!e.which) return this._mouseUp(e);
                    }
                    return (
                        (e.which || e.button) && (this._mouseMoved = !0),
                        this._mouseStarted
                            ? (this._mouseDrag(e), e.preventDefault())
                            : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e)), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
                              !this._mouseStarted)
                    );
                },
                _mouseUp: function (e) {
                    return (
                        this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
                        this._mouseStarted && ((this._mouseStarted = !1), e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)),
                        (d = !1),
                        !1
                    );
                },
                _mouseDistanceMet: function (t) {
                    return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
                },
                _mouseDelayMet: function () {
                    return this.mouseDelayMet;
                },
                _mouseStart: function () {},
                _mouseDrag: function () {},
                _mouseStop: function () {},
                _mouseCapture: function () {
                    return !0;
                },
            }),
            (function () {
                function e(t, e, i) {
                    return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)];
                }
                function i(e, i) {
                    return parseInt(t.css(e, i), 10) || 0;
                }
                function a(e) {
                    var i = e[0];
                    return 9 === i.nodeType
                        ? { width: e.width(), height: e.height(), offset: { top: 0, left: 0 } }
                        : t.isWindow(i)
                        ? { width: e.width(), height: e.height(), offset: { top: e.scrollTop(), left: e.scrollLeft() } }
                        : i.preventDefault
                        ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } }
                        : { width: e.outerWidth(), height: e.outerHeight(), offset: e.offset() };
                }
                t.ui = t.ui || {};
                var s,
                    n,
                    o = Math.max,
                    r = Math.abs,
                    l = Math.round,
                    c = /left|center|right/,
                    u = /top|center|bottom/,
                    d = /[\+\-]\d+(\.[\d]+)?%?/,
                    h = /^\w+/,
                    p = /%$/,
                    f = t.fn.position;
                (t.position = {
                    scrollbarWidth: function () {
                        if (void 0 !== s) return s;
                        var e,
                            i,
                            a = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                            n = a.children()[0];
                        return t("body").append(a), (e = n.offsetWidth), a.css("overflow", "scroll"), e === (i = n.offsetWidth) && (i = a[0].clientWidth), a.remove(), (s = e - i);
                    },
                    getScrollInfo: function (e) {
                        var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                            a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                            s = "scroll" === i || ("auto" === i && e.width < e.element[0].scrollWidth),
                            n;
                        return { width: "scroll" === a || ("auto" === a && e.height < e.element[0].scrollHeight) ? t.position.scrollbarWidth() : 0, height: s ? t.position.scrollbarWidth() : 0 };
                    },
                    getWithinInfo: function (e) {
                        var i = t(e || window),
                            a = t.isWindow(i[0]),
                            s = !!i[0] && 9 === i[0].nodeType;
                        return {
                            element: i,
                            isWindow: a,
                            isDocument: s,
                            offset: i.offset() || { left: 0, top: 0 },
                            scrollLeft: i.scrollLeft(),
                            scrollTop: i.scrollTop(),
                            width: a || s ? i.width() : i.outerWidth(),
                            height: a || s ? i.height() : i.outerHeight(),
                        };
                    },
                }),
                    (t.fn.position = function (s) {
                        if (!s || !s.of) return f.apply(this, arguments);
                        s = t.extend({}, s);
                        var p,
                            m,
                            g,
                            v,
                            b,
                            w,
                            y = t(s.of),
                            _ = t.position.getWithinInfo(s.within),
                            k = t.position.getScrollInfo(_),
                            x = (s.collision || "flip").split(" "),
                            D = {};
                        return (
                            (w = a(y)),
                            y[0].preventDefault && (s.at = "left top"),
                            (m = w.width),
                            (g = w.height),
                            (v = w.offset),
                            (b = t.extend({}, v)),
                            t.each(["my", "at"], function () {
                                var t,
                                    e,
                                    i = (s[this] || "").split(" ");
                                1 === i.length && (i = c.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]),
                                    (i[0] = c.test(i[0]) ? i[0] : "center"),
                                    (i[1] = u.test(i[1]) ? i[1] : "center"),
                                    (t = d.exec(i[0])),
                                    (e = d.exec(i[1])),
                                    (D[this] = [t ? t[0] : 0, e ? e[0] : 0]),
                                    (s[this] = [h.exec(i[0])[0], h.exec(i[1])[0]]);
                            }),
                            1 === x.length && (x[1] = x[0]),
                            "right" === s.at[0] ? (b.left += m) : "center" === s.at[0] && (b.left += m / 2),
                            "bottom" === s.at[1] ? (b.top += g) : "center" === s.at[1] && (b.top += g / 2),
                            (p = e(D.at, m, g)),
                            (b.left += p[0]),
                            (b.top += p[1]),
                            this.each(function () {
                                var a,
                                    c,
                                    u = t(this),
                                    d = u.outerWidth(),
                                    h = u.outerHeight(),
                                    f = i(this, "marginLeft"),
                                    w = i(this, "marginTop"),
                                    C = d + f + i(this, "marginRight") + k.width,
                                    M = h + w + i(this, "marginBottom") + k.height,
                                    S = t.extend({}, b),
                                    T = e(D.my, u.outerWidth(), u.outerHeight());
                                "right" === s.my[0] ? (S.left -= d) : "center" === s.my[0] && (S.left -= d / 2),
                                    "bottom" === s.my[1] ? (S.top -= h) : "center" === s.my[1] && (S.top -= h / 2),
                                    (S.left += T[0]),
                                    (S.top += T[1]),
                                    n || ((S.left = l(S.left)), (S.top = l(S.top))),
                                    (a = { marginLeft: f, marginTop: w }),
                                    t.each(["left", "top"], function (e, i) {
                                        t.ui.position[x[e]] &&
                                            t.ui.position[x[e]][i](S, {
                                                targetWidth: m,
                                                targetHeight: g,
                                                elemWidth: d,
                                                elemHeight: h,
                                                collisionPosition: a,
                                                collisionWidth: C,
                                                collisionHeight: M,
                                                offset: [p[0] + T[0], p[1] + T[1]],
                                                my: s.my,
                                                at: s.at,
                                                within: _,
                                                elem: u,
                                            });
                                    }),
                                    s.using &&
                                        (c = function (t) {
                                            var e = v.left - S.left,
                                                i = e + m - d,
                                                a = v.top - S.top,
                                                n = a + g - h,
                                                l = {
                                                    target: { element: y, left: v.left, top: v.top, width: m, height: g },
                                                    element: { element: u, left: S.left, top: S.top, width: d, height: h },
                                                    horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                                                    vertical: 0 > n ? "top" : a > 0 ? "bottom" : "middle",
                                                };
                                            d > m && m > r(e + i) && (l.horizontal = "center"),
                                                h > g && g > r(a + n) && (l.vertical = "middle"),
                                                (l.important = o(r(e), r(i)) > o(r(a), r(n)) ? "horizontal" : "vertical"),
                                                s.using.call(this, t, l);
                                        }),
                                    u.offset(t.extend(S, { using: c }));
                            })
                        );
                    }),
                    (t.ui.position = {
                        fit: {
                            left: function (t, e) {
                                var i,
                                    a = e.within,
                                    s = a.isWindow ? a.scrollLeft : a.offset.left,
                                    n = a.width,
                                    r = t.left - e.collisionPosition.marginLeft,
                                    l = s - r,
                                    c = r + e.collisionWidth - n - s;
                                e.collisionWidth > n
                                    ? l > 0 && 0 >= c
                                        ? ((i = t.left + l + e.collisionWidth - n - s), (t.left += l - i))
                                        : (t.left = c > 0 && 0 >= l ? s : l > c ? s + n - e.collisionWidth : s)
                                    : l > 0
                                    ? (t.left += l)
                                    : c > 0
                                    ? (t.left -= c)
                                    : (t.left = o(t.left - r, t.left));
                            },
                            top: function (t, e) {
                                var i,
                                    a = e.within,
                                    s = a.isWindow ? a.scrollTop : a.offset.top,
                                    n = e.within.height,
                                    r = t.top - e.collisionPosition.marginTop,
                                    l = s - r,
                                    c = r + e.collisionHeight - n - s;
                                e.collisionHeight > n
                                    ? l > 0 && 0 >= c
                                        ? ((i = t.top + l + e.collisionHeight - n - s), (t.top += l - i))
                                        : (t.top = c > 0 && 0 >= l ? s : l > c ? s + n - e.collisionHeight : s)
                                    : l > 0
                                    ? (t.top += l)
                                    : c > 0
                                    ? (t.top -= c)
                                    : (t.top = o(t.top - r, t.top));
                            },
                        },
                        flip: {
                            left: function (t, e) {
                                var i,
                                    a,
                                    s = e.within,
                                    n = s.offset.left + s.scrollLeft,
                                    o = s.width,
                                    l = s.isWindow ? s.scrollLeft : s.offset.left,
                                    c = t.left - e.collisionPosition.marginLeft,
                                    u = c - l,
                                    d = c + e.collisionWidth - o - l,
                                    h = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                                    p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                                    f = -2 * e.offset[0];
                                0 > u
                                    ? (0 > (i = t.left + h + p + f + e.collisionWidth - o - n) || r(u) > i) && (t.left += h + p + f)
                                    : d > 0 && ((a = t.left - e.collisionPosition.marginLeft + h + p + f - l) > 0 || d > r(a)) && (t.left += h + p + f);
                            },
                            top: function (t, e) {
                                var i,
                                    a,
                                    s = e.within,
                                    n = s.offset.top + s.scrollTop,
                                    o = s.height,
                                    l = s.isWindow ? s.scrollTop : s.offset.top,
                                    c = t.top - e.collisionPosition.marginTop,
                                    u = c - l,
                                    d = c + e.collisionHeight - o - l,
                                    h,
                                    p = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                                    f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                                    m = -2 * e.offset[1];
                                0 > u
                                    ? (0 > (a = t.top + p + f + m + e.collisionHeight - o - n) || r(u) > a) && (t.top += p + f + m)
                                    : d > 0 && ((i = t.top - e.collisionPosition.marginTop + p + f + m - l) > 0 || d > r(i)) && (t.top += p + f + m);
                            },
                        },
                        flipfit: {
                            left: function () {
                                t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments);
                            },
                            top: function () {
                                t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments);
                            },
                        },
                    }),
                    (function () {
                        var e,
                            i,
                            a,
                            s,
                            o,
                            r = document.getElementsByTagName("body")[0],
                            l = document.createElement("div");
                        for (o in ((e = document.createElement(r ? "div" : "body")),
                        (a = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }),
                        r && t.extend(a, { position: "absolute", left: "-1000px", top: "-1000px" }),
                        a))
                            e.style[o] = a[o];
                        e.appendChild(l),
                            (i = r || document.documentElement).insertBefore(e, i.firstChild),
                            (l.style.cssText = "position: absolute; left: 10.7432222px;"),
                            (s = t(l).offset().left),
                            (n = s > 10 && 11 > s),
                            (e.innerHTML = ""),
                            i.removeChild(e);
                    })();
            })(),
            t.ui.position,
            t.widget("ui.menu", {
                version: "1.11.4",
                defaultElement: "<ul>",
                delay: 300,
                options: { icons: { submenu: "ui-icon-carat-1-e" }, items: "> *", menus: "ul", position: { my: "left-1 top", at: "right top" }, role: "menu", blur: null, focus: null, select: null },
                _create: function () {
                    (this.activeMenu = this.element),
                        (this.mouseHandled = !1),
                        this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({ role: this.options.role, tabIndex: 0 }),
                        this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
                        this._on({
                            "mousedown .ui-menu-item": function (t) {
                                t.preventDefault();
                            },
                            "click .ui-menu-item": function (e) {
                                var i = t(e.target);
                                !this.mouseHandled &&
                                    i.not(".ui-state-disabled").length &&
                                    (this.select(e),
                                    e.isPropagationStopped() || (this.mouseHandled = !0),
                                    i.has(".ui-menu").length
                                        ? this.expand(e)
                                        : !this.element.is(":focus") &&
                                          t(this.document[0].activeElement).closest(".ui-menu").length &&
                                          (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                            },
                            "mouseenter .ui-menu-item": function (e) {
                                if (!this.previousFilter) {
                                    var i = t(e.currentTarget);
                                    i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i);
                                }
                            },
                            mouseleave: "collapseAll",
                            "mouseleave .ui-menu": "collapseAll",
                            focus: function (t, e) {
                                var i = this.active || this.element.find(this.options.items).eq(0);
                                e || this.focus(t, i);
                            },
                            blur: function (e) {
                                this._delay(function () {
                                    t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e);
                                });
                            },
                            keydown: "_keydown",
                        }),
                        this.refresh(),
                        this._on(this.document, {
                            click: function (t) {
                                this._closeOnDocumentClick(t) && this.collapseAll(t), (this.mouseHandled = !1);
                            },
                        });
                },
                _destroy: function () {
                    this.element
                        .removeAttr("aria-activedescendant")
                        .find(".ui-menu")
                        .addBack()
                        .removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front")
                        .removeAttr("role")
                        .removeAttr("tabIndex")
                        .removeAttr("aria-labelledby")
                        .removeAttr("aria-expanded")
                        .removeAttr("aria-hidden")
                        .removeAttr("aria-disabled")
                        .removeUniqueId()
                        .show(),
                        this.element
                            .find(".ui-menu-item")
                            .removeClass("ui-menu-item")
                            .removeAttr("role")
                            .removeAttr("aria-disabled")
                            .removeUniqueId()
                            .removeClass("ui-state-hover")
                            .removeAttr("tabIndex")
                            .removeAttr("role")
                            .removeAttr("aria-haspopup")
                            .children()
                            .each(function () {
                                var e = t(this);
                                e.data("ui-menu-submenu-carat") && e.remove();
                            }),
                        this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
                },
                _keydown: function (e) {
                    var i,
                        a,
                        s,
                        n,
                        o = !0;
                    switch (e.keyCode) {
                        case t.ui.keyCode.PAGE_UP:
                            this.previousPage(e);
                            break;
                        case t.ui.keyCode.PAGE_DOWN:
                            this.nextPage(e);
                            break;
                        case t.ui.keyCode.HOME:
                            this._move("first", "first", e);
                            break;
                        case t.ui.keyCode.END:
                            this._move("last", "last", e);
                            break;
                        case t.ui.keyCode.UP:
                            this.previous(e);
                            break;
                        case t.ui.keyCode.DOWN:
                            this.next(e);
                            break;
                        case t.ui.keyCode.LEFT:
                            this.collapse(e);
                            break;
                        case t.ui.keyCode.RIGHT:
                            this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                            break;
                        case t.ui.keyCode.ENTER:
                        case t.ui.keyCode.SPACE:
                            this._activate(e);
                            break;
                        case t.ui.keyCode.ESCAPE:
                            this.collapse(e);
                            break;
                        default:
                            (o = !1),
                                (a = this.previousFilter || ""),
                                (s = String.fromCharCode(e.keyCode)),
                                (n = !1),
                                clearTimeout(this.filterTimer),
                                s === a ? (n = !0) : (s = a + s),
                                (i = this._filterMenuItems(s)),
                                (i = n && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i).length || ((s = String.fromCharCode(e.keyCode)), (i = this._filterMenuItems(s))),
                                i.length
                                    ? (this.focus(e, i),
                                      (this.previousFilter = s),
                                      (this.filterTimer = this._delay(function () {
                                          delete this.previousFilter;
                                      }, 1e3)))
                                    : delete this.previousFilter;
                    }
                    o && e.preventDefault();
                },
                _activate: function (t) {
                    this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(t) : this.select(t));
                },
                refresh: function () {
                    var e,
                        i,
                        a = this,
                        s = this.options.icons.submenu,
                        n = this.element.find(this.options.menus);
                    this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
                        n
                            .filter(":not(.ui-menu)")
                            .addClass("ui-menu ui-widget ui-widget-content ui-front")
                            .hide()
                            .attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" })
                            .each(function () {
                                var e = t(this),
                                    i = e.parent(),
                                    a = t("<span>")
                                        .addClass("ui-menu-icon ui-icon " + s)
                                        .data("ui-menu-submenu-carat", !0);
                                i.attr("aria-haspopup", "true").prepend(a), e.attr("aria-labelledby", i.attr("id"));
                            }),
                        (i = (e = n.add(this.element)).find(this.options.items)).not(".ui-menu-item").each(function () {
                            var e = t(this);
                            a._isDivider(e) && e.addClass("ui-widget-content ui-menu-divider");
                        }),
                        i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }),
                        i.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                        this.active && !t.contains(this.element[0], this.active[0]) && this.blur();
                },
                _itemRole: function () {
                    return { menu: "menuitem", listbox: "option" }[this.options.role];
                },
                _setOption: function (t, e) {
                    "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),
                        "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e).attr("aria-disabled", e),
                        this._super(t, e);
                },
                focus: function (t, e) {
                    var i, a;
                    this.blur(t, t && "focus" === t.type),
                        this._scrollIntoView(e),
                        (this.active = e.first()),
                        (a = this.active.addClass("ui-state-focus").removeClass("ui-state-active")),
                        this.options.role && this.element.attr("aria-activedescendant", a.attr("id")),
                        this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),
                        t && "keydown" === t.type
                            ? this._close()
                            : (this.timer = this._delay(function () {
                                  this._close();
                              }, this.delay)),
                        (i = e.children(".ui-menu")).length && t && /^mouse/.test(t.type) && this._startOpening(i),
                        (this.activeMenu = e.parent()),
                        this._trigger("focus", t, { item: e });
                },
                _scrollIntoView: function (e) {
                    var i, a, s, n, o, r;
                    this._hasScroll() &&
                        ((i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0),
                        (a = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0),
                        (s = e.offset().top - this.activeMenu.offset().top - i - a),
                        (n = this.activeMenu.scrollTop()),
                        (o = this.activeMenu.height()),
                        (r = e.outerHeight()),
                        0 > s ? this.activeMenu.scrollTop(n + s) : s + r > o && this.activeMenu.scrollTop(n + s - o + r));
                },
                blur: function (t, e) {
                    e || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), (this.active = null), this._trigger("blur", t, { item: this.active }));
                },
                _startOpening: function (t) {
                    clearTimeout(this.timer),
                        "true" === t.attr("aria-hidden") &&
                            (this.timer = this._delay(function () {
                                this._close(), this._open(t);
                            }, this.delay));
                },
                _open: function (e) {
                    var i = t.extend({ of: this.active }, this.options.position);
                    clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);
                },
                collapseAll: function (e, i) {
                    clearTimeout(this.timer),
                        (this.timer = this._delay(function () {
                            var a = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                            a.length || (a = this.element), this._close(a), this.blur(e), (this.activeMenu = a);
                        }, this.delay));
                },
                _close: function (t) {
                    t || (t = this.active ? this.active.parent() : this.element),
                        t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");
                },
                _closeOnDocumentClick: function (e) {
                    return !t(e.target).closest(".ui-menu").length;
                },
                _isDivider: function (t) {
                    return !/[^\-\u2014\u2013\s]/.test(t.text());
                },
                collapse: function (t) {
                    var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                    e && e.length && (this._close(), this.focus(t, e));
                },
                expand: function (t) {
                    var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                    e &&
                        e.length &&
                        (this._open(e.parent()),
                        this._delay(function () {
                            this.focus(t, e);
                        }));
                },
                next: function (t) {
                    this._move("next", "first", t);
                },
                previous: function (t) {
                    this._move("prev", "last", t);
                },
                isFirstItem: function () {
                    return this.active && !this.active.prevAll(".ui-menu-item").length;
                },
                isLastItem: function () {
                    return this.active && !this.active.nextAll(".ui-menu-item").length;
                },
                _move: function (t, e, i) {
                    var a;
                    this.active && (a = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)),
                        (a && a.length && this.active) || (a = this.activeMenu.find(this.options.items)[e]()),
                        this.focus(i, a);
                },
                nextPage: function (e) {
                    var i, a, s;
                    return this.active
                        ? void (
                              this.isLastItem() ||
                              (this._hasScroll()
                                  ? ((a = this.active.offset().top),
                                    (s = this.element.height()),
                                    this.active.nextAll(".ui-menu-item").each(function () {
                                        return 0 > (i = t(this)).offset().top - a - s;
                                    }),
                                    this.focus(e, i))
                                  : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
                          )
                        : void this.next(e);
                },
                previousPage: function (e) {
                    var i, a, s;
                    return this.active
                        ? void (
                              this.isFirstItem() ||
                              (this._hasScroll()
                                  ? ((a = this.active.offset().top),
                                    (s = this.element.height()),
                                    this.active.prevAll(".ui-menu-item").each(function () {
                                        return (i = t(this)).offset().top - a + s > 0;
                                    }),
                                    this.focus(e, i))
                                  : this.focus(e, this.activeMenu.find(this.options.items).first()))
                          )
                        : void this.next(e);
                },
                _hasScroll: function () {
                    return this.element.outerHeight() < this.element.prop("scrollHeight");
                },
                select: function (e) {
                    this.active = this.active || t(e.target).closest(".ui-menu-item");
                    var i = { item: this.active };
                    this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i);
                },
                _filterMenuItems: function (e) {
                    var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                        a = RegExp("^" + i, "i");
                    return this.activeMenu
                        .find(this.options.items)
                        .filter(".ui-menu-item")
                        .filter(function () {
                            return a.test(t.trim(t(this).text()));
                        });
                },
            }),
            t.widget("ui.autocomplete", {
                version: "1.11.4",
                defaultElement: "<input>",
                options: {
                    appendTo: null,
                    autoFocus: !1,
                    delay: 300,
                    minLength: 1,
                    position: { my: "left top", at: "left bottom", collision: "none" },
                    source: null,
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    response: null,
                    search: null,
                    select: null,
                },
                requestIndex: 0,
                pending: 0,
                _create: function () {
                    var e,
                        i,
                        a,
                        s = this.element[0].nodeName.toLowerCase(),
                        n = "textarea" === s,
                        o = "input" === s;
                    (this.isMultiLine = !!n || (!o && this.element.prop("isContentEditable"))),
                        (this.valueMethod = this.element[n || o ? "val" : "text"]),
                        (this.isNewMenu = !0),
                        this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
                        this._on(this.element, {
                            keydown: function (s) {
                                if (this.element.prop("readOnly")) return (e = !0), (a = !0), void (i = !0);
                                (e = !1), (a = !1), (i = !1);
                                var n = t.ui.keyCode;
                                switch (s.keyCode) {
                                    case n.PAGE_UP:
                                        (e = !0), this._move("previousPage", s);
                                        break;
                                    case n.PAGE_DOWN:
                                        (e = !0), this._move("nextPage", s);
                                        break;
                                    case n.UP:
                                        (e = !0), this._keyEvent("previous", s);
                                        break;
                                    case n.DOWN:
                                        (e = !0), this._keyEvent("next", s);
                                        break;
                                    case n.ENTER:
                                        this.menu.active && ((e = !0), s.preventDefault(), this.menu.select(s));
                                        break;
                                    case n.TAB:
                                        this.menu.active && this.menu.select(s);
                                        break;
                                    case n.ESCAPE:
                                        this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(s), s.preventDefault());
                                        break;
                                    default:
                                        (i = !0), this._searchTimeout(s);
                                }
                            },
                            keypress: function (a) {
                                if (e) return (e = !1), void ((!this.isMultiLine || this.menu.element.is(":visible")) && a.preventDefault());
                                if (!i) {
                                    var s = t.ui.keyCode;
                                    switch (a.keyCode) {
                                        case s.PAGE_UP:
                                            this._move("previousPage", a);
                                            break;
                                        case s.PAGE_DOWN:
                                            this._move("nextPage", a);
                                            break;
                                        case s.UP:
                                            this._keyEvent("previous", a);
                                            break;
                                        case s.DOWN:
                                            this._keyEvent("next", a);
                                    }
                                }
                            },
                            input: function (t) {
                                return a ? ((a = !1), void t.preventDefault()) : void this._searchTimeout(t);
                            },
                            focus: function () {
                                (this.selectedItem = null), (this.previous = this._value());
                            },
                            blur: function (t) {
                                return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t));
                            },
                        }),
                        this._initSource(),
                        (this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance")),
                        this._on(this.menu.element, {
                            mousedown: function (e) {
                                e.preventDefault(),
                                    (this.cancelBlur = !0),
                                    this._delay(function () {
                                        delete this.cancelBlur;
                                    });
                                var i = this.menu.element[0];
                                t(e.target).closest(".ui-menu-item").length ||
                                    this._delay(function () {
                                        var e = this;
                                        this.document.one("mousedown", function (a) {
                                            a.target === e.element[0] || a.target === i || t.contains(i, a.target) || e.close();
                                        });
                                    });
                            },
                            menufocus: function (e, i) {
                                var a, s;
                                return this.isNewMenu && ((this.isNewMenu = !1), e.originalEvent && /^mouse/.test(e.originalEvent.type))
                                    ? (this.menu.blur(),
                                      void this.document.one("mousemove", function () {
                                          t(e.target).trigger(e.originalEvent);
                                      }))
                                    : ((s = i.item.data("ui-autocomplete-item")),
                                      !1 !== this._trigger("focus", e, { item: s }) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value),
                                      void ((a = i.item.attr("aria-label") || s.value) && t.trim(a).length && (this.liveRegion.children().hide(), t("<div>").text(a).appendTo(this.liveRegion))));
                            },
                            menuselect: function (t, e) {
                                var i = e.item.data("ui-autocomplete-item"),
                                    a = this.previous;
                                this.element[0] !== this.document[0].activeElement &&
                                    (this.element.focus(),
                                    (this.previous = a),
                                    this._delay(function () {
                                        (this.previous = a), (this.selectedItem = i);
                                    })),
                                    !1 !== this._trigger("select", t, { item: i }) && this._value(i.value),
                                    (this.term = this._value()),
                                    this.close(t),
                                    (this.selectedItem = i);
                            },
                        }),
                        (this.liveRegion = t("<span>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)),
                        this._on(this.window, {
                            beforeunload: function () {
                                this.element.removeAttr("autocomplete");
                            },
                        });
                },
                _destroy: function () {
                    clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
                },
                _setOption: function (t, e) {
                    this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort();
                },
                _appendTo: function () {
                    var e = this.options.appendTo;
                    return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), (e && e[0]) || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e;
                },
                _initSource: function () {
                    var e,
                        i,
                        a = this;
                    t.isArray(this.options.source)
                        ? ((e = this.options.source),
                          (this.source = function (i, a) {
                              a(t.ui.autocomplete.filter(e, i.term));
                          }))
                        : "string" == typeof this.options.source
                        ? ((i = this.options.source),
                          (this.source = function (e, s) {
                              a.xhr && a.xhr.abort(),
                                  (a.xhr = t.ajax({
                                      url: i,
                                      data: e,
                                      dataType: "json",
                                      success: function (t) {
                                          s(t);
                                      },
                                      error: function () {
                                          s([]);
                                      },
                                  }));
                          }))
                        : (this.source = this.options.source);
                },
                _searchTimeout: function (t) {
                    clearTimeout(this.searching),
                        (this.searching = this._delay(function () {
                            var e = this.term === this._value(),
                                i = this.menu.element.is(":visible"),
                                a = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                            (!e || (e && !i && !a)) && ((this.selectedItem = null), this.search(null, t));
                        }, this.options.delay));
                },
                search: function (t, e) {
                    return (t = null != t ? t : this._value()), (this.term = this._value()), t.length < this.options.minLength ? this.close(e) : !1 !== this._trigger("search", e) ? this._search(t) : void 0;
                },
                _search: function (t) {
                    this.pending++, this.element.addClass("ui-autocomplete-loading"), (this.cancelSearch = !1), this.source({ term: t }, this._response());
                },
                _response: function () {
                    var e = ++this.requestIndex;
                    return t.proxy(function (t) {
                        e === this.requestIndex && this.__response(t), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading");
                    }, this);
                },
                __response: function (t) {
                    t && (t = this._normalize(t)), this._trigger("response", null, { content: t }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close();
                },
                close: function (t) {
                    (this.cancelSearch = !0), this._close(t);
                },
                _close: function (t) {
                    this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), (this.isNewMenu = !0), this._trigger("close", t));
                },
                _change: function (t) {
                    this.previous !== this._value() && this._trigger("change", t, { item: this.selectedItem });
                },
                _normalize: function (e) {
                    return e.length && e[0].label && e[0].value
                        ? e
                        : t.map(e, function (e) {
                              return "string" == typeof e ? { label: e, value: e } : t.extend({}, e, { label: e.label || e.value, value: e.value || e.label });
                          });
                },
                _suggest: function (e) {
                    var i = this.menu.element.empty();
                    this._renderMenu(i, e), (this.isNewMenu = !0), this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next();
                },
                _resizeMenu: function () {
                    var t = this.menu.element;
                    t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
                },
                _renderMenu: function (e, i) {
                    var a = this;
                    t.each(i, function (t, i) {
                        a._renderItemData(e, i);
                    });
                },
                _renderItemData: function (t, e) {
                    return this._renderItem(t, e).data("ui-autocomplete-item", e);
                },
                _renderItem: function (e, i) {
                    return t("<li>").text(i.label).appendTo(e);
                },
                _move: function (t, e) {
                    return this.menu.element.is(":visible")
                        ? (this.menu.isFirstItem() && /^previous/.test(t)) || (this.menu.isLastItem() && /^next/.test(t))
                            ? (this.isMultiLine || this._value(this.term), void this.menu.blur())
                            : void this.menu[t](e)
                        : void this.search(null, e);
                },
                widget: function () {
                    return this.menu.element;
                },
                _value: function () {
                    return this.valueMethod.apply(this.element, arguments);
                },
                _keyEvent: function (t, e) {
                    (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault());
                },
            }),
            t.extend(t.ui.autocomplete, {
                escapeRegex: function (t) {
                    return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                },
                filter: function (e, i) {
                    var a = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                    return t.grep(e, function (t) {
                        return a.test(t.label || t.value || t);
                    });
                },
            }),
            t.widget("ui.autocomplete", t.ui.autocomplete, {
                options: {
                    messages: {
                        noResults: "No search results.",
                        results: function (t) {
                            return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                        },
                    },
                },
                __response: function (e) {
                    var i;
                    this._superApply(arguments),
                        this.options.disabled ||
                            this.cancelSearch ||
                            ((i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults), this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion));
                },
            }),
            t.ui.autocomplete;
        var h,
            p = "ui-button ui-widget ui-state-default ui-corner-all",
            f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            m = function () {
                var e = t(this);
                setTimeout(function () {
                    e.find(":ui-button").button("refresh");
                }, 1);
            },
            g = function (e) {
                var i = e.name,
                    a = e.form,
                    s = t([]);
                return (
                    i &&
                        ((i = i.replace(/'/g, "\\'")),
                        (s = a
                            ? t(a).find("[name='" + i + "'][type=radio]")
                            : t("[name='" + i + "'][type=radio]", e.ownerDocument).filter(function () {
                                  return !this.form;
                              }))),
                    s
                );
            },
            v;
        t.widget("ui.button", {
            version: "1.11.4",
            defaultElement: "<button>",
            options: { disabled: null, text: !0, label: null, icons: { primary: null, secondary: null } },
            _create: function () {
                this.element
                    .closest("form")
                    .unbind("reset" + this.eventNamespace)
                    .bind("reset" + this.eventNamespace, m),
                    "boolean" != typeof this.options.disabled ? (this.options.disabled = !!this.element.prop("disabled")) : this.element.prop("disabled", this.options.disabled),
                    this._determineButtonType(),
                    (this.hasTitle = !!this.buttonElement.attr("title"));
                var e = this,
                    i = this.options,
                    a = "checkbox" === this.type || "radio" === this.type,
                    s = a ? "" : "ui-state-active";
                null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
                    this._hoverable(this.buttonElement),
                    this.buttonElement
                        .addClass(p)
                        .attr("role", "button")
                        .bind("mouseenter" + this.eventNamespace, function () {
                            i.disabled || (this === h && t(this).addClass("ui-state-active"));
                        })
                        .bind("mouseleave" + this.eventNamespace, function () {
                            i.disabled || t(this).removeClass(s);
                        })
                        .bind("click" + this.eventNamespace, function (t) {
                            i.disabled && (t.preventDefault(), t.stopImmediatePropagation());
                        }),
                    this._on({
                        focus: function () {
                            this.buttonElement.addClass("ui-state-focus");
                        },
                        blur: function () {
                            this.buttonElement.removeClass("ui-state-focus");
                        },
                    }),
                    a &&
                        this.element.bind("change" + this.eventNamespace, function () {
                            e.refresh();
                        }),
                    "checkbox" === this.type
                        ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                              return !i.disabled && void 0;
                          })
                        : "radio" === this.type
                        ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                              if (i.disabled) return !1;
                              t(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                              var a = e.element[0];
                              g(a)
                                  .not(a)
                                  .map(function () {
                                      return t(this).button("widget")[0];
                                  })
                                  .removeClass("ui-state-active")
                                  .attr("aria-pressed", "false");
                          })
                        : (this.buttonElement
                              .bind("mousedown" + this.eventNamespace, function () {
                                  return (
                                      !i.disabled &&
                                      (t(this).addClass("ui-state-active"),
                                      (h = this),
                                      void e.document.one("mouseup", function () {
                                          h = null;
                                      }))
                                  );
                              })
                              .bind("mouseup" + this.eventNamespace, function () {
                                  return !i.disabled && void t(this).removeClass("ui-state-active");
                              })
                              .bind("keydown" + this.eventNamespace, function (e) {
                                  return !i.disabled && void ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"));
                              })
                              .bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                                  t(this).removeClass("ui-state-active");
                              }),
                          this.buttonElement.is("a") &&
                              this.buttonElement.keyup(function (e) {
                                  e.keyCode === t.ui.keyCode.SPACE && t(this).click();
                              })),
                    this._setOption("disabled", i.disabled),
                    this._resetButton();
            },
            _determineButtonType: function () {
                var t, e, i;
                (this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button"),
                    "checkbox" === this.type || "radio" === this.type
                        ? ((t = this.element.parents().last()),
                          (e = "label[for='" + this.element.attr("id") + "']"),
                          (this.buttonElement = t.find(e)),
                          this.buttonElement.length || ((t = t.length ? t.siblings() : this.element.siblings()), (this.buttonElement = t.filter(e)), this.buttonElement.length || (this.buttonElement = t.find(e))),
                          this.element.addClass("ui-helper-hidden-accessible"),
                          (i = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active"),
                          this.buttonElement.prop("aria-pressed", i))
                        : (this.buttonElement = this.element);
            },
            widget: function () {
                return this.buttonElement;
            },
            _destroy: function () {
                this.element.removeClass("ui-helper-hidden-accessible"),
                    this.buttonElement
                        .removeClass(p + " ui-state-active " + f)
                        .removeAttr("role")
                        .removeAttr("aria-pressed")
                        .html(this.buttonElement.find(".ui-button-text").html()),
                    this.hasTitle || this.buttonElement.removeAttr("title");
            },
            _setOption: function (t, e) {
                return (
                    this._super(t, e),
                    "disabled" === t
                        ? (this.widget().toggleClass("ui-state-disabled", !!e),
                          this.element.prop("disabled", !!e),
                          void (e && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active"))))
                        : void this._resetButton()
                );
            },
            refresh: function () {
                var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                e !== this.options.disabled && this._setOption("disabled", e),
                    "radio" === this.type
                        ? g(this.element[0]).each(function () {
                              t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
                          })
                        : "checkbox" === this.type &&
                          (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
            },
            _resetButton: function () {
                if ("input" !== this.type) {
                    var e = this.buttonElement.removeClass(f),
                        i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                        a = this.options.icons,
                        s = a.primary && a.secondary,
                        n = [];
                    a.primary || a.secondary
                        ? (this.options.text && n.push("ui-button-text-icon" + (s ? "s" : a.primary ? "-primary" : "-secondary")),
                          a.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + a.primary + "'></span>"),
                          a.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + a.secondary + "'></span>"),
                          this.options.text || (n.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i))))
                        : n.push("ui-button-text-only"),
                        e.addClass(n.join(" "));
                } else this.options.label && this.element.val(this.options.label);
            },
        }),
            t.widget("ui.buttonset", {
                version: "1.11.4",
                options: { items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)" },
                _create: function () {
                    this.element.addClass("ui-buttonset");
                },
                _init: function () {
                    this.refresh();
                },
                _setOption: function (t, e) {
                    "disabled" === t && this.buttons.button("option", t, e), this._super(t, e);
                },
                refresh: function () {
                    var e = "rtl" === this.element.css("direction"),
                        i = this.element.find(this.options.items),
                        a = i.filter(":ui-button");
                    i.not(":ui-button").button(),
                        a.button("refresh"),
                        (this.buttons = i
                            .map(function () {
                                return t(this).button("widget")[0];
                            })
                            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
                            .filter(":first")
                            .addClass(e ? "ui-corner-right" : "ui-corner-left")
                            .end()
                            .filter(":last")
                            .addClass(e ? "ui-corner-left" : "ui-corner-right")
                            .end()
                            .end());
                },
                _destroy: function () {
                    this.element.removeClass("ui-buttonset"),
                        this.buttons
                            .map(function () {
                                return t(this).button("widget")[0];
                            })
                            .removeClass("ui-corner-left ui-corner-right")
                            .end()
                            .button("destroy");
                },
            }),
            t.ui.button,
            t.extend(t.ui, { datepicker: { version: "1.11.4" } }),
            t.extend(s.prototype, {
                markerClassName: "hasDatepicker",
                maxRows: 4,
                _widgetDatepicker: function () {
                    return this.dpDiv;
                },
                setDefaults: function (t) {
                    return r(this._defaults, t || {}), this;
                },
                _attachDatepicker: function (e, i) {
                    var a, s, n;
                    (s = "div" === (a = e.nodeName.toLowerCase()) || "span" === a),
                        e.id || ((this.uuid += 1), (e.id = "dp" + this.uuid)),
                        ((n = this._newInst(t(e), s)).settings = t.extend({}, i || {})),
                        "input" === a ? this._connectDatepicker(e, n) : s && this._inlineDatepicker(e, n);
                },
                _newInst: function (e, i) {
                    var a;
                    return {
                        id: e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                        input: e,
                        selectedDay: 0,
                        selectedMonth: 0,
                        selectedYear: 0,
                        drawMonth: 0,
                        drawYear: 0,
                        inline: i,
                        dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv,
                    };
                },
                _connectDatepicker: function (e, i) {
                    var a = t(e);
                    (i.append = t([])),
                        (i.trigger = t([])),
                        a.hasClass(this.markerClassName) ||
                            (this._attachments(a, i),
                            a.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
                            this._autoSize(i),
                            t.data(e, "datepicker", i),
                            i.settings.disabled && this._disableDatepicker(e));
                },
                _attachments: function (e, i) {
                    var a,
                        s,
                        n,
                        o = this._get(i, "appendText"),
                        r = this._get(i, "isRTL");
                    i.append && i.append.remove(),
                        o && ((i.append = t("<span class='" + this._appendClass + "'>" + o + "</span>")), e[r ? "before" : "after"](i.append)),
                        e.unbind("focus", this._showDatepicker),
                        i.trigger && i.trigger.remove(),
                        ("focus" === (a = this._get(i, "showOn")) || "both" === a) && e.focus(this._showDatepicker),
                        ("button" === a || "both" === a) &&
                            ((s = this._get(i, "buttonText")),
                            (n = this._get(i, "buttonImage")),
                            (i.trigger = t(
                                this._get(i, "buttonImageOnly")
                                    ? t("<img/>").addClass(this._triggerClass).attr({ src: n, alt: s, title: s })
                                    : t("<button type='button'></button>")
                                          .addClass(this._triggerClass)
                                          .html(n ? t("<img/>").attr({ src: n, alt: s, title: s }) : s)
                            )),
                            e[r ? "before" : "after"](i.trigger),
                            i.trigger.click(function () {
                                return (
                                    t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0]
                                        ? t.datepicker._hideDatepicker()
                                        : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0]
                                        ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0]))
                                        : t.datepicker._showDatepicker(e[0]),
                                    !1
                                );
                            }));
                },
                _autoSize: function (t) {
                    if (this._get(t, "autoSize") && !t.inline) {
                        var e,
                            i,
                            a,
                            s,
                            n = new Date(2009, 11, 20),
                            o = this._get(t, "dateFormat");
                        o.match(/[DM]/) &&
                            ((e = function (t) {
                                for (i = 0, a = 0, s = 0; t.length > s; s++) t[s].length > i && ((i = t[s].length), (a = s));
                                return a;
                            }),
                            n.setMonth(e(this._get(t, o.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                            n.setDate(e(this._get(t, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - n.getDay())),
                            t.input.attr("size", this._formatDate(t, n).length);
                    }
                },
                _inlineDatepicker: function (e, i) {
                    var a = t(e);
                    a.hasClass(this.markerClassName) ||
                        (a.addClass(this.markerClassName).append(i.dpDiv),
                        t.data(e, "datepicker", i),
                        this._setDate(i, this._getDefaultDate(i), !0),
                        this._updateDatepicker(i),
                        this._updateAlternate(i),
                        i.settings.disabled && this._disableDatepicker(e),
                        i.dpDiv.css("display", "block"));
                },
                _dialogDatepicker: function (e, i, a, s, n) {
                    var o,
                        l,
                        c,
                        u,
                        d,
                        h = this._dialogInst;
                    return (
                        h ||
                            ((this.uuid += 1),
                            (o = "dp" + this.uuid),
                            (this._dialogInput = t("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>")),
                            this._dialogInput.keydown(this._doKeyDown),
                            t("body").append(this._dialogInput),
                            ((h = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}),
                            t.data(this._dialogInput[0], "datepicker", h)),
                        r(h.settings, s || {}),
                        (i = i && i.constructor === Date ? this._formatDate(h, i) : i),
                        this._dialogInput.val(i),
                        (this._pos = n ? (n.length ? n : [n.pageX, n.pageY]) : null),
                        this._pos ||
                            ((l = document.documentElement.clientWidth),
                            (c = document.documentElement.clientHeight),
                            (u = document.documentElement.scrollLeft || document.body.scrollLeft),
                            (d = document.documentElement.scrollTop || document.body.scrollTop),
                            (this._pos = [l / 2 - 100 + u, c / 2 - 150 + d])),
                        this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                        (h.settings.onSelect = a),
                        (this._inDialog = !0),
                        this.dpDiv.addClass(this._dialogClass),
                        this._showDatepicker(this._dialogInput[0]),
                        t.blockUI && t.blockUI(this.dpDiv),
                        t.data(this._dialogInput[0], "datepicker", h),
                        this
                    );
                },
                _destroyDatepicker: function (e) {
                    var i,
                        a = t(e),
                        s = t.data(e, "datepicker");
                    a.hasClass(this.markerClassName) &&
                        ((i = e.nodeName.toLowerCase()),
                        t.removeData(e, "datepicker"),
                        "input" === i
                            ? (s.append.remove(),
                              s.trigger.remove(),
                              a.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp))
                            : ("div" === i || "span" === i) && a.removeClass(this.markerClassName).empty(),
                        v === s && (v = null));
                },
                _enableDatepicker: function (e) {
                    var i,
                        a,
                        s = t(e),
                        n = t.data(e, "datepicker");
                    s.hasClass(this.markerClassName) &&
                        ("input" === (i = e.nodeName.toLowerCase())
                            ? ((e.disabled = !1),
                              n.trigger
                                  .filter("button")
                                  .each(function () {
                                      this.disabled = !1;
                                  })
                                  .end()
                                  .filter("img")
                                  .css({ opacity: "1.0", cursor: "" }))
                            : ("div" === i || "span" === i) && ((a = s.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
                        (this._disabledInputs = t.map(this._disabledInputs, function (t) {
                            return t === e ? null : t;
                        })));
                },
                _disableDatepicker: function (e) {
                    var i,
                        a,
                        s = t(e),
                        n = t.data(e, "datepicker");
                    s.hasClass(this.markerClassName) &&
                        ("input" === (i = e.nodeName.toLowerCase())
                            ? ((e.disabled = !0),
                              n.trigger
                                  .filter("button")
                                  .each(function () {
                                      this.disabled = !0;
                                  })
                                  .end()
                                  .filter("img")
                                  .css({ opacity: "0.5", cursor: "default" }))
                            : ("div" === i || "span" === i) && ((a = s.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), a.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                        (this._disabledInputs = t.map(this._disabledInputs, function (t) {
                            return t === e ? null : t;
                        })),
                        (this._disabledInputs[this._disabledInputs.length] = e));
                },
                _isDisabledDatepicker: function (t) {
                    if (!t) return !1;
                    for (var e = 0; this._disabledInputs.length > e; e++) if (this._disabledInputs[e] === t) return !0;
                    return !1;
                },
                _getInst: function (e) {
                    try {
                        return t.data(e, "datepicker");
                    } catch (t) {
                        throw "Missing instance data for this datepicker";
                    }
                },
                _optionDatepicker: function (e, i, a) {
                    var s,
                        n,
                        o,
                        l,
                        c = this._getInst(e);
                    return 2 === arguments.length && "string" == typeof i
                        ? "defaults" === i
                            ? t.extend({}, t.datepicker._defaults)
                            : c
                            ? "all" === i
                                ? t.extend({}, c.settings)
                                : this._get(c, i)
                            : null
                        : ((s = i || {}),
                          "string" == typeof i && ((s = {})[i] = a),
                          void (
                              c &&
                              (this._curInst === c && this._hideDatepicker(),
                              (n = this._getDateDatepicker(e, !0)),
                              (o = this._getMinMaxDate(c, "min")),
                              (l = this._getMinMaxDate(c, "max")),
                              r(c.settings, s),
                              null !== o && void 0 !== s.dateFormat && void 0 === s.minDate && (c.settings.minDate = this._formatDate(c, o)),
                              null !== l && void 0 !== s.dateFormat && void 0 === s.maxDate && (c.settings.maxDate = this._formatDate(c, l)),
                              "disabled" in s && (s.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)),
                              this._attachments(t(e), c),
                              this._autoSize(c),
                              this._setDate(c, n),
                              this._updateAlternate(c),
                              this._updateDatepicker(c))
                          ));
                },
                _changeDatepicker: function (t, e, i) {
                    this._optionDatepicker(t, e, i);
                },
                _refreshDatepicker: function (t) {
                    var e = this._getInst(t);
                    e && this._updateDatepicker(e);
                },
                _setDateDatepicker: function (t, e) {
                    var i = this._getInst(t);
                    i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i));
                },
                _getDateDatepicker: function (t, e) {
                    var i = this._getInst(t);
                    return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null;
                },
                _doKeyDown: function (e) {
                    var i,
                        a,
                        s,
                        n = t.datepicker._getInst(e.target),
                        o = !0,
                        r = n.dpDiv.is(".ui-datepicker-rtl");
                    if (((n._keyEvent = !0), t.datepicker._datepickerShowing))
                        switch (e.keyCode) {
                            case 9:
                                t.datepicker._hideDatepicker(), (o = !1);
                                break;
                            case 13:
                                return (
                                    (s = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", n.dpDiv))[0] && t.datepicker._selectDay(e.target, n.selectedMonth, n.selectedYear, s[0]),
                                    (i = t.datepicker._get(n, "onSelect")) ? ((a = t.datepicker._formatDate(n)), i.apply(n.input ? n.input[0] : null, [a, n])) : t.datepicker._hideDatepicker(),
                                    !1
                                );
                            case 27:
                                t.datepicker._hideDatepicker();
                                break;
                            case 33:
                                t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(n, "stepBigMonths") : -t.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 34:
                                t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(n, "stepBigMonths") : +t.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 35:
                                (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), (o = e.ctrlKey || e.metaKey);
                                break;
                            case 36:
                                (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), (o = e.ctrlKey || e.metaKey);
                                break;
                            case 37:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"),
                                    (o = e.ctrlKey || e.metaKey),
                                    e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(n, "stepBigMonths") : -t.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 38:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), (o = e.ctrlKey || e.metaKey);
                                break;
                            case 39:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"),
                                    (o = e.ctrlKey || e.metaKey),
                                    e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(n, "stepBigMonths") : +t.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 40:
                                (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), (o = e.ctrlKey || e.metaKey);
                                break;
                            default:
                                o = !1;
                        }
                    else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : (o = !1);
                    o && (e.preventDefault(), e.stopPropagation());
                },
                _doKeyPress: function (e) {
                    var i,
                        a,
                        s = t.datepicker._getInst(e.target);
                    return t.datepicker._get(s, "constrainInput")
                        ? ((i = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat"))), (a = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode)), e.ctrlKey || e.metaKey || " " > a || !i || i.indexOf(a) > -1)
                        : void 0;
                },
                _doKeyUp: function (e) {
                    var i,
                        a = t.datepicker._getInst(e.target);
                    if (a.input.val() !== a.lastVal)
                        try {
                            (i = t.datepicker.parseDate(t.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, t.datepicker._getFormatConfig(a))) &&
                                (t.datepicker._setDateFromField(a), t.datepicker._updateAlternate(a), t.datepicker._updateDatepicker(a));
                        } catch (t) {}
                    return !0;
                },
                _showDatepicker: function (e) {
                    var i, s, n, o, l, c, u;
                    ("input" !== (e = e.target || e).nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), t.datepicker._isDisabledDatepicker(e) || t.datepicker._lastInput === e) ||
                        ((i = t.datepicker._getInst(e)),
                        t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
                        !1 !== (n = (s = t.datepicker._get(i, "beforeShow")) ? s.apply(e, [e, i]) : {}) &&
                            (r(i.settings, n),
                            (i.lastVal = null),
                            (t.datepicker._lastInput = e),
                            t.datepicker._setDateFromField(i),
                            t.datepicker._inDialog && (e.value = ""),
                            t.datepicker._pos || ((t.datepicker._pos = t.datepicker._findPos(e)), (t.datepicker._pos[1] += e.offsetHeight)),
                            (o = !1),
                            t(e)
                                .parents()
                                .each(function () {
                                    return !(o |= "fixed" === t(this).css("position"));
                                }),
                            (l = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }),
                            (t.datepicker._pos = null),
                            i.dpDiv.empty(),
                            i.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }),
                            t.datepicker._updateDatepicker(i),
                            (l = t.datepicker._checkOffset(i, l, o)),
                            i.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : o ? "fixed" : "absolute", display: "none", left: l.left + "px", top: l.top + "px" }),
                            i.inline ||
                                ((c = t.datepicker._get(i, "showAnim")),
                                (u = t.datepicker._get(i, "duration")),
                                i.dpDiv.css("z-index", a(t(e)) + 1),
                                (t.datepicker._datepickerShowing = !0),
                                t.effects && t.effects.effect[c] ? i.dpDiv.show(c, t.datepicker._get(i, "showOptions"), u) : i.dpDiv[c || "show"](c ? u : null),
                                t.datepicker._shouldFocusInput(i) && i.input.focus(),
                                (t.datepicker._curInst = i))));
                },
                _updateDatepicker: function (e) {
                    (this.maxRows = 4), (v = e), e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                    var i,
                        a = this._getNumberOfMonths(e),
                        s = a[1],
                        n = 17,
                        r = e.dpDiv.find("." + this._dayOverClass + " a");
                    r.length > 0 && o.apply(r.get(0)),
                        e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                        s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", n * s + "em"),
                        e.dpDiv[(1 !== a[0] || 1 !== a[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                        e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                        e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(),
                        e.yearshtml &&
                            ((i = e.yearshtml),
                            setTimeout(function () {
                                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), (i = e.yearshtml = null);
                            }, 0));
                },
                _shouldFocusInput: function (t) {
                    return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
                },
                _checkOffset: function (e, i, a) {
                    var s = e.dpDiv.outerWidth(),
                        n = e.dpDiv.outerHeight(),
                        o = e.input ? e.input.outerWidth() : 0,
                        r = e.input ? e.input.outerHeight() : 0,
                        l = document.documentElement.clientWidth + (a ? 0 : t(document).scrollLeft()),
                        c = document.documentElement.clientHeight + (a ? 0 : t(document).scrollTop());
                    return (
                        (i.left -= this._get(e, "isRTL") ? s - o : 0),
                        (i.left -= a && i.left === e.input.offset().left ? t(document).scrollLeft() : 0),
                        (i.top -= a && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0),
                        (i.left -= Math.min(i.left, i.left + s > l && l > s ? Math.abs(i.left + s - l) : 0)),
                        (i.top -= Math.min(i.top, i.top + n > c && c > n ? Math.abs(n + r) : 0)),
                        i
                    );
                },
                _findPos: function (e) {
                    for (var i, a = this._getInst(e), s = this._get(a, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e)); ) e = e[s ? "previousSibling" : "nextSibling"];
                    return [(i = t(e).offset()).left, i.top];
                },
                _hideDatepicker: function (e) {
                    var i,
                        a,
                        s,
                        n,
                        o = this._curInst;
                    !o ||
                        (e && o !== t.data(e, "datepicker")) ||
                        (this._datepickerShowing &&
                            ((i = this._get(o, "showAnim")),
                            (a = this._get(o, "duration")),
                            (s = function () {
                                t.datepicker._tidyDialog(o);
                            }),
                            t.effects && (t.effects.effect[i] || t.effects[i]) ? o.dpDiv.hide(i, t.datepicker._get(o, "showOptions"), a, s) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? a : null, s),
                            i || s(),
                            (this._datepickerShowing = !1),
                            (n = this._get(o, "onClose")) && n.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]),
                            (this._lastInput = null),
                            this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))),
                            (this._inDialog = !1)));
                },
                _tidyDialog: function (t) {
                    t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
                },
                _checkExternalClick: function (e) {
                    if (t.datepicker._curInst) {
                        var i = t(e.target),
                            a = t.datepicker._getInst(i[0]);
                        ((i[0].id !== t.datepicker._mainDivId &&
                            0 === i.parents("#" + t.datepicker._mainDivId).length &&
                            !i.hasClass(t.datepicker.markerClassName) &&
                            !i.closest("." + t.datepicker._triggerClass).length &&
                            t.datepicker._datepickerShowing &&
                            (!t.datepicker._inDialog || !t.blockUI)) ||
                            (i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== a)) &&
                            t.datepicker._hideDatepicker();
                    }
                },
                _adjustDate: function (e, i, a) {
                    var s = t(e),
                        n = this._getInst(s[0]);
                    this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(n, i + ("M" === a ? this._get(n, "showCurrentAtPos") : 0), a), this._updateDatepicker(n));
                },
                _gotoToday: function (e) {
                    var i,
                        a = t(e),
                        s = this._getInst(a[0]);
                    this._get(s, "gotoCurrent") && s.currentDay
                        ? ((s.selectedDay = s.currentDay), (s.drawMonth = s.selectedMonth = s.currentMonth), (s.drawYear = s.selectedYear = s.currentYear))
                        : ((i = new Date()), (s.selectedDay = i.getDate()), (s.drawMonth = s.selectedMonth = i.getMonth()), (s.drawYear = s.selectedYear = i.getFullYear())),
                        this._notifyChange(s),
                        this._adjustDate(a);
                },
                _selectMonthYear: function (e, i, a) {
                    var s = t(e),
                        n = this._getInst(s[0]);
                    (n["selected" + ("M" === a ? "Month" : "Year")] = n["draw" + ("M" === a ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10)), this._notifyChange(n), this._adjustDate(s);
                },
                _selectDay: function (e, i, a, s) {
                    var n,
                        o = t(e);
                    t(s).hasClass(this._unselectableClass) ||
                        this._isDisabledDatepicker(o[0]) ||
                        (((n = this._getInst(o[0])).selectedDay = n.currentDay = t("a", s).html()),
                        (n.selectedMonth = n.currentMonth = i),
                        (n.selectedYear = n.currentYear = a),
                        this._selectDate(e, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)));
                },
                _clearDate: function (e) {
                    var i = t(e);
                    this._selectDate(i, "");
                },
                _selectDate: function (e, i) {
                    var a,
                        s = t(e),
                        n = this._getInst(s[0]);
                    (i = null != i ? i : this._formatDate(n)),
                        n.input && n.input.val(i),
                        this._updateAlternate(n),
                        (a = this._get(n, "onSelect")) ? a.apply(n.input ? n.input[0] : null, [i, n]) : n.input && n.input.trigger("change"),
                        n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(), (this._lastInput = n.input[0]), "object" != typeof n.input[0] && n.input.focus(), (this._lastInput = null));
                },
                _updateAlternate: function (e) {
                    var i,
                        a,
                        s,
                        n = this._get(e, "altField");
                    n &&
                        ((i = this._get(e, "altFormat") || this._get(e, "dateFormat")),
                        (a = this._getDate(e)),
                        (s = this.formatDate(i, a, this._getFormatConfig(e))),
                        t(n).each(function () {
                            t(this).val(s);
                        }));
                },
                noWeekends: function (t) {
                    var e = t.getDay();
                    return [e > 0 && 6 > e, ""];
                },
                iso8601Week: function (t) {
                    var e,
                        i = new Date(t.getTime());
                    return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), (e = i.getTime()), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1;
                },
                parseDate: function (e, i, a) {
                    if (null == e || null == i) throw "Invalid arguments";
                    if ("" === (i = "object" == typeof i ? "" + i : i + "")) return null;
                    var s,
                        n,
                        o,
                        r,
                        l = 0,
                        c = (a ? a.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                        u = "string" != typeof c ? c : (new Date().getFullYear() % 100) + parseInt(c, 10),
                        d = (a ? a.dayNamesShort : null) || this._defaults.dayNamesShort,
                        h = (a ? a.dayNames : null) || this._defaults.dayNames,
                        p = (a ? a.monthNamesShort : null) || this._defaults.monthNamesShort,
                        f = (a ? a.monthNames : null) || this._defaults.monthNames,
                        m = -1,
                        g = -1,
                        v = -1,
                        b = -1,
                        w = !1,
                        y = function (t) {
                            var i = e.length > s + 1 && e.charAt(s + 1) === t;
                            return i && s++, i;
                        },
                        _ = function (t) {
                            var e = y(t),
                                a = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                                s,
                                n = RegExp("^\\d{" + ("y" === t ? a : 1) + "," + a + "}"),
                                o = i.substring(l).match(n);
                            if (!o) throw "Missing number at position " + l;
                            return (l += o[0].length), parseInt(o[0], 10);
                        },
                        k = function (e, a, s) {
                            var n = -1,
                                o = t
                                    .map(y(e) ? s : a, function (t, e) {
                                        return [[e, t]];
                                    })
                                    .sort(function (t, e) {
                                        return -(t[1].length - e[1].length);
                                    });
                            if (
                                (t.each(o, function (t, e) {
                                    var a = e[1];
                                    return i.substr(l, a.length).toLowerCase() === a.toLowerCase() ? ((n = e[0]), (l += a.length), !1) : void 0;
                                }),
                                -1 !== n)
                            )
                                return n + 1;
                            throw "Unknown name at position " + l;
                        },
                        x = function () {
                            if (i.charAt(l) !== e.charAt(s)) throw "Unexpected literal at position " + l;
                            l++;
                        };
                    for (s = 0; e.length > s; s++)
                        if (w) "'" !== e.charAt(s) || y("'") ? x() : (w = !1);
                        else
                            switch (e.charAt(s)) {
                                case "d":
                                    v = _("d");
                                    break;
                                case "D":
                                    k("D", d, h);
                                    break;
                                case "o":
                                    b = _("o");
                                    break;
                                case "m":
                                    g = _("m");
                                    break;
                                case "M":
                                    g = k("M", p, f);
                                    break;
                                case "y":
                                    m = _("y");
                                    break;
                                case "@":
                                    (m = (r = new Date(_("@"))).getFullYear()), (g = r.getMonth() + 1), (v = r.getDate());
                                    break;
                                case "!":
                                    (m = (r = new Date((_("!") - this._ticksTo1970) / 1e4)).getFullYear()), (g = r.getMonth() + 1), (v = r.getDate());
                                    break;
                                case "'":
                                    y("'") ? x() : (w = !0);
                                    break;
                                default:
                                    x();
                            }
                    if (i.length > l && ((o = i.substr(l)), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
                    if ((-1 === m ? (m = new Date().getFullYear()) : 100 > m && (m += new Date().getFullYear() - (new Date().getFullYear() % 100) + (u >= m ? 0 : -100)), b > -1))
                        for (g = 1, v = b; !((n = this._getDaysInMonth(m, g - 1)) >= v); ) g++, (v -= n);
                    if ((r = this._daylightSavingAdjust(new Date(m, g - 1, v))).getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
                    return r;
                },
                ATOM: "yy-mm-dd",
                COOKIE: "D, dd M yy",
                ISO_8601: "yy-mm-dd",
                RFC_822: "D, d M y",
                RFC_850: "DD, dd-M-y",
                RFC_1036: "D, d M y",
                RFC_1123: "D, d M yy",
                RFC_2822: "D, d M yy",
                RSS: "D, d M y",
                TICKS: "!",
                TIMESTAMP: "@",
                W3C: "yy-mm-dd",
                _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
                formatDate: function (t, e, i) {
                    if (!e) return "";
                    var a,
                        s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                        n = (i ? i.dayNames : null) || this._defaults.dayNames,
                        o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                        r = (i ? i.monthNames : null) || this._defaults.monthNames,
                        l = function (e) {
                            var i = t.length > a + 1 && t.charAt(a + 1) === e;
                            return i && a++, i;
                        },
                        c = function (t, e, i) {
                            var a = "" + e;
                            if (l(t)) for (; i > a.length; ) a = "0" + a;
                            return a;
                        },
                        u = function (t, e, i, a) {
                            return l(t) ? a[e] : i[e];
                        },
                        d = "",
                        h = !1;
                    if (e)
                        for (a = 0; t.length > a; a++)
                            if (h) "'" !== t.charAt(a) || l("'") ? (d += t.charAt(a)) : (h = !1);
                            else
                                switch (t.charAt(a)) {
                                    case "d":
                                        d += c("d", e.getDate(), 2);
                                        break;
                                    case "D":
                                        d += u("D", e.getDay(), s, n);
                                        break;
                                    case "o":
                                        d += c("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                        break;
                                    case "m":
                                        d += c("m", e.getMonth() + 1, 2);
                                        break;
                                    case "M":
                                        d += u("M", e.getMonth(), o, r);
                                        break;
                                    case "y":
                                        d += l("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + (e.getYear() % 100);
                                        break;
                                    case "@":
                                        d += e.getTime();
                                        break;
                                    case "!":
                                        d += 1e4 * e.getTime() + this._ticksTo1970;
                                        break;
                                    case "'":
                                        l("'") ? (d += "'") : (h = !0);
                                        break;
                                    default:
                                        d += t.charAt(a);
                                }
                    return d;
                },
                _possibleChars: function (t) {
                    var e,
                        i = "",
                        a = !1,
                        s = function (i) {
                            var a = t.length > e + 1 && t.charAt(e + 1) === i;
                            return a && e++, a;
                        };
                    for (e = 0; t.length > e; e++)
                        if (a) "'" !== t.charAt(e) || s("'") ? (i += t.charAt(e)) : (a = !1);
                        else
                            switch (t.charAt(e)) {
                                case "d":
                                case "m":
                                case "y":
                                case "@":
                                    i += "0123456789";
                                    break;
                                case "D":
                                case "M":
                                    return null;
                                case "'":
                                    s("'") ? (i += "'") : (a = !0);
                                    break;
                                default:
                                    i += t.charAt(e);
                            }
                    return i;
                },
                _get: function (t, e) {
                    return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
                },
                _setDateFromField: function (t, e) {
                    if (t.input.val() !== t.lastVal) {
                        var i = this._get(t, "dateFormat"),
                            a = (t.lastVal = t.input ? t.input.val() : null),
                            s = this._getDefaultDate(t),
                            n = s,
                            o = this._getFormatConfig(t);
                        try {
                            n = this.parseDate(i, a, o) || s;
                        } catch (t) {
                            a = e ? "" : a;
                        }
                        (t.selectedDay = n.getDate()),
                            (t.drawMonth = t.selectedMonth = n.getMonth()),
                            (t.drawYear = t.selectedYear = n.getFullYear()),
                            (t.currentDay = a ? n.getDate() : 0),
                            (t.currentMonth = a ? n.getMonth() : 0),
                            (t.currentYear = a ? n.getFullYear() : 0),
                            this._adjustInstDate(t);
                    }
                },
                _getDefaultDate: function (t) {
                    return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
                },
                _determineDate: function (e, i, a) {
                    var s = function (t) {
                            var e = new Date();
                            return e.setDate(e.getDate() + t), e;
                        },
                        n = function (i) {
                            try {
                                return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e));
                            } catch (t) {}
                            for (
                                var a = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date(), s = a.getFullYear(), n = a.getMonth(), o = a.getDate(), r = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = r.exec(i);
                                l;

                            ) {
                                switch (l[2] || "d") {
                                    case "d":
                                    case "D":
                                        o += parseInt(l[1], 10);
                                        break;
                                    case "w":
                                    case "W":
                                        o += 7 * parseInt(l[1], 10);
                                        break;
                                    case "m":
                                    case "M":
                                        (n += parseInt(l[1], 10)), (o = Math.min(o, t.datepicker._getDaysInMonth(s, n)));
                                        break;
                                    case "y":
                                    case "Y":
                                        (s += parseInt(l[1], 10)), (o = Math.min(o, t.datepicker._getDaysInMonth(s, n)));
                                }
                                l = r.exec(i);
                            }
                            return new Date(s, n, o);
                        },
                        o = null == i || "" === i ? a : "string" == typeof i ? n(i) : "number" == typeof i ? (isNaN(i) ? a : s(i)) : new Date(i.getTime());
                    return (o = o && "Invalid Date" == "" + o ? a : o) && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o);
                },
                _daylightSavingAdjust: function (t) {
                    return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null;
                },
                _setDate: function (t, e, i) {
                    var a = !e,
                        s = t.selectedMonth,
                        n = t.selectedYear,
                        o = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
                    (t.selectedDay = t.currentDay = o.getDate()),
                        (t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth()),
                        (t.drawYear = t.selectedYear = t.currentYear = o.getFullYear()),
                        (s === t.selectedMonth && n === t.selectedYear) || i || this._notifyChange(t),
                        this._adjustInstDate(t),
                        t.input && t.input.val(a ? "" : this._formatDate(t));
                },
                _getDate: function (t) {
                    var e;
                    return !t.currentYear || (t.input && "" === t.input.val()) ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                },
                _attachHandlers: function (e) {
                    var i = this._get(e, "stepMonths"),
                        a = "#" + e.id.replace(/\\\\/g, "\\");
                    e.dpDiv.find("[data-handler]").map(function () {
                        var e = {
                            prev: function () {
                                t.datepicker._adjustDate(a, -i, "M");
                            },
                            next: function () {
                                t.datepicker._adjustDate(a, +i, "M");
                            },
                            hide: function () {
                                t.datepicker._hideDatepicker();
                            },
                            today: function () {
                                t.datepicker._gotoToday(a);
                            },
                            selectDay: function () {
                                return t.datepicker._selectDay(a, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
                            },
                            selectMonth: function () {
                                return t.datepicker._selectMonthYear(a, this, "M"), !1;
                            },
                            selectYear: function () {
                                return t.datepicker._selectMonthYear(a, this, "Y"), !1;
                            },
                        };
                        t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]);
                    });
                },
                _generateHTML: function (t) {
                    var e,
                        i,
                        a,
                        s,
                        n,
                        o,
                        r,
                        l,
                        c,
                        u,
                        d,
                        h,
                        p,
                        f,
                        m,
                        g,
                        v,
                        b,
                        w,
                        y,
                        _,
                        k,
                        x,
                        D,
                        C,
                        M,
                        S,
                        T,
                        I,
                        $,
                        L,
                        E,
                        F,
                        A,
                        O,
                        N,
                        z,
                        W,
                        j,
                        H = new Date(),
                        P = this._daylightSavingAdjust(new Date(H.getFullYear(), H.getMonth(), H.getDate())),
                        V = this._get(t, "isRTL"),
                        R = this._get(t, "showButtonPanel"),
                        Y = this._get(t, "hideIfNoPrevNext"),
                        B = this._get(t, "navigationAsDateFormat"),
                        q = this._getNumberOfMonths(t),
                        U = this._get(t, "showCurrentAtPos"),
                        K = this._get(t, "stepMonths"),
                        G = 1 !== q[0] || 1 !== q[1],
                        J = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                        Q = this._getMinMaxDate(t, "min"),
                        X = this._getMinMaxDate(t, "max"),
                        Z = t.drawMonth - U,
                        tt = t.drawYear;
                    if ((0 > Z && ((Z += 12), tt--), X))
                        for (e = this._daylightSavingAdjust(new Date(X.getFullYear(), X.getMonth() - q[0] * q[1] + 1, X.getDate())), e = Q && Q > e ? Q : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e; ) 0 > --Z && ((Z = 11), tt--);
                    for (
                        t.drawMonth = Z,
                            t.drawYear = tt,
                            i = this._get(t, "prevText"),
                            i = B ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - K, 1)), this._getFormatConfig(t)) : i,
                            a = this._canAdjustMonth(t, -1, tt, Z)
                                ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "e" : "w") + "'>" + i + "</span></a>"
                                : Y
                                ? ""
                                : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "e" : "w") + "'>" + i + "</span></a>",
                            s = this._get(t, "nextText"),
                            s = B ? this.formatDate(s, this._daylightSavingAdjust(new Date(tt, Z + K, 1)), this._getFormatConfig(t)) : s,
                            n = this._canAdjustMonth(t, 1, tt, Z)
                                ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "w" : "e") + "'>" + s + "</span></a>"
                                : Y
                                ? ""
                                : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "w" : "e") + "'>" + s + "</span></a>",
                            o = this._get(t, "currentText"),
                            r = this._get(t, "gotoCurrent") && t.currentDay ? J : P,
                            o = B ? this.formatDate(o, r, this._getFormatConfig(t)) : o,
                            l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>",
                            c = R
                                ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                                  (V ? l : "") +
                                  (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") +
                                  (V ? "" : l) +
                                  "</div>"
                                : "",
                            u = parseInt(this._get(t, "firstDay"), 10),
                            u = isNaN(u) ? 0 : u,
                            d = this._get(t, "showWeek"),
                            h = this._get(t, "dayNames"),
                            p = this._get(t, "dayNamesMin"),
                            f = this._get(t, "monthNames"),
                            m = this._get(t, "monthNamesShort"),
                            g = this._get(t, "beforeShowDay"),
                            v = this._get(t, "showOtherMonths"),
                            b = this._get(t, "selectOtherMonths"),
                            w = this._getDefaultDate(t),
                            y = "",
                            k = 0;
                        q[0] > k;
                        k++
                    ) {
                        for (x = "", this.maxRows = 4, D = 0; q[1] > D; D++) {
                            if (((C = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay))), (M = " ui-corner-all"), (S = ""), G)) {
                                if (((S += "<div class='ui-datepicker-group"), q[1] > 1))
                                    switch (D) {
                                        case 0:
                                            (S += " ui-datepicker-group-first"), (M = " ui-corner-" + (V ? "right" : "left"));
                                            break;
                                        case q[1] - 1:
                                            (S += " ui-datepicker-group-last"), (M = " ui-corner-" + (V ? "left" : "right"));
                                            break;
                                        default:
                                            (S += " ui-datepicker-group-middle"), (M = "");
                                    }
                                S += "'>";
                            }
                            for (
                                S +=
                                    "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                                    M +
                                    "'>" +
                                    (/all|left/.test(M) && 0 === k ? (V ? n : a) : "") +
                                    (/all|right/.test(M) && 0 === k ? (V ? a : n) : "") +
                                    this._generateMonthYearHeader(t, Z, tt, Q, X, k > 0 || D > 0, f, m) +
                                    "</div><table class='ui-datepicker-calendar'><thead><tr>",
                                    T = d ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "",
                                    _ = 0;
                                7 > _;
                                _++
                            )
                                T += "<th scope='col'" + ((_ + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + h[(I = (_ + u) % 7)] + "'>" + p[I] + "</span></th>";
                            for (
                                S += T + "</tr></thead><tbody>",
                                    $ = this._getDaysInMonth(tt, Z),
                                    tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, $)),
                                    L = (this._getFirstDayOfMonth(tt, Z) - u + 7) % 7,
                                    E = Math.ceil((L + $) / 7),
                                    F = G && this.maxRows > E ? this.maxRows : E,
                                    this.maxRows = F,
                                    A = this._daylightSavingAdjust(new Date(tt, Z, 1 - L)),
                                    O = 0;
                                F > O;
                                O++
                            ) {
                                for (S += "<tr>", N = d ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(A) + "</td>" : "", _ = 0; 7 > _; _++)
                                    (z = g ? g.apply(t.input ? t.input[0] : null, [A]) : [!0, ""]),
                                        (j = ((W = A.getMonth() !== Z) && !b) || !z[0] || (Q && Q > A) || (X && A > X)),
                                        (N +=
                                            "<td class='" +
                                            ((_ + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                                            (W ? " ui-datepicker-other-month" : "") +
                                            ((A.getTime() === C.getTime() && Z === t.selectedMonth && t._keyEvent) || (w.getTime() === A.getTime() && w.getTime() === C.getTime()) ? " " + this._dayOverClass : "") +
                                            (j ? " " + this._unselectableClass + " ui-state-disabled" : "") +
                                            (W && !v ? "" : " " + z[1] + (A.getTime() === J.getTime() ? " " + this._currentClass : "") + (A.getTime() === P.getTime() ? " ui-datepicker-today" : "")) +
                                            "'" +
                                            ((W && !v) || !z[2] ? "" : " title='" + z[2].replace(/'/g, "&#39;") + "'") +
                                            (j ? "" : " data-handler='selectDay' data-event='click' data-month='" + A.getMonth() + "' data-year='" + A.getFullYear() + "'") +
                                            ">" +
                                            (W && !v
                                                ? "&#xa0;"
                                                : j
                                                ? "<span class='ui-state-default'>" + A.getDate() + "</span>"
                                                : "<a class='ui-state-default" +
                                                  (A.getTime() === P.getTime() ? " ui-state-highlight" : "") +
                                                  (A.getTime() === J.getTime() ? " ui-state-active" : "") +
                                                  (W ? " ui-priority-secondary" : "") +
                                                  "' href='#'>" +
                                                  A.getDate() +
                                                  "</a>") +
                                            "</td>"),
                                        A.setDate(A.getDate() + 1),
                                        (A = this._daylightSavingAdjust(A));
                                S += N + "</tr>";
                            }
                            ++Z > 11 && ((Z = 0), tt++), (x += S += "</tbody></table>" + (G ? "</div>" + (q[0] > 0 && D === q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""));
                        }
                        y += x;
                    }
                    return (y += c), (t._keyEvent = !1), y;
                },
                _generateMonthYearHeader: function (t, e, i, a, s, n, o, r) {
                    var l,
                        c,
                        u,
                        d,
                        h,
                        p,
                        f,
                        m,
                        g = this._get(t, "changeMonth"),
                        v = this._get(t, "changeYear"),
                        b = this._get(t, "showMonthAfterYear"),
                        w = "<div class='ui-datepicker-title'>",
                        y = "";
                    if (n || !g) y += "<span class='ui-datepicker-month'>" + o[e] + "</span>";
                    else {
                        for (l = a && a.getFullYear() === i, c = s && s.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)
                            (!l || u >= a.getMonth()) && (!c || s.getMonth() >= u) && (y += "<option value='" + u + "'" + (u === e ? " selected='selected'" : "") + ">" + r[u] + "</option>");
                        y += "</select>";
                    }
                    if ((b || (w += y + (!n && g && v ? "" : "&#xa0;")), !t.yearshtml))
                        if (((t.yearshtml = ""), n || !v)) w += "<span class='ui-datepicker-year'>" + i + "</span>";
                        else {
                            for (
                                d = this._get(t, "yearRange").split(":"),
                                    h = new Date().getFullYear(),
                                    f = (p = function (t) {
                                        var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? h + parseInt(t, 10) : parseInt(t, 10);
                                        return isNaN(e) ? h : e;
                                    })(d[0]),
                                    m = Math.max(f, p(d[1] || "")),
                                    f = a ? Math.max(f, a.getFullYear()) : f,
                                    m = s ? Math.min(m, s.getFullYear()) : m,
                                    t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                                m >= f;
                                f++
                            )
                                t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                            (t.yearshtml += "</select>"), (w += t.yearshtml), (t.yearshtml = null);
                        }
                    return (w += this._get(t, "yearSuffix")), b && (w += (!n && g && v ? "" : "&#xa0;") + y), (w += "</div>");
                },
                _adjustInstDate: function (t, e, i) {
                    var a = t.drawYear + ("Y" === i ? e : 0),
                        s = t.drawMonth + ("M" === i ? e : 0),
                        n = Math.min(t.selectedDay, this._getDaysInMonth(a, s)) + ("D" === i ? e : 0),
                        o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(a, s, n)));
                    (t.selectedDay = o.getDate()), (t.drawMonth = t.selectedMonth = o.getMonth()), (t.drawYear = t.selectedYear = o.getFullYear()), ("M" === i || "Y" === i) && this._notifyChange(t);
                },
                _restrictMinMax: function (t, e) {
                    var i = this._getMinMaxDate(t, "min"),
                        a = this._getMinMaxDate(t, "max"),
                        s = i && i > e ? i : e;
                    return a && s > a ? a : s;
                },
                _notifyChange: function (t) {
                    var e = this._get(t, "onChangeMonthYear");
                    e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
                },
                _getNumberOfMonths: function (t) {
                    var e = this._get(t, "numberOfMonths");
                    return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
                },
                _getMinMaxDate: function (t, e) {
                    return this._determineDate(t, this._get(t, e + "Date"), null);
                },
                _getDaysInMonth: function (t, e) {
                    return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
                },
                _getFirstDayOfMonth: function (t, e) {
                    return new Date(t, e, 1).getDay();
                },
                _canAdjustMonth: function (t, e, i, a) {
                    var s = this._getNumberOfMonths(t),
                        n = this._daylightSavingAdjust(new Date(i, a + (0 > e ? e : s[0] * s[1]), 1));
                    return 0 > e && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())), this._isInRange(t, n);
                },
                _isInRange: function (t, e) {
                    var i,
                        a,
                        s = this._getMinMaxDate(t, "min"),
                        n = this._getMinMaxDate(t, "max"),
                        o = null,
                        r = null,
                        l = this._get(t, "yearRange");
                    return (
                        l && ((i = l.split(":")), (a = new Date().getFullYear()), (o = parseInt(i[0], 10)), (r = parseInt(i[1], 10)), i[0].match(/[+\-].*/) && (o += a), i[1].match(/[+\-].*/) && (r += a)),
                        (!s || e.getTime() >= s.getTime()) && (!n || e.getTime() <= n.getTime()) && (!o || e.getFullYear() >= o) && (!r || r >= e.getFullYear())
                    );
                },
                _getFormatConfig: function (t) {
                    var e = this._get(t, "shortYearCutoff");
                    return {
                        shortYearCutoff: (e = "string" != typeof e ? e : (new Date().getFullYear() % 100) + parseInt(e, 10)),
                        dayNamesShort: this._get(t, "dayNamesShort"),
                        dayNames: this._get(t, "dayNames"),
                        monthNamesShort: this._get(t, "monthNamesShort"),
                        monthNames: this._get(t, "monthNames"),
                    };
                },
                _formatDate: function (t, e, i, a) {
                    e || ((t.currentDay = t.selectedDay), (t.currentMonth = t.selectedMonth), (t.currentYear = t.selectedYear));
                    var s = e ? ("object" == typeof e ? e : this._daylightSavingAdjust(new Date(a, i, e))) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                    return this.formatDate(this._get(t, "dateFormat"), s, this._getFormatConfig(t));
                },
            }),
            (t.fn.datepicker = function (e, i) {
                if (!this.length) return this;
                t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), (t.datepicker.initialized = !0)), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
                var a = Array.prototype.slice.call(arguments, 1);
                return "string" != typeof e || ("isDisabled" !== e && "getDate" !== e && "widget" !== e)
                    ? "option" === e && 2 === arguments.length && "string" == typeof i
                        ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(a))
                        : this.each(function () {
                              "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(a)) : t.datepicker._attachDatepicker(this, e);
                          })
                    : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(a));
            }),
            (t.datepicker = new s()),
            (t.datepicker.initialized = !1),
            (t.datepicker.uuid = new Date().getTime()),
            (t.datepicker.version = "1.11.4"),
            t.datepicker,
            t.widget("ui.slider", t.ui.mouse, {
                version: "1.11.4",
                widgetEventPrefix: "slide",
                options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null },
                numPages: 5,
                _create: function () {
                    (this._keySliding = !1),
                        (this._mouseSliding = !1),
                        (this._animateOff = !0),
                        (this._handleIndex = null),
                        this._detectOrientation(),
                        this._mouseInit(),
                        this._calculateNewMax(),
                        this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"),
                        this._refresh(),
                        this._setOption("disabled", this.options.disabled),
                        (this._animateOff = !1);
                },
                _refresh: function () {
                    this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
                },
                _createHandles: function () {
                    var e,
                        i,
                        a = this.options,
                        s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                        n = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                        o = [];
                    for (i = (a.values && a.values.length) || 1, s.length > i && (s.slice(i).remove(), (s = s.slice(0, i))), e = s.length; i > e; e++) o.push(n);
                    (this.handles = s.add(t(o.join("")).appendTo(this.element))),
                        (this.handle = this.handles.eq(0)),
                        this.handles.each(function (e) {
                            t(this).data("ui-slider-handle-index", e);
                        });
                },
                _createRange: function () {
                    var e = this.options,
                        i = "";
                    e.range
                        ? (!0 === e.range &&
                              (e.values ? (e.values.length && 2 !== e.values.length ? (e.values = [e.values[0], e.values[0]]) : t.isArray(e.values) && (e.values = e.values.slice(0))) : (e.values = [this._valueMin(), this._valueMin()])),
                          this.range && this.range.length
                              ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" })
                              : ((this.range = t("<div></div>").appendTo(this.element)), (i = "ui-slider-range ui-widget-header ui-corner-all")),
                          this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : "")))
                        : (this.range && this.range.remove(), (this.range = null));
                },
                _setupEvents: function () {
                    this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
                },
                _destroy: function () {
                    this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy();
                },
                _mouseCapture: function (e) {
                    var i,
                        a,
                        s,
                        n,
                        o,
                        r,
                        l,
                        c,
                        u = this,
                        d = this.options;
                    return (
                        !d.disabled &&
                        ((this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }),
                        (this.elementOffset = this.element.offset()),
                        (i = { x: e.pageX, y: e.pageY }),
                        (a = this._normValueFromMouse(i)),
                        (s = this._valueMax() - this._valueMin() + 1),
                        this.handles.each(function (e) {
                            var i = Math.abs(a - u.values(e));
                            (s > i || (s === i && (e === u._lastChangedValue || u.values(e) === d.min))) && ((s = i), (n = t(this)), (o = e));
                        }),
                        !1 !== (r = this._start(e, o)) &&
                            ((this._mouseSliding = !0),
                            (this._handleIndex = o),
                            n.addClass("ui-state-active").focus(),
                            (l = n.offset()),
                            (c = !t(e.target).parents().addBack().is(".ui-slider-handle")),
                            (this._clickOffset = c
                                ? { left: 0, top: 0 }
                                : {
                                      left: e.pageX - l.left - n.width() / 2,
                                      top: e.pageY - l.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0),
                                  }),
                            this.handles.hasClass("ui-state-hover") || this._slide(e, o, a),
                            (this._animateOff = !0),
                            !0))
                    );
                },
                _mouseStart: function () {
                    return !0;
                },
                _mouseDrag: function (t) {
                    var e = { x: t.pageX, y: t.pageY },
                        i = this._normValueFromMouse(e);
                    return this._slide(t, this._handleIndex, i), !1;
                },
                _mouseStop: function (t) {
                    return (
                        this.handles.removeClass("ui-state-active"),
                        (this._mouseSliding = !1),
                        this._stop(t, this._handleIndex),
                        this._change(t, this._handleIndex),
                        (this._handleIndex = null),
                        (this._clickOffset = null),
                        (this._animateOff = !1),
                        !1
                    );
                },
                _detectOrientation: function () {
                    this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
                },
                _normValueFromMouse: function (t) {
                    var e, i, a, s, n;
                    return (
                        "horizontal" === this.orientation
                            ? ((e = this.elementSize.width), (i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)))
                            : ((e = this.elementSize.height), (i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))),
                        (a = i / e) > 1 && (a = 1),
                        0 > a && (a = 0),
                        "vertical" === this.orientation && (a = 1 - a),
                        (s = this._valueMax() - this._valueMin()),
                        (n = this._valueMin() + a * s),
                        this._trimAlignValue(n)
                    );
                },
                _start: function (t, e) {
                    var i = { handle: this.handles[e], value: this.value() };
                    return this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), this._trigger("start", t, i);
                },
                _slide: function (t, e, i) {
                    var a, s, n;
                    this.options.values && this.options.values.length
                        ? ((a = this.values(e ? 0 : 1)),
                          2 === this.options.values.length && !0 === this.options.range && ((0 === e && i > a) || (1 === e && a > i)) && (i = a),
                          i !== this.values(e) && (((s = this.values())[e] = i), (n = this._trigger("slide", t, { handle: this.handles[e], value: i, values: s })), (a = this.values(e ? 0 : 1)), !1 !== n && this.values(e, i)))
                        : i !== this.value() && !1 !== (n = this._trigger("slide", t, { handle: this.handles[e], value: i })) && this.value(i);
                },
                _stop: function (t, e) {
                    var i = { handle: this.handles[e], value: this.value() };
                    this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), this._trigger("stop", t, i);
                },
                _change: function (t, e) {
                    if (!this._keySliding && !this._mouseSliding) {
                        var i = { handle: this.handles[e], value: this.value() };
                        this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), (this._lastChangedValue = e), this._trigger("change", t, i);
                    }
                },
                value: function (t) {
                    return arguments.length ? ((this.options.value = this._trimAlignValue(t)), this._refreshValue(), void this._change(null, 0)) : this._value();
                },
                values: function (e, i) {
                    var a, s, n;
                    if (arguments.length > 1) return (this.options.values[e] = this._trimAlignValue(i)), this._refreshValue(), void this._change(null, e);
                    if (!arguments.length) return this._values();
                    if (!t.isArray(e)) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                    for (a = this.options.values, s = e, n = 0; a.length > n; n += 1) (a[n] = this._trimAlignValue(s[n])), this._change(null, n);
                    this._refreshValue();
                },
                _setOption: function (e, i) {
                    var a,
                        s = 0;
                    switch (
                        ("range" === e &&
                            !0 === this.options.range &&
                            ("min" === i ? ((this.options.value = this._values(0)), (this.options.values = null)) : "max" === i && ((this.options.value = this._values(this.options.values.length - 1)), (this.options.values = null))),
                        t.isArray(this.options.values) && (s = this.options.values.length),
                        "disabled" === e && this.element.toggleClass("ui-state-disabled", !!i),
                        this._super(e, i),
                        e)
                    ) {
                        case "orientation":
                            this._detectOrientation(),
                                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                                this._refreshValue(),
                                this.handles.css("horizontal" === i ? "bottom" : "left", "");
                            break;
                        case "value":
                            (this._animateOff = !0), this._refreshValue(), this._change(null, 0), (this._animateOff = !1);
                            break;
                        case "values":
                            for (this._animateOff = !0, this._refreshValue(), a = 0; s > a; a += 1) this._change(null, a);
                            this._animateOff = !1;
                            break;
                        case "step":
                        case "min":
                        case "max":
                            (this._animateOff = !0), this._calculateNewMax(), this._refreshValue(), (this._animateOff = !1);
                            break;
                        case "range":
                            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
                    }
                },
                _value: function () {
                    var t = this.options.value;
                    return (t = this._trimAlignValue(t));
                },
                _values: function (t) {
                    var e, i, a;
                    if (arguments.length) return (e = this.options.values[t]), (e = this._trimAlignValue(e));
                    if (this.options.values && this.options.values.length) {
                        for (i = this.options.values.slice(), a = 0; i.length > a; a += 1) i[a] = this._trimAlignValue(i[a]);
                        return i;
                    }
                    return [];
                },
                _trimAlignValue: function (t) {
                    if (this._valueMin() >= t) return this._valueMin();
                    if (t >= this._valueMax()) return this._valueMax();
                    var e = this.options.step > 0 ? this.options.step : 1,
                        i = (t - this._valueMin()) % e,
                        a = t - i;
                    return 2 * Math.abs(i) >= e && (a += i > 0 ? e : -e), parseFloat(a.toFixed(5));
                },
                _calculateNewMax: function () {
                    var t = this.options.max,
                        e = this._valueMin(),
                        i = this.options.step,
                        a;
                    (t = Math.floor(+(t - e).toFixed(this._precision()) / i) * i + e), (this.max = parseFloat(t.toFixed(this._precision())));
                },
                _precision: function () {
                    var t = this._precisionOf(this.options.step);
                    return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
                },
                _precisionOf: function (t) {
                    var e = "" + t,
                        i = e.indexOf(".");
                    return -1 === i ? 0 : e.length - i - 1;
                },
                _valueMin: function () {
                    return this.options.min;
                },
                _valueMax: function () {
                    return this.max;
                },
                _refreshValue: function () {
                    var e,
                        i,
                        a,
                        s,
                        n,
                        o = this.options.range,
                        r = this.options,
                        l = this,
                        c = !this._animateOff && r.animate,
                        u = {};
                    this.options.values && this.options.values.length
                        ? this.handles.each(function (a) {
                              (i = ((l.values(a) - l._valueMin()) / (l._valueMax() - l._valueMin())) * 100),
                                  (u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%"),
                                  t(this).stop(1, 1)[c ? "animate" : "css"](u, r.animate),
                                  !0 === l.options.range &&
                                      ("horizontal" === l.orientation
                                          ? (0 === a && l.range.stop(1, 1)[c ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === a && l.range[c ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: r.animate }))
                                          : (0 === a && l.range.stop(1, 1)[c ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === a && l.range[c ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: r.animate }))),
                                  (e = i);
                          })
                        : ((a = this.value()),
                          (s = this._valueMin()),
                          (n = this._valueMax()),
                          (i = n !== s ? ((a - s) / (n - s)) * 100 : 0),
                          (u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%"),
                          this.handle.stop(1, 1)[c ? "animate" : "css"](u, r.animate),
                          "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({ width: i + "%" }, r.animate),
                          "max" === o && "horizontal" === this.orientation && this.range[c ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: !1, duration: r.animate }),
                          "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[c ? "animate" : "css"]({ height: i + "%" }, r.animate),
                          "max" === o && "vertical" === this.orientation && this.range[c ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: !1, duration: r.animate }));
                },
                _handleEvents: {
                    keydown: function (e) {
                        var i,
                            a,
                            s,
                            n,
                            o = t(e.target).data("ui-slider-handle-index");
                        switch (e.keyCode) {
                            case t.ui.keyCode.HOME:
                            case t.ui.keyCode.END:
                            case t.ui.keyCode.PAGE_UP:
                            case t.ui.keyCode.PAGE_DOWN:
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if ((e.preventDefault(), !this._keySliding && ((this._keySliding = !0), t(e.target).addClass("ui-state-active"), !1 === (i = this._start(e, o))))) return;
                        }
                        switch (((n = this.options.step), (a = s = this.options.values && this.options.values.length ? this.values(o) : this.value()), e.keyCode)) {
                            case t.ui.keyCode.HOME:
                                s = this._valueMin();
                                break;
                            case t.ui.keyCode.END:
                                s = this._valueMax();
                                break;
                            case t.ui.keyCode.PAGE_UP:
                                s = this._trimAlignValue(a + (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.PAGE_DOWN:
                                s = this._trimAlignValue(a - (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case t.ui.keyCode.UP:
                            case t.ui.keyCode.RIGHT:
                                if (a === this._valueMax()) return;
                                s = this._trimAlignValue(a + n);
                                break;
                            case t.ui.keyCode.DOWN:
                            case t.ui.keyCode.LEFT:
                                if (a === this._valueMin()) return;
                                s = this._trimAlignValue(a - n);
                        }
                        this._slide(e, o, s);
                    },
                    keyup: function (e) {
                        var i = t(e.target).data("ui-slider-handle-index");
                        this._keySliding && ((this._keySliding = !1), this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"));
                    },
                },
            }),
            t.widget("ui.spinner", {
                version: "1.11.4",
                defaultElement: "<input>",
                widgetEventPrefix: "spin",
                options: {
                    culture: null,
                    icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
                    incremental: !0,
                    max: null,
                    min: null,
                    numberFormat: null,
                    page: 10,
                    step: 1,
                    change: null,
                    spin: null,
                    start: null,
                    stop: null,
                },
                _create: function () {
                    this._setOption("max", this.options.max),
                        this._setOption("min", this.options.min),
                        this._setOption("step", this.options.step),
                        "" !== this.value() && this._value(this.element.val(), !0),
                        this._draw(),
                        this._on(this._events),
                        this._refresh(),
                        this._on(this.window, {
                            beforeunload: function () {
                                this.element.removeAttr("autocomplete");
                            },
                        });
                },
                _getCreateOptions: function () {
                    var e = {},
                        i = this.element;
                    return (
                        t.each(["min", "max", "step"], function (t, a) {
                            var s = i.attr(a);
                            void 0 !== s && s.length && (e[a] = s);
                        }),
                        e
                    );
                },
                _events: {
                    keydown: function (t) {
                        this._start(t) && this._keydown(t) && t.preventDefault();
                    },
                    keyup: "_stop",
                    focus: function () {
                        this.previous = this.element.val();
                    },
                    blur: function (t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void (this.previous !== this.element.val() && this._trigger("change", t)));
                    },
                    mousewheel: function (t, e) {
                        if (e) {
                            if (!this.spinning && !this._start(t)) return !1;
                            this._spin((e > 0 ? 1 : -1) * this.options.step, t),
                                clearTimeout(this.mousewheelTimer),
                                (this.mousewheelTimer = this._delay(function () {
                                    this.spinning && this._stop(t);
                                }, 100)),
                                t.preventDefault();
                        }
                    },
                    "mousedown .ui-spinner-button": function (e) {
                        function i() {
                            var t;
                            this.element[0] === this.document[0].activeElement ||
                                (this.element.focus(),
                                (this.previous = a),
                                this._delay(function () {
                                    this.previous = a;
                                }));
                        }
                        var a;
                        (a = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val()),
                            e.preventDefault(),
                            i.call(this),
                            (this.cancelBlur = !0),
                            this._delay(function () {
                                delete this.cancelBlur, i.call(this);
                            }),
                            !1 !== this._start(e) && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e);
                    },
                    "mouseup .ui-spinner-button": "_stop",
                    "mouseenter .ui-spinner-button": function (e) {
                        return t(e.currentTarget).hasClass("ui-state-active") ? !1 !== this._start(e) && void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e) : void 0;
                    },
                    "mouseleave .ui-spinner-button": "_stop",
                },
                _draw: function () {
                    var t = (this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml()));
                    this.element.attr("role", "spinbutton"),
                        (this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all")),
                        this.buttons.height() > Math.ceil(0.5 * t.height()) && t.height() > 0 && t.height(t.height()),
                        this.options.disabled && this.disable();
                },
                _keydown: function (e) {
                    var i = this.options,
                        a = t.ui.keyCode;
                    switch (e.keyCode) {
                        case a.UP:
                            return this._repeat(null, 1, e), !0;
                        case a.DOWN:
                            return this._repeat(null, -1, e), !0;
                        case a.PAGE_UP:
                            return this._repeat(null, i.page, e), !0;
                        case a.PAGE_DOWN:
                            return this._repeat(null, -i.page, e), !0;
                    }
                    return !1;
                },
                _uiSpinnerHtml: function () {
                    return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
                },
                _buttonHtml: function () {
                    return (
                        "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " +
                        this.options.icons.up +
                        "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " +
                        this.options.icons.down +
                        "'>&#9660;</span></a>"
                    );
                },
                _start: function (t) {
                    return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1), (this.spinning = !0), !0);
                },
                _repeat: function (t, e, i) {
                    (t = t || 500),
                        clearTimeout(this.timer),
                        (this.timer = this._delay(function () {
                            this._repeat(40, e, i);
                        }, t)),
                        this._spin(e * this.options.step, i);
                },
                _spin: function (t, e) {
                    var i = this.value() || 0;
                    this.counter || (this.counter = 1), (i = this._adjustValue(i + t * this._increment(this.counter))), (this.spinning && !1 === this._trigger("spin", e, { value: i })) || (this._value(i), this.counter++);
                },
                _increment: function (e) {
                    var i = this.options.incremental;
                    return i ? (t.isFunction(i) ? i(e) : Math.floor((e * e * e) / 5e4 - (e * e) / 500 + (17 * e) / 200 + 1)) : 1;
                },
                _precision: function () {
                    var t = this._precisionOf(this.options.step);
                    return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t;
                },
                _precisionOf: function (t) {
                    var e = "" + t,
                        i = e.indexOf(".");
                    return -1 === i ? 0 : e.length - i - 1;
                },
                _adjustValue: function (t) {
                    var e,
                        i,
                        a = this.options;
                    return (
                        (i = t - (e = null !== a.min ? a.min : 0)),
                        (t = e + (i = Math.round(i / a.step) * a.step)),
                        (t = parseFloat(t.toFixed(this._precision()))),
                        null !== a.max && t > a.max ? a.max : null !== a.min && a.min > t ? a.min : t
                    );
                },
                _stop: function (t) {
                    this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), (this.counter = 0), (this.spinning = !1), this._trigger("stop", t));
                },
                _setOption: function (t, e) {
                    if ("culture" === t || "numberFormat" === t) {
                        var i = this._parse(this.element.val());
                        return (this.options[t] = e), void this.element.val(this._format(i));
                    }
                    ("max" === t || "min" === t || "step" === t) && "string" == typeof e && (e = this._parse(e)),
                        "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)),
                        this._super(t, e),
                        "disabled" === t && (this.widget().toggleClass("ui-state-disabled", !!e), this.element.prop("disabled", !!e), this.buttons.button(e ? "disable" : "enable"));
                },
                _setOptions: l(function (t) {
                    this._super(t);
                }),
                _parse: function (t) {
                    return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t;
                },
                _format: function (t) {
                    return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t;
                },
                _refresh: function () {
                    this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) });
                },
                isValid: function () {
                    var t = this.value();
                    return null !== t && t === this._adjustValue(t);
                },
                _value: function (t, e) {
                    var i;
                    "" !== t && null !== (i = this._parse(t)) && (e || (i = this._adjustValue(i)), (t = this._format(i))), this.element.val(t), this._refresh();
                },
                _destroy: function () {
                    this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
                        this.uiSpinner.replaceWith(this.element);
                },
                stepUp: l(function (t) {
                    this._stepUp(t);
                }),
                _stepUp: function (t) {
                    this._start() && (this._spin((t || 1) * this.options.step), this._stop());
                },
                stepDown: l(function (t) {
                    this._stepDown(t);
                }),
                _stepDown: function (t) {
                    this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
                },
                pageUp: l(function (t) {
                    this._stepUp((t || 1) * this.options.page);
                }),
                pageDown: l(function (t) {
                    this._stepDown((t || 1) * this.options.page);
                }),
                value: function (t) {
                    return arguments.length ? void l(this._value).call(this, t) : this._parse(this.element.val());
                },
                widget: function () {
                    return this.uiSpinner;
                },
            });
        var b = "ui-effects-",
            w = t;
        (t.effects = { effect: {} }),
            (function (t, e) {
                function i(t, e, i) {
                    var a = d[e.type] || {};
                    return null == t ? (i || !e.def ? null : e.def) : ((t = a.floor ? ~~t : parseFloat(t)), isNaN(t) ? e.def : a.mod ? (t + a.mod) % a.mod : 0 > t ? 0 : t > a.max ? a.max : t);
                }
                function a(i) {
                    var a = c(),
                        s = (a._rgba = []);
                    return (
                        (i = i.toLowerCase()),
                        f(l, function (t, n) {
                            var o,
                                r = n.re.exec(i),
                                l = r && n.parse(r),
                                c = n.space || "rgba";
                            return l ? ((o = a[c](l)), (a[u[c].cache] = o[u[c].cache]), (s = a._rgba = o._rgba), !1) : e;
                        }),
                        s.length ? ("0,0,0,0" === s.join() && t.extend(s, n.transparent), a) : n[i]
                    );
                }
                function s(t, e, i) {
                    return 1 > 6 * (i = (i + 1) % 1) ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t;
                }
                var n,
                    o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    r = /^([\-+])=\s*(\d+\.?\d*)/,
                    l = [
                        {
                            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                            parse: function (t) {
                                return [t[1], t[2], t[3], t[4]];
                            },
                        },
                        {
                            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                            parse: function (t) {
                                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
                            },
                        },
                        {
                            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                            parse: function (t) {
                                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
                            },
                        },
                        {
                            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                            parse: function (t) {
                                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
                            },
                        },
                        {
                            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                            space: "hsla",
                            parse: function (t) {
                                return [t[1], t[2] / 100, t[3] / 100, t[4]];
                            },
                        },
                    ],
                    c = (t.Color = function (e, i, a, s) {
                        return new t.Color.fn.parse(e, i, a, s);
                    }),
                    u = {
                        rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } },
                        hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } },
                    },
                    d = { byte: { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
                    h = (c.support = {}),
                    p = t("<p>")[0],
                    f = t.each;
                (p.style.cssText = "background-color:rgba(1,1,1,.5)"),
                    (h.rgba = p.style.backgroundColor.indexOf("rgba") > -1),
                    f(u, function (t, e) {
                        (e.cache = "_" + t), (e.props.alpha = { idx: 3, type: "percent", def: 1 });
                    }),
                    (c.fn = t.extend(c.prototype, {
                        parse: function (s, o, r, l) {
                            if (s === e) return (this._rgba = [null, null, null, null]), this;
                            (s.jquery || s.nodeType) && ((s = t(s).css(o)), (o = e));
                            var d = this,
                                h = t.type(s),
                                p = (this._rgba = []);
                            return (
                                o !== e && ((s = [s, o, r, l]), (h = "array")),
                                "string" === h
                                    ? this.parse(a(s) || n._default)
                                    : "array" === h
                                    ? (f(u.rgba.props, function (t, e) {
                                          p[e.idx] = i(s[e.idx], e);
                                      }),
                                      this)
                                    : "object" === h
                                    ? (f(
                                          u,
                                          s instanceof c
                                              ? function (t, e) {
                                                    s[e.cache] && (d[e.cache] = s[e.cache].slice());
                                                }
                                              : function (e, a) {
                                                    var n = a.cache;
                                                    f(a.props, function (t, e) {
                                                        if (!d[n] && a.to) {
                                                            if ("alpha" === t || null == s[t]) return;
                                                            d[n] = a.to(d._rgba);
                                                        }
                                                        d[n][e.idx] = i(s[t], e, !0);
                                                    }),
                                                        d[n] && 0 > t.inArray(null, d[n].slice(0, 3)) && ((d[n][3] = 1), a.from && (d._rgba = a.from(d[n])));
                                                }
                                      ),
                                      this)
                                    : e
                            );
                        },
                        is: function (t) {
                            var i = c(t),
                                a = !0,
                                s = this;
                            return (
                                f(u, function (t, n) {
                                    var o,
                                        r = i[n.cache];
                                    return (
                                        r &&
                                            ((o = s[n.cache] || (n.to && n.to(s._rgba)) || []),
                                            f(n.props, function (t, i) {
                                                return null != r[i.idx] ? (a = r[i.idx] === o[i.idx]) : e;
                                            })),
                                        a
                                    );
                                }),
                                a
                            );
                        },
                        _space: function () {
                            var t = [],
                                e = this;
                            return (
                                f(u, function (i, a) {
                                    e[a.cache] && t.push(i);
                                }),
                                t.pop()
                            );
                        },
                        transition: function (t, e) {
                            var a = c(t),
                                s = a._space(),
                                n = u[s],
                                o = 0 === this.alpha() ? c("transparent") : this,
                                r = o[n.cache] || n.to(o._rgba),
                                l = r.slice();
                            return (
                                (a = a[n.cache]),
                                f(n.props, function (t, s) {
                                    var n = s.idx,
                                        o = r[n],
                                        c = a[n],
                                        u = d[s.type] || {};
                                    null !== c && (null === o ? (l[n] = c) : (u.mod && (c - o > u.mod / 2 ? (o += u.mod) : o - c > u.mod / 2 && (o -= u.mod)), (l[n] = i((c - o) * e + o, s))));
                                }),
                                this[s](l)
                            );
                        },
                        blend: function (e) {
                            if (1 === this._rgba[3]) return this;
                            var i = this._rgba.slice(),
                                a = i.pop(),
                                s = c(e)._rgba;
                            return c(
                                t.map(i, function (t, e) {
                                    return (1 - a) * s[e] + a * t;
                                })
                            );
                        },
                        toRgbaString: function () {
                            var e = "rgba(",
                                i = t.map(this._rgba, function (t, e) {
                                    return null == t ? (e > 2 ? 1 : 0) : t;
                                });
                            return 1 === i[3] && (i.pop(), (e = "rgb(")), e + i.join() + ")";
                        },
                        toHslaString: function () {
                            var e = "hsla(",
                                i = t.map(this.hsla(), function (t, e) {
                                    return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t;
                                });
                            return 1 === i[3] && (i.pop(), (e = "hsl(")), e + i.join() + ")";
                        },
                        toHexString: function (e) {
                            var i = this._rgba.slice(),
                                a = i.pop();
                            return (
                                e && i.push(~~(255 * a)),
                                "#" +
                                    t
                                        .map(i, function (t) {
                                            return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
                                        })
                                        .join("")
                            );
                        },
                        toString: function () {
                            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
                        },
                    })),
                    (c.fn.parse.prototype = c.fn),
                    (u.hsla.to = function (t) {
                        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                        var e,
                            i,
                            a = t[0] / 255,
                            s = t[1] / 255,
                            n = t[2] / 255,
                            o = t[3],
                            r = Math.max(a, s, n),
                            l = Math.min(a, s, n),
                            c = r - l,
                            u = r + l,
                            d = 0.5 * u;
                        return (
                            (e = l === r ? 0 : a === r ? (60 * (s - n)) / c + 360 : s === r ? (60 * (n - a)) / c + 120 : (60 * (a - s)) / c + 240),
                            (i = 0 === c ? 0 : 0.5 >= d ? c / u : c / (2 - u)),
                            [Math.round(e) % 360, i, d, null == o ? 1 : o]
                        );
                    }),
                    (u.hsla.from = function (t) {
                        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                        var e = t[0] / 360,
                            i = t[1],
                            a = t[2],
                            n = t[3],
                            o = 0.5 >= a ? a * (1 + i) : a + i - a * i,
                            r = 2 * a - o;
                        return [Math.round(255 * s(r, o, e + 1 / 3)), Math.round(255 * s(r, o, e)), Math.round(255 * s(r, o, e - 1 / 3)), n];
                    }),
                    f(u, function (a, s) {
                        var n = s.props,
                            o = s.cache,
                            l = s.to,
                            u = s.from;
                        (c.fn[a] = function (a) {
                            if ((l && !this[o] && (this[o] = l(this._rgba)), a === e)) return this[o].slice();
                            var s,
                                r = t.type(a),
                                d = "array" === r || "object" === r ? a : arguments,
                                h = this[o].slice();
                            return (
                                f(n, function (t, e) {
                                    var a = d["object" === r ? t : e.idx];
                                    null == a && (a = h[e.idx]), (h[e.idx] = i(a, e));
                                }),
                                u ? (((s = c(u(h)))[o] = h), s) : c(h)
                            );
                        }),
                            f(n, function (e, i) {
                                c.fn[e] ||
                                    (c.fn[e] = function (s) {
                                        var n,
                                            o = t.type(s),
                                            l = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : a,
                                            c = this[l](),
                                            u = c[i.idx];
                                        return "undefined" === o
                                            ? u
                                            : ("function" === o && ((s = s.call(this, u)), (o = t.type(s))),
                                              null == s && i.empty ? this : ("string" === o && (n = r.exec(s)) && (s = u + parseFloat(n[2]) * ("+" === n[1] ? 1 : -1)), (c[i.idx] = s), this[l](c)));
                                    });
                            });
                    }),
                    (c.hook = function (e) {
                        var i = e.split(" ");
                        f(i, function (e, i) {
                            (t.cssHooks[i] = {
                                set: function (e, s) {
                                    var n,
                                        o,
                                        r = "";
                                    if ("transparent" !== s && ("string" !== t.type(s) || (n = a(s)))) {
                                        if (((s = c(n || s)), !h.rgba && 1 !== s._rgba[3])) {
                                            for (o = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && o && o.style; )
                                                try {
                                                    (r = t.css(o, "backgroundColor")), (o = o.parentNode);
                                                } catch (t) {}
                                            s = s.blend(r && "transparent" !== r ? r : "_default");
                                        }
                                        s = s.toRgbaString();
                                    }
                                    try {
                                        e.style[i] = s;
                                    } catch (t) {}
                                },
                            }),
                                (t.fx.step[i] = function (e) {
                                    e.colorInit || ((e.start = c(e.elem, i)), (e.end = c(e.end)), (e.colorInit = !0)), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
                                });
                        });
                    }),
                    c.hook(o),
                    (t.cssHooks.borderColor = {
                        expand: function (t) {
                            var e = {};
                            return (
                                f(["Top", "Right", "Bottom", "Left"], function (i, a) {
                                    e["border" + a + "Color"] = t;
                                }),
                                e
                            );
                        },
                    }),
                    (n = t.Color.names = {
                        aqua: "#00ffff",
                        black: "#000000",
                        blue: "#0000ff",
                        fuchsia: "#ff00ff",
                        gray: "#808080",
                        green: "#008000",
                        lime: "#00ff00",
                        maroon: "#800000",
                        navy: "#000080",
                        olive: "#808000",
                        purple: "#800080",
                        red: "#ff0000",
                        silver: "#c0c0c0",
                        teal: "#008080",
                        white: "#ffffff",
                        yellow: "#ffff00",
                        transparent: [null, null, null, 0],
                        _default: "#ffffff",
                    });
            })(w),
            (function () {
                function e(e) {
                    var i,
                        a,
                        s = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                        n = {};
                    if (s && s.length && s[0] && s[s[0]]) for (a = s.length; a--; ) "string" == typeof s[(i = s[a])] && (n[t.camelCase(i)] = s[i]);
                    else for (i in s) "string" == typeof s[i] && (n[i] = s[i]);
                    return n;
                }
                function i(e, i) {
                    var a,
                        n,
                        o = {};
                    for (a in i) (n = i[a]), e[a] !== n && (s[a] || ((t.fx.step[a] || !isNaN(parseFloat(n))) && (o[a] = n)));
                    return o;
                }
                var a = ["add", "remove", "toggle"],
                    s = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };
                t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
                    t.fx.step[i] = function (t) {
                        (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) && (w.style(t.elem, i, t.end), (t.setAttr = !0));
                    };
                }),
                    t.fn.addBack ||
                        (t.fn.addBack = function (t) {
                            return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                        }),
                    (t.effects.animateClass = function (s, n, o, r) {
                        var l = t.speed(n, o, r);
                        return this.queue(function () {
                            var n,
                                o = t(this),
                                r = o.attr("class") || "",
                                c = l.children ? o.find("*").addBack() : o;
                            (c = c.map(function () {
                                var i;
                                return { el: t(this), start: e(this) };
                            })),
                                (n = function () {
                                    t.each(a, function (t, e) {
                                        s[e] && o[e + "Class"](s[e]);
                                    });
                                })(),
                                (c = c.map(function () {
                                    return (this.end = e(this.el[0])), (this.diff = i(this.start, this.end)), this;
                                })),
                                o.attr("class", r),
                                (c = c.map(function () {
                                    var e = this,
                                        i = t.Deferred(),
                                        a = t.extend({}, l, {
                                            queue: !1,
                                            complete: function () {
                                                i.resolve(e);
                                            },
                                        });
                                    return this.el.animate(this.diff, a), i.promise();
                                })),
                                t.when.apply(t, c.get()).done(function () {
                                    n(),
                                        t.each(arguments, function () {
                                            var e = this.el;
                                            t.each(this.diff, function (t) {
                                                e.css(t, "");
                                            });
                                        }),
                                        l.complete.call(o[0]);
                                });
                        });
                    }),
                    t.fn.extend({
                        addClass: (function (e) {
                            return function (i, a, s, n) {
                                return a ? t.effects.animateClass.call(this, { add: i }, a, s, n) : e.apply(this, arguments);
                            };
                        })(t.fn.addClass),
                        removeClass: (function (e) {
                            return function (i, a, s, n) {
                                return arguments.length > 1 ? t.effects.animateClass.call(this, { remove: i }, a, s, n) : e.apply(this, arguments);
                            };
                        })(t.fn.removeClass),
                        toggleClass: (function (e) {
                            return function (i, a, s, n, o) {
                                return "boolean" == typeof a || void 0 === a
                                    ? s
                                        ? t.effects.animateClass.call(this, a ? { add: i } : { remove: i }, s, n, o)
                                        : e.apply(this, arguments)
                                    : t.effects.animateClass.call(this, { toggle: i }, a, s, n);
                            };
                        })(t.fn.toggleClass),
                        switchClass: function (e, i, a, s, n) {
                            return t.effects.animateClass.call(this, { add: i, remove: e }, a, s, n);
                        },
                    });
            })(),
            (function () {
                function e(e, i, a, s) {
                    return (
                        t.isPlainObject(e) && ((i = e), (e = e.effect)),
                        (e = { effect: e }),
                        null == i && (i = {}),
                        t.isFunction(i) && ((s = i), (a = null), (i = {})),
                        ("number" == typeof i || t.fx.speeds[i]) && ((s = a), (a = i), (i = {})),
                        t.isFunction(a) && ((s = a), (a = null)),
                        i && t.extend(e, i),
                        (a = a || i.duration),
                        (e.duration = t.fx.off ? 0 : "number" == typeof a ? a : a in t.fx.speeds ? t.fx.speeds[a] : t.fx.speeds._default),
                        (e.complete = s || i.complete),
                        e
                    );
                }
                function i(e) {
                    return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects.effect[e]) || !!t.isFunction(e) || ("object" == typeof e && !e.effect);
                }
                t.extend(t.effects, {
                    version: "1.11.4",
                    save: function (t, e) {
                        for (var i = 0; e.length > i; i++) null !== e[i] && t.data(b + e[i], t[0].style[e[i]]);
                    },
                    restore: function (t, e) {
                        var i, a;
                        for (a = 0; e.length > a; a++) null !== e[a] && (void 0 === (i = t.data(b + e[a])) && (i = ""), t.css(e[a], i));
                    },
                    setMode: function (t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
                    },
                    getBaseline: function (t, e) {
                        var i, a;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = 0.5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height;
                        }
                        switch (t[1]) {
                            case "left":
                                a = 0;
                                break;
                            case "center":
                                a = 0.5;
                                break;
                            case "right":
                                a = 1;
                                break;
                            default:
                                a = t[1] / e.width;
                        }
                        return { x: a, y: i };
                    },
                    createWrapper: function (e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = { width: e.outerWidth(!0), height: e.outerHeight(!0), float: e.css("float") },
                            a = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
                            s = { width: e.width(), height: e.height() },
                            n = document.activeElement;
                        try {
                            n.id;
                        } catch (t) {
                            n = document.body;
                        }
                        return (
                            e.wrap(a),
                            (e[0] === n || t.contains(e[0], n)) && t(n).focus(),
                            (a = e.parent()),
                            "static" === e.css("position")
                                ? (a.css({ position: "relative" }), e.css({ position: "relative" }))
                                : (t.extend(i, { position: e.css("position"), zIndex: e.css("z-index") }),
                                  t.each(["top", "left", "bottom", "right"], function (t, a) {
                                      (i[a] = e.css(a)), isNaN(parseInt(i[a], 10)) && (i[a] = "auto");
                                  }),
                                  e.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })),
                            e.css(s),
                            a.css(i).show()
                        );
                    },
                    removeWrapper: function (e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e;
                    },
                    setTransition: function (e, i, a, s) {
                        return (
                            (s = s || {}),
                            t.each(i, function (t, i) {
                                var n = e.cssUnit(i);
                                n[0] > 0 && (s[i] = n[0] * a + n[1]);
                            }),
                            s
                        );
                    },
                }),
                    t.fn.extend({
                        effect: function () {
                            function i(e) {
                                function i() {
                                    t.isFunction(n) && n.call(s[0]), t.isFunction(e) && e();
                                }
                                var s = t(this),
                                    n = a.complete,
                                    r = a.mode;
                                (s.is(":hidden") ? "hide" === r : "show" === r) ? (s[r](), i()) : o.call(s[0], a, i);
                            }
                            var a = e.apply(this, arguments),
                                s = a.mode,
                                n = a.queue,
                                o = t.effects.effect[a.effect];
                            return t.fx.off || !o
                                ? s
                                    ? this[s](a.duration, a.complete)
                                    : this.each(function () {
                                          a.complete && a.complete.call(this);
                                      })
                                : !1 === n
                                ? this.each(i)
                                : this.queue(n || "fx", i);
                        },
                        show: (function (t) {
                            return function (a) {
                                if (i(a)) return t.apply(this, arguments);
                                var s = e.apply(this, arguments);
                                return (s.mode = "show"), this.effect.call(this, s);
                            };
                        })(t.fn.show),
                        hide: (function (t) {
                            return function (a) {
                                if (i(a)) return t.apply(this, arguments);
                                var s = e.apply(this, arguments);
                                return (s.mode = "hide"), this.effect.call(this, s);
                            };
                        })(t.fn.hide),
                        toggle: (function (t) {
                            return function (a) {
                                if (i(a) || "boolean" == typeof a) return t.apply(this, arguments);
                                var s = e.apply(this, arguments);
                                return (s.mode = "toggle"), this.effect.call(this, s);
                            };
                        })(t.fn.toggle),
                        cssUnit: function (e) {
                            var i = this.css(e),
                                a = [];
                            return (
                                t.each(["em", "px", "%", "pt"], function (t, e) {
                                    i.indexOf(e) > 0 && (a = [parseFloat(i), e]);
                                }),
                                a
                            );
                        },
                    });
            })(),
            (function () {
                var e = {};
                t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
                    e[i] = function (e) {
                        return Math.pow(e, t + 2);
                    };
                }),
                    t.extend(e, {
                        Sine: function (t) {
                            return 1 - Math.cos((t * Math.PI) / 2);
                        },
                        Circ: function (t) {
                            return 1 - Math.sqrt(1 - t * t);
                        },
                        Elastic: function (t) {
                            return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
                        },
                        Back: function (t) {
                            return t * t * (3 * t - 2);
                        },
                        Bounce: function (t) {
                            for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
                            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2);
                        },
                    }),
                    t.each(e, function (e, i) {
                        (t.easing["easeIn" + e] = i),
                            (t.easing["easeOut" + e] = function (t) {
                                return 1 - i(1 - t);
                            }),
                            (t.easing["easeInOut" + e] = function (t) {
                                return 0.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
                            });
                    });
            })(),
            t.effects,
            (t.effects.effect.blind = function (e, i) {
                var a,
                    s,
                    n,
                    o = t(this),
                    r = /up|down|vertical/,
                    l = /up|left|vertical|horizontal/,
                    c = ["position", "top", "bottom", "left", "right", "height", "width"],
                    u = t.effects.setMode(o, e.mode || "hide"),
                    d = e.direction || "up",
                    h = r.test(d),
                    p = h ? "height" : "width",
                    f = h ? "top" : "left",
                    m = l.test(d),
                    g = {},
                    v = "show" === u;
                o.parent().is(".ui-effects-wrapper") ? t.effects.save(o.parent(), c) : t.effects.save(o, c),
                    o.show(),
                    (s = (a = t.effects.createWrapper(o).css({ overflow: "hidden" }))[p]()),
                    (n = parseFloat(a.css(f)) || 0),
                    (g[p] = v ? s : 0),
                    m ||
                        (o
                            .css(h ? "bottom" : "right", 0)
                            .css(h ? "top" : "left", "auto")
                            .css({ position: "absolute" }),
                        (g[f] = v ? n : s + n)),
                    v && (a.css(p, 0), m || a.css(f, n + s)),
                    a.animate(g, {
                        duration: e.duration,
                        easing: e.easing,
                        queue: !1,
                        complete: function () {
                            "hide" === u && o.hide(), t.effects.restore(o, c), t.effects.removeWrapper(o), i();
                        },
                    });
            }),
            (t.effects.effect.bounce = function (e, i) {
                var a,
                    s,
                    n,
                    o = t(this),
                    r = ["position", "top", "bottom", "left", "right", "height", "width"],
                    l = t.effects.setMode(o, e.mode || "effect"),
                    c = "hide" === l,
                    u = "show" === l,
                    d = e.direction || "up",
                    h = e.distance,
                    p = e.times || 5,
                    f = 2 * p + (u || c ? 1 : 0),
                    m = e.duration / f,
                    g = e.easing,
                    v = "up" === d || "down" === d ? "top" : "left",
                    b = "up" === d || "left" === d,
                    w = o.queue(),
                    y = w.length;
                for (
                    (u || c) && r.push("opacity"),
                        t.effects.save(o, r),
                        o.show(),
                        t.effects.createWrapper(o),
                        h || (h = o["top" === v ? "outerHeight" : "outerWidth"]() / 3),
                        u &&
                            (((n = { opacity: 1 })[v] = 0),
                            o
                                .css("opacity", 0)
                                .css(v, b ? 2 * -h : 2 * h)
                                .animate(n, m, g)),
                        c && (h /= Math.pow(2, p - 1)),
                        (n = {})[v] = 0,
                        a = 0;
                    p > a;
                    a++
                )
                    ((s = {})[v] = (b ? "-=" : "+=") + h), o.animate(s, m, g).animate(n, m, g), (h = c ? 2 * h : h / 2);
                c && (((s = { opacity: 0 })[v] = (b ? "-=" : "+=") + h), o.animate(s, m, g)),
                    o.queue(function () {
                        c && o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i();
                    }),
                    y > 1 && w.splice.apply(w, [1, 0].concat(w.splice(y, f + 1))),
                    o.dequeue();
            }),
            (t.effects.effect.clip = function (e, i) {
                var a,
                    s,
                    n,
                    o = t(this),
                    r = ["position", "top", "bottom", "left", "right", "height", "width"],
                    l,
                    c = "show" === t.effects.setMode(o, e.mode || "hide"),
                    u,
                    d = "vertical" === (e.direction || "vertical"),
                    h = d ? "height" : "width",
                    p = d ? "top" : "left",
                    f = {};
                t.effects.save(o, r),
                    o.show(),
                    (a = t.effects.createWrapper(o).css({ overflow: "hidden" })),
                    (n = (s = "IMG" === o[0].tagName ? a : o)[h]()),
                    c && (s.css(h, 0), s.css(p, n / 2)),
                    (f[h] = c ? n : 0),
                    (f[p] = c ? 0 : n / 2),
                    s.animate(f, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function () {
                            c || o.hide(), t.effects.restore(o, r), t.effects.removeWrapper(o), i();
                        },
                    });
            }),
            (t.effects.effect.drop = function (e, i) {
                var a,
                    s = t(this),
                    n = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                    o = t.effects.setMode(s, e.mode || "hide"),
                    r = "show" === o,
                    l = e.direction || "left",
                    c = "up" === l || "down" === l ? "top" : "left",
                    u = "up" === l || "left" === l ? "pos" : "neg",
                    d = { opacity: r ? 1 : 0 };
                t.effects.save(s, n),
                    s.show(),
                    t.effects.createWrapper(s),
                    (a = e.distance || s["top" === c ? "outerHeight" : "outerWidth"](!0) / 2),
                    r && s.css("opacity", 0).css(c, "pos" === u ? -a : a),
                    (d[c] = (r ? ("pos" === u ? "+=" : "-=") : "pos" === u ? "-=" : "+=") + a),
                    s.animate(d, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function () {
                            "hide" === o && s.hide(), t.effects.restore(s, n), t.effects.removeWrapper(s), i();
                        },
                    });
            }),
            (t.effects.effect.explode = function (e, i) {
                function a() {
                    w.push(this), w.length === d * h && s();
                }
                function s() {
                    p.css({ visibility: "visible" }), t(w).remove(), m || p.hide(), i();
                }
                var n,
                    o,
                    r,
                    l,
                    c,
                    u,
                    d = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                    h = d,
                    p = t(this),
                    f,
                    m = "show" === t.effects.setMode(p, e.mode || "hide"),
                    g = p.show().css("visibility", "hidden").offset(),
                    v = Math.ceil(p.outerWidth() / h),
                    b = Math.ceil(p.outerHeight() / d),
                    w = [];
                for (n = 0; d > n; n++)
                    for (l = g.top + n * b, u = n - (d - 1) / 2, o = 0; h > o; o++)
                        (r = g.left + o * v),
                            (c = o - (h - 1) / 2),
                            p
                                .clone()
                                .appendTo("body")
                                .wrap("<div></div>")
                                .css({ position: "absolute", visibility: "visible", left: -o * v, top: -n * b })
                                .parent()
                                .addClass("ui-effects-explode")
                                .css({ position: "absolute", overflow: "hidden", width: v, height: b, left: r + (m ? c * v : 0), top: l + (m ? u * b : 0), opacity: m ? 0 : 1 })
                                .animate({ left: r + (m ? 0 : c * v), top: l + (m ? 0 : u * b), opacity: m ? 1 : 0 }, e.duration || 500, e.easing, a);
            }),
            (t.effects.effect.fade = function (e, i) {
                var a = t(this),
                    s = t.effects.setMode(a, e.mode || "toggle");
                a.animate({ opacity: s }, { queue: !1, duration: e.duration, easing: e.easing, complete: i });
            }),
            (t.effects.effect.fold = function (e, i) {
                var a,
                    s,
                    n = t(this),
                    o = ["position", "top", "bottom", "left", "right", "height", "width"],
                    r = t.effects.setMode(n, e.mode || "hide"),
                    l = "show" === r,
                    c = "hide" === r,
                    u = e.size || 15,
                    d = /([0-9]+)%/.exec(u),
                    h = !!e.horizFirst,
                    p = l !== h,
                    f = p ? ["width", "height"] : ["height", "width"],
                    m = e.duration / 2,
                    g = {},
                    v = {};
                t.effects.save(n, o),
                    n.show(),
                    (a = t.effects.createWrapper(n).css({ overflow: "hidden" })),
                    (s = p ? [a.width(), a.height()] : [a.height(), a.width()]),
                    d && (u = (parseInt(d[1], 10) / 100) * s[c ? 0 : 1]),
                    l && a.css(h ? { height: 0, width: u } : { height: u, width: 0 }),
                    (g[f[0]] = l ? s[0] : u),
                    (v[f[1]] = l ? s[1] : 0),
                    a.animate(g, m, e.easing).animate(v, m, e.easing, function () {
                        c && n.hide(), t.effects.restore(n, o), t.effects.removeWrapper(n), i();
                    });
            }),
            (t.effects.effect.highlight = function (e, i) {
                var a = t(this),
                    s = ["backgroundImage", "backgroundColor", "opacity"],
                    n = t.effects.setMode(a, e.mode || "show"),
                    o = { backgroundColor: a.css("backgroundColor") };
                "hide" === n && (o.opacity = 0),
                    t.effects.save(a, s),
                    a
                        .show()
                        .css({ backgroundImage: "none", backgroundColor: e.color || "#ffff99" })
                        .animate(o, {
                            queue: !1,
                            duration: e.duration,
                            easing: e.easing,
                            complete: function () {
                                "hide" === n && a.hide(), t.effects.restore(a, s), i();
                            },
                        });
            }),
            (t.effects.effect.size = function (e, i) {
                var a,
                    s,
                    n,
                    o = t(this),
                    r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                    l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                    c = ["width", "height", "overflow"],
                    u = ["fontSize"],
                    d = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                    h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                    p = t.effects.setMode(o, e.mode || "effect"),
                    f = e.restore || "effect" !== p,
                    m = e.scale || "both",
                    g = e.origin || ["middle", "center"],
                    v = o.css("position"),
                    b = f ? r : l,
                    w = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
                "show" === p && o.show(),
                    (a = { height: o.height(), width: o.width(), outerHeight: o.outerHeight(), outerWidth: o.outerWidth() }),
                    "toggle" === e.mode && "show" === p ? ((o.from = e.to || w), (o.to = e.from || a)) : ((o.from = e.from || ("show" === p ? w : a)), (o.to = e.to || ("hide" === p ? w : a))),
                    (n = { from: { y: o.from.height / a.height, x: o.from.width / a.width }, to: { y: o.to.height / a.height, x: o.to.width / a.width } }),
                    ("box" === m || "both" === m) &&
                        (n.from.y !== n.to.y && ((b = b.concat(d)), (o.from = t.effects.setTransition(o, d, n.from.y, o.from)), (o.to = t.effects.setTransition(o, d, n.to.y, o.to))),
                        n.from.x !== n.to.x && ((b = b.concat(h)), (o.from = t.effects.setTransition(o, h, n.from.x, o.from)), (o.to = t.effects.setTransition(o, h, n.to.x, o.to)))),
                    ("content" === m || "both" === m) && n.from.y !== n.to.y && ((b = b.concat(u).concat(c)), (o.from = t.effects.setTransition(o, u, n.from.y, o.from)), (o.to = t.effects.setTransition(o, u, n.to.y, o.to))),
                    t.effects.save(o, b),
                    o.show(),
                    t.effects.createWrapper(o),
                    o.css("overflow", "hidden").css(o.from),
                    g &&
                        ((s = t.effects.getBaseline(g, a)),
                        (o.from.top = (a.outerHeight - o.outerHeight()) * s.y),
                        (o.from.left = (a.outerWidth - o.outerWidth()) * s.x),
                        (o.to.top = (a.outerHeight - o.to.outerHeight) * s.y),
                        (o.to.left = (a.outerWidth - o.to.outerWidth) * s.x)),
                    o.css(o.from),
                    ("content" === m || "both" === m) &&
                        ((d = d.concat(["marginTop", "marginBottom"]).concat(u)),
                        (h = h.concat(["marginLeft", "marginRight"])),
                        (c = r.concat(d).concat(h)),
                        o.find("*[width]").each(function () {
                            var i = t(this),
                                a = i.height(),
                                s = i.width(),
                                o = i.outerHeight(),
                                r = i.outerWidth();
                            f && t.effects.save(i, c),
                                (i.from = { height: a * n.from.y, width: s * n.from.x, outerHeight: o * n.from.y, outerWidth: r * n.from.x }),
                                (i.to = { height: a * n.to.y, width: s * n.to.x, outerHeight: a * n.to.y, outerWidth: s * n.to.x }),
                                n.from.y !== n.to.y && ((i.from = t.effects.setTransition(i, d, n.from.y, i.from)), (i.to = t.effects.setTransition(i, d, n.to.y, i.to))),
                                n.from.x !== n.to.x && ((i.from = t.effects.setTransition(i, h, n.from.x, i.from)), (i.to = t.effects.setTransition(i, h, n.to.x, i.to))),
                                i.css(i.from),
                                i.animate(i.to, e.duration, e.easing, function () {
                                    f && t.effects.restore(i, c);
                                });
                        })),
                    o.animate(o.to, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function () {
                            0 === o.to.opacity && o.css("opacity", o.from.opacity),
                                "hide" === p && o.hide(),
                                t.effects.restore(o, b),
                                f ||
                                    ("static" === v
                                        ? o.css({ position: "relative", top: o.to.top, left: o.to.left })
                                        : t.each(["top", "left"], function (t, e) {
                                              o.css(e, function (e, i) {
                                                  var a = parseInt(i, 10),
                                                      s = t ? o.to.left : o.to.top;
                                                  return "auto" === i ? s + "px" : a + s + "px";
                                              });
                                          })),
                                t.effects.removeWrapper(o),
                                i();
                        },
                    });
            }),
            (t.effects.effect.scale = function (e, i) {
                var a = t(this),
                    s = t.extend(!0, {}, e),
                    n = t.effects.setMode(a, e.mode || "effect"),
                    o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === n ? 0 : 100),
                    r = e.direction || "both",
                    l = e.origin,
                    c = { height: a.height(), width: a.width(), outerHeight: a.outerHeight(), outerWidth: a.outerWidth() },
                    u = "horizontal" !== r ? o / 100 : 1,
                    d = "vertical" !== r ? o / 100 : 1;
                (s.effect = "size"),
                    (s.queue = !1),
                    (s.complete = i),
                    "effect" !== n && ((s.origin = l || ["middle", "center"]), (s.restore = !0)),
                    (s.from = e.from || ("show" === n ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 } : c)),
                    (s.to = { height: c.height * u, width: c.width * d, outerHeight: c.outerHeight * u, outerWidth: c.outerWidth * d }),
                    s.fade && ("show" === n && ((s.from.opacity = 0), (s.to.opacity = 1)), "hide" === n && ((s.from.opacity = 1), (s.to.opacity = 0))),
                    a.effect(s);
            }),
            (t.effects.effect.puff = function (e, i) {
                var a = t(this),
                    s = t.effects.setMode(a, e.mode || "hide"),
                    n = "hide" === s,
                    o = parseInt(e.percent, 10) || 150,
                    r = o / 100,
                    l = { height: a.height(), width: a.width(), outerHeight: a.outerHeight(), outerWidth: a.outerWidth() };
                t.extend(e, { effect: "scale", queue: !1, fade: !0, mode: s, complete: i, percent: n ? o : 100, from: n ? l : { height: l.height * r, width: l.width * r, outerHeight: l.outerHeight * r, outerWidth: l.outerWidth * r } }),
                    a.effect(e);
            }),
            (t.effects.effect.pulsate = function (e, i) {
                var a,
                    s = t(this),
                    n = t.effects.setMode(s, e.mode || "show"),
                    o = "show" === n,
                    r = "hide" === n,
                    l = o || "hide" === n,
                    c = 2 * (e.times || 5) + (l ? 1 : 0),
                    u = e.duration / c,
                    d = 0,
                    h = s.queue(),
                    p = h.length;
                for ((o || !s.is(":visible")) && (s.css("opacity", 0).show(), (d = 1)), a = 1; c > a; a++) s.animate({ opacity: d }, u, e.easing), (d = 1 - d);
                s.animate({ opacity: d }, u, e.easing),
                    s.queue(function () {
                        r && s.hide(), i();
                    }),
                    p > 1 && h.splice.apply(h, [1, 0].concat(h.splice(p, c + 1))),
                    s.dequeue();
            }),
            (t.effects.effect.shake = function (e, i) {
                var a,
                    s = t(this),
                    n = ["position", "top", "bottom", "left", "right", "height", "width"],
                    o = t.effects.setMode(s, e.mode || "effect"),
                    r = e.direction || "left",
                    l = e.distance || 20,
                    c = e.times || 3,
                    u = 2 * c + 1,
                    d = Math.round(e.duration / u),
                    h = "up" === r || "down" === r ? "top" : "left",
                    p = "up" === r || "left" === r,
                    f = {},
                    m = {},
                    g = {},
                    v = s.queue(),
                    b = v.length;
                for (t.effects.save(s, n), s.show(), t.effects.createWrapper(s), f[h] = (p ? "-=" : "+=") + l, m[h] = (p ? "+=" : "-=") + 2 * l, g[h] = (p ? "-=" : "+=") + 2 * l, s.animate(f, d, e.easing), a = 1; c > a; a++)
                    s.animate(m, d, e.easing).animate(g, d, e.easing);
                s
                    .animate(m, d, e.easing)
                    .animate(f, d / 2, e.easing)
                    .queue(function () {
                        "hide" === o && s.hide(), t.effects.restore(s, n), t.effects.removeWrapper(s), i();
                    }),
                    b > 1 && v.splice.apply(v, [1, 0].concat(v.splice(b, u + 1))),
                    s.dequeue();
            }),
            (t.effects.effect.slide = function (e, i) {
                var a,
                    s = t(this),
                    n = ["position", "top", "bottom", "left", "right", "width", "height"],
                    o = t.effects.setMode(s, e.mode || "show"),
                    r = "show" === o,
                    l = e.direction || "left",
                    c = "up" === l || "down" === l ? "top" : "left",
                    u = "up" === l || "left" === l,
                    d = {};
                t.effects.save(s, n),
                    s.show(),
                    (a = e.distance || s["top" === c ? "outerHeight" : "outerWidth"](!0)),
                    t.effects.createWrapper(s).css({ overflow: "hidden" }),
                    r && s.css(c, u ? (isNaN(a) ? "-" + a : -a) : a),
                    (d[c] = (r ? (u ? "+=" : "-=") : u ? "-=" : "+=") + a),
                    s.animate(d, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.easing,
                        complete: function () {
                            "hide" === o && s.hide(), t.effects.restore(s, n), t.effects.removeWrapper(s), i();
                        },
                    });
            }),
            (t.effects.effect.transfer = function (e, i) {
                var a = t(this),
                    s = t(e.to),
                    n = "fixed" === s.css("position"),
                    o = t("body"),
                    r = n ? o.scrollTop() : 0,
                    l = n ? o.scrollLeft() : 0,
                    c = s.offset(),
                    u = { top: c.top - r, left: c.left - l, height: s.innerHeight(), width: s.innerWidth() },
                    d = a.offset(),
                    h = t("<div class='ui-effects-transfer'></div>")
                        .appendTo(document.body)
                        .addClass(e.className)
                        .css({ top: d.top - r, left: d.left - l, height: a.innerHeight(), width: a.innerWidth(), position: n ? "fixed" : "absolute" })
                        .animate(u, e.duration, e.easing, function () {
                            h.remove(), i();
                        });
            });
    }),
    ($.datepicker.regional["pt-BR"] = {
        closeText: "",
        prevText: "&#x3C; Mês anterior",
        nextText: "Próximo mês &#x3E;",
        currentText: "",
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        showButtonPanel: !0,
        yearSuffix: "",
    }),
    $.datepicker.setDefaults($.datepicker.regional["pt-BR"]),
    (function (t) {
        function e(t, e) {
            if (!(t.originalEvent.touches.length > 1)) {
                t.preventDefault();
                var i = t.originalEvent.changedTouches[0],
                    a = document.createEvent("MouseEvents");
                a.initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(a);
            }
        }
        if (((t.support.touch = "ontouchend" in document), t.support.touch)) {
            var i,
                a = t.ui.mouse.prototype,
                s = a._mouseInit,
                n = a._mouseDestroy;
            (a._touchStart = function (t) {
                var a = this;
                !i && a._mouseCapture(t.originalEvent.changedTouches[0]) && ((i = !0), (a._touchMoved = !1), e(t, "mouseover"), e(t, "mousemove"), e(t, "mousedown"));
            }),
                (a._touchMove = function (t) {
                    i && ((this._touchMoved = !0), e(t, "mousemove"));
                }),
                (a._touchEnd = function (t) {
                    i && (e(t, "mouseup"), e(t, "mouseout"), this._touchMoved || e(t, "click"), (i = !1));
                }),
                (a._mouseInit = function () {
                    var e = this;
                    e.element.bind({ touchstart: t.proxy(e, "_touchStart"), touchmove: t.proxy(e, "_touchMove"), touchend: t.proxy(e, "_touchEnd") }), s.call(e);
                }),
                (a._mouseDestroy = function () {
                    var e = this;
                    e.element.unbind({ touchstart: t.proxy(e, "_touchStart"), touchmove: t.proxy(e, "_touchMove"), touchend: t.proxy(e, "_touchEnd") }), n.call(e);
                });
        }
    })(jQuery),
    (function (t, e) {
        "object" == typeof exports ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : (t.Spinner = e());
    })(this, function () {
        "use strict";
        function t(t, e) {
            var i,
                a = document.createElement(t || "div");
            for (i in e) a[i] = e[i];
            return a;
        }
        function e(t) {
            for (var e = 1, i = arguments.length; i > e; e++) t.appendChild(arguments[e]);
            return t;
        }
        function i(t, e, i, a) {
            var s = ["opacity", e, ~~(100 * t), i, a].join("-"),
                n = 0.01 + (i / a) * 100,
                o = Math.max(1 - ((1 - t) / e) * (100 - n), t),
                r = c.substring(0, c.indexOf("Animation")).toLowerCase(),
                l = (r && "-" + r + "-") || "";
            return (
                h[s] ||
                    (u.insertRule("@" + l + "keyframes " + s + "{0%{opacity:" + o + "}" + n + "%{opacity:" + t + "}" + (n + 0.01) + "%{opacity:1}" + ((n + e) % 100) + "%{opacity:" + t + "}100%{opacity:" + o + "}}", u.cssRules.length),
                    (h[s] = 1)),
                s
            );
        }
        function a(t, e) {
            var i,
                a,
                s = t.style;
            for (e = e.charAt(0).toUpperCase() + e.slice(1), a = 0; a < d.length; a++) if (void 0 !== s[(i = d[a] + e)]) return i;
            return void 0 !== s[e] ? e : void 0;
        }
        function s(t, e) {
            for (var i in e) t.style[a(t, i) || i] = e[i];
            return t;
        }
        function n(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var a in i) void 0 === t[a] && (t[a] = i[a]);
            }
            return t;
        }
        function o(t, e) {
            return "string" == typeof t ? t : t[e % t.length];
        }
        function r(t) {
            this.opts = n(t || {}, r.defaults, p);
        }
        function l() {
            function i(e, i) {
                return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', i);
            }
            u.addRule(".spin-vml", "behavior:url(#default#VML)"),
                (r.prototype.lines = function (t, a) {
                    function n() {
                        return s(i("group", { coordsize: u + " " + u, coordorigin: -c + " " + -c }), { width: u, height: u });
                    }
                    function r(t, r, l) {
                        e(
                            h,
                            e(
                                s(n(), { rotation: (360 / a.lines) * t + "deg", left: ~~r }),
                                e(
                                    s(i("roundrect", { arcsize: a.corners }), { width: c, height: a.scale * a.width, left: a.scale * a.radius, top: (-a.scale * a.width) >> 1, filter: l }),
                                    i("fill", { color: o(a.color, t), opacity: a.opacity }),
                                    i("stroke", { opacity: 0 })
                                )
                            )
                        );
                    }
                    var l,
                        c = a.scale * (a.length + a.width),
                        u = 2 * a.scale * c,
                        d = -(a.width + a.length) * a.scale * 2 + "px",
                        h = s(n(), { position: "absolute", top: d, left: d });
                    if (a.shadow) for (l = 1; l <= a.lines; l++) r(l, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                    for (l = 1; l <= a.lines; l++) r(l);
                    return e(t, h);
                }),
                (r.prototype.opacity = function (t, e, i, a) {
                    var s = t.firstChild;
                    (a = (a.shadow && a.lines) || 0), s && e + a < s.childNodes.length && (s = (s = (s = s.childNodes[e + a]) && s.firstChild) && s.firstChild) && (s.opacity = i);
                });
        }
        var c,
            u,
            d = ["webkit", "Moz", "ms", "O"],
            h = {},
            p = {
                lines: 12,
                length: 7,
                width: 5,
                radius: 10,
                scale: 1,
                rotate: 0,
                corners: 1,
                color: "#000",
                direction: 1,
                speed: 1,
                trail: 100,
                opacity: 0.25,
                fps: 20,
                zIndex: 2e9,
                className: "spinner",
                top: "50%",
                left: "50%",
                position: "absolute",
            };
        if (
            ((r.defaults = {}),
            n(r.prototype, {
                spin: function (e) {
                    this.stop();
                    var i = this,
                        a = i.opts,
                        n = (i.el = s(t(0, { className: a.className }), { position: a.position, width: 0, zIndex: a.zIndex }));
                    if ((s(n, { left: a.left, top: a.top }), e && e.insertBefore(n, e.firstChild || null), n.setAttribute("role", "progressbar"), i.lines(n, i.opts), !c)) {
                        var o,
                            r = 0,
                            l = ((a.lines - 1) * (1 - a.direction)) / 2,
                            u = a.fps,
                            d = u / a.speed,
                            h = (1 - a.opacity) / ((d * a.trail) / 100),
                            p = d / a.lines;
                        !(function t() {
                            r++;
                            for (var e = 0; e < a.lines; e++) (o = Math.max(1 - ((r + (a.lines - e) * p) % d) * h, a.opacity)), i.opacity(n, e * a.direction + l, o, a);
                            i.timeout = i.el && setTimeout(t, ~~(1e3 / u));
                        })();
                    }
                    return i;
                },
                stop: function () {
                    var t = this.el;
                    return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), (this.el = void 0)), this;
                },
                lines: function (a, n) {
                    function r(e, i) {
                        return s(t(), {
                            position: "absolute",
                            width: n.scale * (n.length + n.width) + "px",
                            height: n.scale * n.width + "px",
                            background: e,
                            boxShadow: i,
                            transformOrigin: "left",
                            transform: "rotate(" + ~~((360 / n.lines) * u + n.rotate) + "deg) translate(" + n.scale * n.radius + "px,0)",
                            borderRadius: ((n.corners * n.scale * n.width) >> 1) + "px",
                        });
                    }
                    for (var l, u = 0, d = ((n.lines - 1) * (1 - n.direction)) / 2; u < n.lines; u++)
                        (l = s(t(), {
                            position: "absolute",
                            top: 1 + ~((n.scale * n.width) / 2) + "px",
                            transform: n.hwaccel ? "translate3d(0,0,0)" : "",
                            opacity: n.opacity,
                            animation: c && i(n.opacity, n.trail, d + u * n.direction, n.lines) + " " + 1 / n.speed + "s linear infinite",
                        })),
                            n.shadow && e(l, s(r("#000", "0 0 4px #000"), { top: "2px" })),
                            e(a, e(l, r(o(n.color, u), "0 0 1px rgba(0,0,0,.1)")));
                    return a;
                },
                opacity: function (t, e, i) {
                    e < t.childNodes.length && (t.childNodes[e].style.opacity = i);
                },
            }),
            "undefined" != typeof document)
        ) {
            u = (function () {
                var i = t("style", { type: "text/css" });
                return e(document.getElementsByTagName("head")[0], i), i.sheet || i.styleSheet;
            })();
            var f = s(t("group"), { behavior: "url(#default#VML)" });
            !a(f, "transform") && f.adj ? l() : (c = a(f, "animation"));
        }
        return r;
    }),
    (function (t) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], t) : t(jQuery);
    })(function (t) {
        function e(e) {
            return (
                !e || void 0 !== e.allowPageScroll || (void 0 === e.swipe && void 0 === e.swipeStatus) || (e.allowPageScroll = c),
                void 0 !== e.click && void 0 === e.tap && (e.tap = e.click),
                e || (e = {}),
                (e = t.extend({}, t.fn.swipe.defaults, e)),
                this.each(function () {
                    var a = t(this),
                        s = a.data(T);
                    s || ((s = new i(this, e)), a.data(T, s));
                })
            );
        }
        function i(e, i) {
            function g(e) {
                if (!(ct() || t(e.target).closest(i.excludedElements, Yt).length > 0)) {
                    var a = e.originalEvent ? e.originalEvent : e,
                        s,
                        n = C ? a.touches[0] : a;
                    return (
                        (Bt = _),
                        C ? (qt = a.touches.length) : e.preventDefault(),
                        (Ot = 0),
                        (Nt = null),
                        (Vt = null),
                        (zt = 0),
                        (Wt = 0),
                        (jt = 0),
                        (Ht = 1),
                        (Pt = 0),
                        (Ut = ft()),
                        (Rt = vt()),
                        rt(),
                        !C || qt === i.fingers || i.fingers === w || R() ? (dt(0, n), (Kt = Mt()), 2 == qt && (dt(1, a.touches[1]), (Wt = jt = yt(Ut[0].start, Ut[1].start))), (i.swipeStatus || i.pinchStatus) && (s = O(a, Bt))) : (s = !1),
                        !1 === s
                            ? (O(a, (Bt = D)), s)
                            : (i.hold &&
                                  (te = setTimeout(
                                      t.proxy(function () {
                                          Yt.trigger("hold", [a.target]), i.hold && (s = i.hold.call(Yt, a, a.target));
                                      }, this),
                                      i.longTapThreshold
                                  )),
                              ut(!0),
                              null)
                    );
                }
            }
            function I(t) {
                var e = t.originalEvent ? t.originalEvent : t;
                if (Bt !== x && Bt !== D && !lt()) {
                    var a,
                        s,
                        n = ht(C ? e.touches[0] : e);
                    if (
                        ((Gt = Mt()),
                        C && (qt = e.touches.length),
                        i.hold && clearTimeout(te),
                        (Bt = k),
                        2 == qt &&
                            (0 == Wt ? (dt(1, e.touches[1]), (Wt = jt = yt(Ut[0].start, Ut[1].start))) : (ht(e.touches[1]), (jt = yt(Ut[0].end, Ut[1].end)), (Vt = kt(Ut[0].end, Ut[1].end))), (Ht = _t(Wt, jt)), (Pt = Math.abs(Wt - jt))),
                        qt === i.fingers || i.fingers === w || !C || R())
                    ) {
                        if ((P(t, (Nt = Ct(n.start, n.end))), (Ot = xt(n.start, n.end)), (zt = wt()), mt(Nt, Ot), (i.swipeStatus || i.pinchStatus) && (a = O(e, Bt)), !i.triggerOnTouchEnd || i.triggerOnTouchLeave)) {
                            var o = !0;
                            if (i.triggerOnTouchLeave) {
                                var r = St(this);
                                o = Tt(n.end, r);
                            }
                            !i.triggerOnTouchEnd && o ? (Bt = A(k)) : i.triggerOnTouchLeave && !o && (Bt = A(x)), (Bt != D && Bt != x) || O(e, Bt);
                        }
                    } else O(e, (Bt = D));
                    !1 === a && O(e, (Bt = D));
                }
            }
            function $(t) {
                var e = t.originalEvent;
                return C && e.touches.length > 0
                    ? (ot(), !0)
                    : (lt() && (qt = Qt),
                      (Gt = Mt()),
                      (zt = wt()),
                      W() || !z() ? O(e, (Bt = D)) : i.triggerOnTouchEnd || (0 == i.triggerOnTouchEnd && Bt === k) ? (t.preventDefault(), O(e, (Bt = x))) : !i.triggerOnTouchEnd && J() ? N(e, (Bt = x), p) : Bt === k && O(e, (Bt = D)),
                      ut(!1),
                      null);
            }
            function L() {
                (qt = 0), (Gt = 0), (Kt = 0), (Wt = 0), (jt = 0), (Ht = 1), rt(), ut(!1);
            }
            function E(t) {
                var e = t.originalEvent;
                i.triggerOnTouchLeave && O(e, (Bt = A(x)));
            }
            function F() {
                Yt.unbind($t, g), Yt.unbind(At, L), Yt.unbind(Lt, I), Yt.unbind(Et, $), Ft && Yt.unbind(Ft, E), ut(!1);
            }
            function A(t) {
                var e = t,
                    a = H(),
                    s = z(),
                    n = W();
                return !a || n ? (e = D) : !s || t != k || (i.triggerOnTouchEnd && !i.triggerOnTouchLeave) ? !s && t == x && i.triggerOnTouchLeave && (e = D) : (e = x), e;
            }
            function O(t, e) {
                var i = void 0;
                return (
                    U() || q() || Y() || R()
                        ? ((U() || q()) && (i = N(t, e, d)), (Y() || R()) && !1 !== i && (i = N(t, e, h)))
                        : st() && !1 !== i
                        ? (i = N(t, e, f))
                        : nt() && !1 !== i
                        ? (i = N(t, e, m))
                        : at() && !1 !== i && (i = N(t, e, p)),
                    e === D && L(t),
                    e === x && (C ? 0 == t.touches.length && L(t) : L(t)),
                    i
                );
            }
            function N(e, c, u) {
                var g = void 0;
                if (u == d) {
                    if ((Yt.trigger("swipeStatus", [c, Nt || null, Ot || 0, zt || 0, qt, Ut]), i.swipeStatus && !1 === (g = i.swipeStatus.call(Yt, e, c, Nt || null, Ot || 0, zt || 0, qt, Ut)))) return !1;
                    if (c == x && B()) {
                        if ((Yt.trigger("swipe", [Nt, Ot, zt, qt, Ut]), i.swipe && !1 === (g = i.swipe.call(Yt, e, Nt, Ot, zt, qt, Ut)))) return !1;
                        switch (Nt) {
                            case a:
                                Yt.trigger("swipeLeft", [Nt, Ot, zt, qt, Ut]), i.swipeLeft && (g = i.swipeLeft.call(Yt, e, Nt, Ot, zt, qt, Ut));
                                break;
                            case s:
                                Yt.trigger("swipeRight", [Nt, Ot, zt, qt, Ut]), i.swipeRight && (g = i.swipeRight.call(Yt, e, Nt, Ot, zt, qt, Ut));
                                break;
                            case n:
                                Yt.trigger("swipeUp", [Nt, Ot, zt, qt, Ut]), i.swipeUp && (g = i.swipeUp.call(Yt, e, Nt, Ot, zt, qt, Ut));
                                break;
                            case o:
                                Yt.trigger("swipeDown", [Nt, Ot, zt, qt, Ut]), i.swipeDown && (g = i.swipeDown.call(Yt, e, Nt, Ot, zt, qt, Ut));
                                break;
                        }
                    }
                }
                if (u == h) {
                    if ((Yt.trigger("pinchStatus", [c, Vt || null, Pt || 0, zt || 0, qt, Ht, Ut]), i.pinchStatus && !1 === (g = i.pinchStatus.call(Yt, e, c, Vt || null, Pt || 0, zt || 0, qt, Ht, Ut)))) return !1;
                    if (c == x && V())
                        switch (Vt) {
                            case r:
                                Yt.trigger("pinchIn", [Vt || null, Pt || 0, zt || 0, qt, Ht, Ut]), i.pinchIn && (g = i.pinchIn.call(Yt, e, Vt || null, Pt || 0, zt || 0, qt, Ht, Ut));
                                break;
                            case l:
                                Yt.trigger("pinchOut", [Vt || null, Pt || 0, zt || 0, qt, Ht, Ut]), i.pinchOut && (g = i.pinchOut.call(Yt, e, Vt || null, Pt || 0, zt || 0, qt, Ht, Ut));
                                break;
                        }
                }
                return (
                    u == p
                        ? (c !== D && c !== x) ||
                          (clearTimeout(Zt),
                          clearTimeout(te),
                          Q() && !tt()
                              ? ((Xt = Mt()),
                                (Zt = setTimeout(
                                    t.proxy(function () {
                                        (Xt = null), Yt.trigger("tap", [e.target]), i.tap && (g = i.tap.call(Yt, e, e.target));
                                    }, this),
                                    i.doubleTapThreshold
                                )))
                              : ((Xt = null), Yt.trigger("tap", [e.target]), i.tap && (g = i.tap.call(Yt, e, e.target))))
                        : u == f
                        ? (c !== D && c !== x) || (clearTimeout(Zt), (Xt = null), Yt.trigger("doubletap", [e.target]), i.doubleTap && (g = i.doubleTap.call(Yt, e, e.target)))
                        : u == m && ((c !== D && c !== x) || (clearTimeout(Zt), (Xt = null), Yt.trigger("longtap", [e.target]), i.longTap && (g = i.longTap.call(Yt, e, e.target)))),
                    g
                );
            }
            function z() {
                var t = !0;
                return null !== i.threshold && (t = Ot >= i.threshold), t;
            }
            function W() {
                var t = !1;
                return null !== i.cancelThreshold && null !== Nt && (t = gt(Nt) - Ot >= i.cancelThreshold), t;
            }
            function j() {
                return null === i.pinchThreshold || Pt >= i.pinchThreshold;
            }
            function H() {
                var t;
                return (t = !i.maxTimeThreshold || !(zt >= i.maxTimeThreshold));
            }
            function P(t, e) {
                if (!1 !== i.preventDefaultEvents)
                    if (i.allowPageScroll === c) t.preventDefault();
                    else {
                        var r = i.allowPageScroll === u;
                        switch (e) {
                            case a:
                                ((i.swipeLeft && r) || (!r && i.allowPageScroll != v)) && t.preventDefault();
                                break;
                            case s:
                                ((i.swipeRight && r) || (!r && i.allowPageScroll != v)) && t.preventDefault();
                                break;
                            case n:
                                ((i.swipeUp && r) || (!r && i.allowPageScroll != b)) && t.preventDefault();
                                break;
                            case o:
                                ((i.swipeDown && r) || (!r && i.allowPageScroll != b)) && t.preventDefault();
                                break;
                        }
                    }
            }
            function V() {
                var t = K(),
                    e = G(),
                    i = j();
                return t && e && i;
            }
            function R() {
                return !!(i.pinchStatus || i.pinchIn || i.pinchOut);
            }
            function Y() {
                return !(!V() || !R());
            }
            function B() {
                var t = H(),
                    e = z(),
                    i = K(),
                    a = G(),
                    s,
                    n;
                return !W() && a && i && e && t;
            }
            function q() {
                return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown);
            }
            function U() {
                return !(!B() || !q());
            }
            function K() {
                return qt === i.fingers || i.fingers === w || !C;
            }
            function G() {
                return 0 !== Ut[0].end.x;
            }
            function J() {
                return !!i.tap;
            }
            function Q() {
                return !!i.doubleTap;
            }
            function X() {
                return !!i.longTap;
            }
            function Z() {
                if (null == Xt) return !1;
                var t = Mt();
                return Q() && t - Xt <= i.doubleTapThreshold;
            }
            function tt() {
                return Z();
            }
            function et() {
                return (1 === qt || !C) && (isNaN(Ot) || Ot < i.threshold);
            }
            function it() {
                return zt > i.longTapThreshold && Ot < y;
            }
            function at() {
                return !(!et() || !J());
            }
            function st() {
                return !(!Z() || !Q());
            }
            function nt() {
                return !(!it() || !X());
            }
            function ot() {
                (Jt = Mt()), (Qt = event.touches.length + 1);
            }
            function rt() {
                (Jt = 0), (Qt = 0);
            }
            function lt() {
                var t = !1,
                    e;
                Jt && Mt() - Jt <= i.fingerReleaseThreshold && (t = !0);
                return t;
            }
            function ct() {
                return !(!0 !== Yt.data(T + "_intouch"));
            }
            function ut(t) {
                !0 === t ? (Yt.bind(Lt, I), Yt.bind(Et, $), Ft && Yt.bind(Ft, E)) : (Yt.unbind(Lt, I, !1), Yt.unbind(Et, $, !1), Ft && Yt.unbind(Ft, E, !1)), Yt.data(T + "_intouch", !0 === t);
            }
            function dt(t, e) {
                var i = void 0 !== e.identifier ? e.identifier : 0;
                return (Ut[t].identifier = i), (Ut[t].start.x = Ut[t].end.x = e.pageX || e.clientX), (Ut[t].start.y = Ut[t].end.y = e.pageY || e.clientY), Ut[t];
            }
            function ht(t) {
                var e,
                    i = pt(void 0 !== t.identifier ? t.identifier : 0);
                return (i.end.x = t.pageX || t.clientX), (i.end.y = t.pageY || t.clientY), i;
            }
            function pt(t) {
                for (var e = 0; e < Ut.length; e++) if (Ut[e].identifier == t) return Ut[e];
            }
            function ft() {
                for (var t = [], e = 0; e <= 5; e++) t.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
                return t;
            }
            function mt(t, e) {
                (e = Math.max(e, gt(t))), (Rt[t].distance = e);
            }
            function gt(t) {
                if (Rt[t]) return Rt[t].distance;
            }
            function vt() {
                var t = {};
                return (t[a] = bt(a)), (t[s] = bt(s)), (t[n] = bt(n)), (t[o] = bt(o)), t;
            }
            function bt(t) {
                return { direction: t, distance: 0 };
            }
            function wt() {
                return Gt - Kt;
            }
            function yt(t, e) {
                var i = Math.abs(t.x - e.x),
                    a = Math.abs(t.y - e.y);
                return Math.round(Math.sqrt(i * i + a * a));
            }
            function _t(t, e) {
                var i;
                return ((e / t) * 1).toFixed(2);
            }
            function kt() {
                return Ht < 1 ? l : r;
            }
            function xt(t, e) {
                return Math.round(Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)));
            }
            function Dt(t, e) {
                var i = t.x - e.x,
                    a = e.y - t.y,
                    s = Math.atan2(a, i),
                    n = Math.round((180 * s) / Math.PI);
                return n < 0 && (n = 360 - Math.abs(n)), n;
            }
            function Ct(t, e) {
                var i = Dt(t, e);
                return i <= 45 && i >= 0 ? a : i <= 360 && i >= 315 ? a : i >= 135 && i <= 225 ? s : i > 45 && i < 135 ? o : n;
            }
            function Mt() {
                var t;
                return new Date().getTime();
            }
            function St(e) {
                var i = (e = t(e)).offset(),
                    a;
                return { left: i.left, right: i.left + e.outerWidth(), top: i.top, bottom: i.top + e.outerHeight() };
            }
            function Tt(t, e) {
                return t.x > e.left && t.x < e.right && t.y > e.top && t.y < e.bottom;
            }
            var It = C || S || !i.fallbackToMouseEvents,
                $t = It ? (S ? (M ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
                Lt = It ? (S ? (M ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
                Et = It ? (S ? (M ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
                Ft = It ? null : "mouseleave",
                At = S ? (M ? "MSPointerCancel" : "pointercancel") : "touchcancel",
                Ot = 0,
                Nt = null,
                zt = 0,
                Wt = 0,
                jt = 0,
                Ht = 1,
                Pt = 0,
                Vt = 0,
                Rt = null,
                Yt = t(e),
                Bt = "start",
                qt = 0,
                Ut = null,
                Kt = 0,
                Gt = 0,
                Jt = 0,
                Qt = 0,
                Xt = 0,
                Zt = null,
                te = null;
            try {
                Yt.bind($t, g), Yt.bind(At, L);
            } catch (e) {
                t.error("events not supported " + $t + "," + At + " on jQuery.swipe");
            }
            (this.enable = function () {
                return Yt.bind($t, g), Yt.bind(At, L), Yt;
            }),
                (this.disable = function () {
                    return F(), Yt;
                }),
                (this.destroy = function () {
                    F(), Yt.data(T, null), (Yt = null);
                }),
                (this.option = function (e, a) {
                    if (void 0 !== i[e]) {
                        if (void 0 === a) return i[e];
                        i[e] = a;
                    } else t.error("Option " + e + " does not exist on jQuery.swipe.options");
                    return null;
                });
        }
        var a = "left",
            s = "right",
            n = "up",
            o = "down",
            r = "in",
            l = "out",
            c = "none",
            u = "auto",
            d = "swipe",
            h = "pinch",
            p = "tap",
            f = "doubletap",
            m = "longtap",
            g = "hold",
            v = "horizontal",
            b = "vertical",
            w = "all",
            y = 10,
            _ = "start",
            k = "move",
            x = "end",
            D = "cancel",
            C = "ontouchstart" in window,
            M = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
            S = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            T = "TouchSwipe",
            I = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe",
                preventDefaultEvents: !0,
            };
        (t.fn.swipe = function (i) {
            var a = t(this),
                s = a.data(T);
            if (s && "string" == typeof i) {
                if (s[i]) return s[i].apply(this, Array.prototype.slice.call(arguments, 1));
                t.error("Method " + i + " does not exist on jQuery.swipe");
            } else if (!(s || ("object" != typeof i && i))) return e.apply(this, arguments);
            return a;
        }),
            (t.fn.swipe.defaults = I),
            (t.fn.swipe.phases = { PHASE_START: _, PHASE_MOVE: k, PHASE_END: x, PHASE_CANCEL: D }),
            (t.fn.swipe.directions = { LEFT: a, RIGHT: s, UP: n, DOWN: o, IN: r, OUT: l }),
            (t.fn.swipe.pageScroll = { NONE: c, HORIZONTAL: v, VERTICAL: b, AUTO: u }),
            (t.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: w });
    });
var $buo = function (t, e) {
        function i(t) {
            var e = new Date(new Date().getTime() + 36e5 * t);
            document.cookie = "browserupdateorg=pause; expires=" + e.toGMTString() + "; path=/";
        }
        function a() {
            for (var t = arguments, e = t[0], i = 1; i < t.length; ++i) e = e.replace(/%s/, t[i]);
            return e;
        }
        var s = 20,
            n = window.navigator,
            o;
        window._buorgres = this.op = t || {};
        var r = this.op.l;
        (this.op.l = t.l || (n.languages ? n.languages[0] : null) || n.language || n.browserLanguage || n.userLanguage || document.documentElement.getAttribute("lang") || "en"), (this.op.l = this.op.l.replace("_", "-").toLowerCase());
        var l = this.op.l.substr(0, 2),
            c = { i: 12, f: 49, o: 39, s: 9.1, n: 20, c: 53, y: 16.4, v: 1.4 },
            u = { i: 10, f: -3, o: -3, s: 7.1, n: 12, c: -3, a: 534, y: -0.1, v: -0.1 };
        if (!this.op.c || (this.op.c && this.op.c < 4)) var d = { i: 9, f: 10, o: 20, s: 7, n: 12 };
        else var d = { i: 8, f: 5, o: 12.5, s: 6.2, n: 12 };
        var h = t.vs || {},
            p = t.vs || u;
        for (o in u) p[o] || (p[o] = u[o]), c[o] && p[o] >= c[o] && (p[o] = c[o] - 0.2), c[o] && p[o] < 0 && (p[o] = c[o] + p[o]), d[o] && p[o] < d[o] && (p[o] = d[o]);
        (this.op.vsf = p),
            t.reminder < 0.1 || 0 === t.reminder ? (this.op.reminder = 0) : (this.op.reminder = t.reminder || 24),
            (this.op.reminderClosed = t.reminderClosed || 168),
            (this.op.onshow = t.onshow || function (t) {}),
            (this.op.onclick = t.onclick || function (t) {}),
            (this.op.onclose = t.onclose || function (t) {});
        var f = t.pageurl || location.hostname || "x";
        (this.op.url = r ? t.url || "//browser-update.org/" + l + "/update-browser.html#20:" + f : t.url || "//browser-update.org/update-browser.html#20:" + f),
            (this.op.newwindow = !1 !== t.newwindow),
            (this.op.test = e || t.test || "#test-bu" == location.hash || !1);
        var m = $bu_getBrowser();
        if (this.op.test || !(!m || !m.n || "x" == m.n || !1 !== m.donotnotify || (document.cookie.indexOf("browserupdateorg=pause") > -1 && this.op.reminder > 0) || m.v > p[m.n] || (m.mobile && !1 === t.mobile)))
            if (this.op.nomessage) t.onshow(this.op);
            else {
                var g;
                if (!this.op.test && 1e5 * Math.random() < 1) new Image().src = "//browser-update.org/viewcount.php?n=" + m.n + "&v=" + m.v + "&p=" + escape(f) + "&jsv=20&inv=" + this.op.v + "&vs=" + h.i + "," + h.f + "," + h.o + "," + h.s;
                this.op.reminder > 0 && i(this.op.reminder);
                var v = {
                    en: "This website would like to remind you: Your browser (%s) is <b>out of date</b>. <a%s>Update your browser</a> for more security, comfort and the best experience on this site.",
                    de:
                        "Sie verwenden einen <b>veralteten Browser</b> (%s) mit <b>Sicherheitsschwachstellen</b> und <b>k&ouml;nnen nicht alle Funktionen dieser Webseite nutzen</b>. <a%s>Hier erfahren Sie, wie einfach Sie Ihren Browser aktualisieren k&ouml;nnen</a>.",
                    it: "Il tuo browser (%s) <b>non è aggiornato</b>. Ha delle <b>falle di sicurezza</b> e potrebbe <b>non visualizzare correttamente</b> le pagine di questo e altri siti. <a%s>Aggiorna il tuo browser</a>!",
                    pl:
                        "Przeglądarka (%s), której używasz, jest przestarzała. Posiada ona udokumentowane <b>luki bezpieczeństwa, inne wady</b> oraz <b>ograniczoną funkcjonalność</b>. Tracisz możliwość skorzystania z pełni możliwości oferowanych przez niektóre strony internetowe. <a%s>Dowiedz się jak zaktualizować swoją przeglądarkę</a>.",
                    es:
                        "Su navegador (%s) <b>no está actualizado</b>. Tiene <b>fallos de seguridad</b> conocidos y podría <b>no mostrar todas las características</b> de este y otros sitios web. <a%s>Averigüe cómo actualizar su navegador.</a>",
                    nl: "Uw browser (%s) is <b>oud</b>. Het heeft bekende <b>veiligheidsissues</b> en kan <b>niet alle mogelijkheden</b> weergeven van deze of andere websites. <a%s>Lees meer over hoe uw browser te upgraden</a>",
                    pt: "Seu navegador (%s) está <b>desatualizado</b>. Ele possui <b>falhas de segurança</b> e pode <b>apresentar problemas</b> para exibir este e outros websites. <a%s>Veja como atualizar o seu navegador</a>",
                    sl: "Vaš brskalnik (%s) je <b>zastarel</b>. Ima več <b>varnostnih pomankljivosti</b> in morda <b>ne bo pravilno prikazal</b> te ali drugih strani. <a%s>Poglejte kako lahko posodobite svoj brskalnik</a>",
                    ru: "Ваш браузер (%s) <b>устарел</b>. Он имеет <b>уязвимости в безопасности</b> и может <b>не показывать все возможности</b> на этом и других сайтах. <a%s>Узнайте, как обновить Ваш браузер</a>",
                    id:
                        "Browser Anda (%s) sudah <b>kedaluarsa</b>. Browser yang Anda pakai memiliki <b>kelemahan keamanan</b> dan mungkin <b>tidak dapat menampilkan semua fitur</b> dari situs Web ini dan lainnya. <a%s> Pelajari cara memperbarui browser Anda</a>",
                    uk: "Ваш браузер (%s) <b>застарів</b>. Він <b>уразливий</b> й може <b>не відображати всі можливості</b> на цьому й інших сайтах. <a%s>Дізнайтесь, як оновити Ваш браузер</a>",
                    ko: "지금 사용하고 계신 브라우저(%s)는 <b>오래되었습니다.</b> 알려진 <b>보안 취약점</b>이 존재하며, 새로운 웹 사이트가 <b>깨져 보일 수도</b> 있습니다. <a%s>브라우저를 어떻게 업데이트하나요?</a>",
                    rm:
                        "Tes navigatur (%s) è <b>antiquà</b>. El cuntegna <b>problems da segirezza</b> enconuschents e mussa eventualmain <b>betg tut las funcziuns</b> da questa ed autras websites. <a%s>Emprenda sco actualisar tes navigatur</a>.",
                    jp: "お使いのブラウザ「%s」は、<b>時代遅れ</b>のバージョンです。既知の<b>脆弱性</b>が存在するばかりか、<b>機能不足</b>によって、サイトが正常に表示できない可能性があります。 <a%s>ブラウザを更新する方法を確認する</a>",
                    fr:
                        "Votre navigateur (%s) est <b>périmé</b>. Il contient des <b>failles de sécurité</b> et pourrait <b>ne pas afficher certaines fonctionnalités</b> des sites internet récents. <a%s>Découvrez comment mettre votre navigateur à jour</a>",
                    da: "Din browser (%s) er <b>for&aelig;ldet</b>. Den har kendte <b>sikkerhedshuller</b> og kan m&aring;ske <b>ikke vise alle funktioner</b> p&aring; dette og andre websteder. <a%s>Se hvordan du opdaterer din browser</a>",
                    sq:
                        "Shfletuesi juaj (%s) është <b>ca i vjetër</b>. Ai ka <b>të meta sigurie</b> të njohura dhe mundet të <b>mos i shfaqë të gjitha karakteristikat</b> e kësaj dhe shumë faqeve web të tjera. <a%s>Mësoni se si të përditësoni shfletuesin tuaj</a>",
                    ca: "El teu navegador (%s) està <b>desactualitzat</b>. Té <b>vulnerabilitats</b> conegudes i pot <b>no mostrar totes les característiques</b> d'aquest i altres llocs web. <a%s>Aprèn a actualitzar el navegador</a>",
                    fa:
                        "مرورگر شما (%s) <b>از رده خارج شده</b> می باشد. این مرورگر دارای <b>مشکلات امنیتی شناخته شده</b> می باشد و <b>نمی تواند تمامی ویژگی های این</b> وب سایت و دیگر وب سایت ها را به خوبی نمایش دهد. <a%s>در خصوص گرفتن راهنمایی درخصوص نحوه ی به روز رسانی مرورگر خود اینجا کلیک کنید.</a>",
                    sv: "Din webbläsare (%s) är <b>föråldrad</b>. Den har kända <b>säkerhetshål</b> och <b>kan inte visa alla funktioner korrekt</b> på denna och på andra webbsidor. <a%s>Uppdatera din webbläsare idag</a>",
                    hu:
                        "Az Ön böngészője (%s) <b>elavult</b>. Ismert <b>biztonsági hiányosságai</b> vannak és esetlegesen <b>nem tud minden funkciót megjeleníteni</b> ezen vagy más weboldalakon. <a%s>Itt talál bővebb információt a böngészőjének frissítésével kapcsolatban</a>\t\t ",
                    gl:
                        "O seu navegador (%s) está <b>desactualizado</b>. Ten coñecidos <b>fallos de seguranza</b> e podería <b>non mostrar tódalas características</b> deste e outros sitios web. <a%s>Aprenda como pode actualizar o seu navegador</a>",
                    cs: "Váš prohlížeč (%s) je <b>zastaralý</b>. Jsou známy <b>bezpečnostní rizika</b> a možná <b>nedokáže zobrazit všechny prvky</b> této a dalších webových stránek. <a%s>Naučte se, jak aktualizovat svůj prohlížeč</a>",
                    he: "הדפדפן שלך (%s) <b>אינו מעודכן</b>. יש לו <b>בעיות אבטחה ידועות</b> ועשוי <b>לא להציג את כל התכונות</b> של אתר זה ואתרים אחרים. <a%s>למד כיצד לעדכן את הדפדפן שלך</a>",
                    nb: "Nettleseren din (%s) er <b>utdatert</b>. Den har kjente <b>sikkerhetshull</b> og <b>kan ikke vise alle funksjonene</b> på denne og andre websider. <a%s>Lær hvordan du kan oppdatere din nettleser</a>",
                    "zh-tw": "您的瀏覽器(%s) 需要更新。該瀏覽器有諸多安全漏洞，無法顯示本網站的所有功能。 <a%s>瞭解如何更新瀏覽器</a>",
                    zh: "您的浏览器(%s) 需要更新。该浏览器有诸多安全漏洞，无法显示本网站的所有功能。 <a%s>了解如何更新浏览器</a>",
                    fi: "Selaimesi (%s) on <b>vanhentunut</b>. Siinä on tunnettuja tietoturvaongelmia eikä se välttämättä tue kaikkia ominaisuuksia tällä tai muilla sivustoilla. <a%s>Lue lisää siitä kuinka päivität selaimesi</a>.",
                    tr:
                        "Tarayıcınız (%s) <b>güncel değil</b>. Eski versiyon olduğu için <b>güvenlik açıkları</b> vardır ve görmek istediğiniz bu web sitesinin ve diğer web sitelerinin <b>tüm özelliklerini hatasız bir şekilde</b> gösteremeyecektir. <a%s>Tarayıcınızı nasıl güncelleyebileceğinizi öğrenin</a>",
                    ro:
                        "Browser-ul (%s) tau este <b>invechit</b>. Detine <b>probleme de securitate</b> cunoscute si poate <b>sa nu afiseze corect</b> toate elementele acestui si altor site-uri. <a%s>Invata cum sa-ti actualizezi browserul.</a>",
                    bg: "Вашият браузър (%s) <b>не е актуален</b>. Известно е, че има <b>пропуски в сигурността</b> и може <b>да не покаже правилно</b> този или други сайтове. <a%s>Научете как да актуализирате браузъра си</a>.",
                    el: "Αυτός ο ιστότοπος σας υπενθυμίζει: Ο φυλλομετρητής σας (%s) είναι <b>παρωχημένος</b>. <a%s>Ενημερώστε το πρόγραμμα περιήγησής σας</a> για μεγαλύτερη ασφάλεια και άνεση σε αυτήν την ιστοσελίδα.",
                    ar: "متصفحك (%s) <b>منتهى الصلاحيه</b>. ويوجد به <b>ثغرات امنية</b> معروفة وقد <b>لا يُشغل كثير من الميزات</b> المتعلقه بهذه الموقع. <a%s>أضغط هنا</a>لتعرف كيف تقوم بتحديث متصفحك",
                    sr: "Vaš pretraživač (%s) je <b>zastareo</b>. Ima poznate <b>sigurnosne probleme</b> i najverovatnije <b>neće prikazati sve funkcionalnisti</b> ovog i drugih sajtova. <a%s>Nauči više o nadogradnji svog pretraživača</a>",
                    la: "Mēs vēlamies Jums atgādināt: Jūsu pārlūkprogramma (%s) ir novecojusi. <a>Atjauniniet savu pārlūkprogrammu</a>, lai uzlabotu drošību, ātrumu un pārlūkošanas ērtības šajā un citās lapās.",
                    ga:
                        "Tá an líonléitheoir agat (%s) <b>as dáta</b>. Tá <b>laigeachtaí slándála</b> a bhfuil ar eolas ann agus b'fhéidir <b>nach taispeánfaidh sé gach gné</b> den suíomh gréasáin seo ná cinn eile. <a%s>Foghlaim conas do líonléitheoir a nuashonrú</a>",
                    lv: "Jūsu pārlūkprogramma (%s) ir <b>novecojusi</b>.  Tai ir zināmas <b>drošības problēmas</b>, un tā var attēlot šo un citas  tīmekļa lapas <b>nekorekti</b>. <a%s>Uzzini, kā atjaunot savu pārlūkprogrammu</a>",
                    no: "Dette nettstedet ønsker å minne deg på: Din nettleser (%s) er <b>utdatert</b>. <a%s>Oppdater nettleseren din </a> for mer sikkerhet, komfort og den beste opplevelsen på denne siden.",
                    th: "เว็บไซต์นี้อยากจะเตือนคุณ: เบราว์เซอร์ (%s) ของคุณนั้น <b>ล้าสมัยแล้ว</b> <a%s>ปรับปรุงเบราว์เซอร์ของคุณ</a> เพื่อเพิ่ม ความปลอดภัย ความสะดวกสบายและประสบการณ์ที่ดีที่สุดในเว็บไซต์นี้",
                };
                v = t.text ? t.text : t["text_" + l] ? t["text_" + l] : v[l] ? v[l] : v.en;
                var b = "";
                this.op.newwindow && (b = ' target="_blank"'), (this.op.text = a(v, m.t, ' id="buorgul" href="' + this.op.url + '"' + b));
                var w = document.createElement("div");
                (this.op.div = w), (w.id = "buorg"), (w.className = "buorg");
                var y =
                    "<style>.buorg {position:absolute;position:fixed;z-index:111111;width:100%; top:0px; left:0px;border-bottom:1px solid #A29330;background:#FDF2AB no-repeat 14px center url(//browser-update.org/img/small/" +
                    m.n +
                    ".png);text-align:left; cursor:pointer;font: 13px Arial,sans-serif;color:#000;}.buorg div { padding:5px 36px 5px 40px; }.buorg>div>a,.buorg>div>a:visited{color:#E25600; text-decoration: underline;}#buorgclose{position:absolute;right:6px;top:0px;height:20px;width:12px;font:18px bold;padding:0;}#buorga{display:block;}#buorgcc{display:block;position:absolute; top:-99999px;}@media only screen and (max-width: 700px){.buorg div { padding:5px 15px 5px 9px; }}</style>";
                (w.innerHTML = "<div>" + this.op.text + '<div id="buorgclose"><a id="buorga"><span id="buorgcc">Close</span><span aria-hiden="true">&times;</span></a></div></div>' + y),
                    document.body.insertBefore(w, document.body.firstChild);
                var _ = this;
                w.onclick = function () {
                    return _.op.newwindow ? window.open(_.op.url, "_blank") : (window.location.href = _.op.url), i(_.op.reminderClosed), _.op.onclick(_.op), !1;
                };
                try {
                    document.getElementById("buorgul").onclick = function (t) {
                        return (t = t || window.event).stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0), _.op.onclick(_.op), !0;
                    };
                } catch (t) {}
                var k = document.getElementsByTagName("html")[0] || document.body;
                (this.op.bodymt = k.style.marginTop),
                    (k.style.marginTop = w.clientHeight + "px"),
                    (function (t) {
                        document.getElementById("buorga").onclick = function (e) {
                            return (e = e || window.event).stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0), (t.op.div.style.display = "none"), (k.style.marginTop = t.op.bodymt), t.op.onclose(t.op), i(t.op.reminderClosed), !0;
                        };
                    })(_),
                    t.onshow(this.op);
            }
    },
    $buoop = $buoop || {};
$buo($buoop),
    (psLib.Init = function (t) {
        "string" != typeof t && (t = "body"),
            psLib.SetScreen(),
            psLib.CheckCompatibility(),
            psLib.TableStripes(t),
            psLib.FormResources(t),
            psLib.Loading(t),
            psLib.Notify(t),
            psLib.Organism(t),
            void 0 !== psLib.Menu && psLib.Menu(t),
            void 0 !== psLib.Tooltip && psLib.Tooltip(t),
            void 0 !== psLib.Popover && psLib.Popover(t),
            void 0 !== psLib.Tabs && psLib.Tabs(t),
            void 0 !== psLib.Accordion && psLib.Accordion(t),
            void 0 !== psLib.Wizard && psLib.Wizard(t),
            void 0 !== psLib.Modal && psLib.Modal(t),
            void 0 !== psLib.Carousel && psLib.Carousel(t),
            void 0 !== psLib.Sharer && psLib.Sharer(t),
            void 0 !== psLib.Chart && psLib.Chart(t),
            void 0 !== psLib.DataGrid && psLib.DataGrid(t),
            void 0 !== psLib.ScrollBar && psLib.ScrollBar(t),
            void 0 !== psLib.Cards && psLib.Cards(t),
            void 0 !== psLib.Video && psLib.Video(t);
    }),
    $(psLib.Init);
//# sourceMappingURL=ps-lib.core-min.js.map
