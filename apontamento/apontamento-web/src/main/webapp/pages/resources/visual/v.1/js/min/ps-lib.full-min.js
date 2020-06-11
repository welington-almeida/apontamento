function $bu_getBrowser(t) {
    var e,
        i,
        s = t || navigator.userAgent,
        n = !1,
        a = { i: "Internet Explorer", e: "Edge", f: "Firefox", o: "Opera", s: "Safari", n: "Netscape", c: "Chrome", a: "Android Browser", y: "Yandex Browser", v: "Vivaldi", x: "Other" };
    if (
        /bot|googlebot|facebook|SMART-TV|Dorado|slurp|wii|Opera Mini|silk|maxthon|SmartTV|maxton|mediapartners|dolfin|dolphin|adsbot|silk|bingbot|google web preview|chromeframe|seamonkey|opera mini|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|epiphany|konqueror|rekonq|symbian|webos|coolnovo|blackberry|bb10|RIM|PlayBook|PaleMoon|QupZilla|Otter|Midori|qutebrowser/i.test(
            s
        )
    )
        return { n: "x", v: 0, t: "unknown", donotnotify: "niche browser" };
    if (/iphone|ipod|ipad|kindle/i.test(s)) return { n: "x", v: 0, t: "mobile browser", donotnotify: "mobile" };
    for (
        var o = /iphone|ipod|ipad|android|mobile|phone|ios|iemobile/i.test(s),
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
        if (s.match(new RegExp(r[l][0].replace("VV", "(\\d+\\.?\\d?)")), "i")) {
            e = r[l][1];
            break;
        }
    var d = parseFloat(RegExp.$1);
    if (!e) return { n: "x", v: 0, t: a[e], mobile: o };
    if (-1 < s.indexOf("Android")) {
        var c = parseInt((/WebKit\/([0-9]+)/i.exec(s) || 0)[1], 10) || 2e3;
        return c <= 534 ? { n: "a", v: c, t: a.a, mob: !0, donotnotify: n, mobile: o } : { n: e, v: d, t: a[e] + " " + d, donotnotify: "mobile on android", mobile: o };
    }
    return (
        /windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(s) && (n = "oldOS"),
        "f" != e || (38 != Math.round(d) && 45 != Math.round(d)) || (n = "ESR"),
        "so" == e && ((d = 4), (e = "s")),
        "i" == e && 7 == d && window.XDomainRequest && (d = 8),
        "io" == e && ((e = "i"), (d = 6 < d ? 11 : 5 < d ? 10 : 4 < d ? 9 : 3.1 < d ? 8 : 3 < d ? 7 : 9)),
        "e" == e ? { n: "i", v: d, t: a[e] + " " + d, donotnotify: n, mobile: o } : { n: e, v: d, t: a[e] + " " + d, donotnotify: n, mobile: o }
    );
}
!(function (t, e, i) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? (module.exports = t(require("jquery"))) : t(e || i);
})(
    function (l) {
        var r = function (a, b, w) {
            "object" == typeof b && (b = b.mask);
            var y = {
                invalid: [],
                getCaret: function () {
                    try {
                        var t,
                            e = 0,
                            i = a.get(0),
                            s = document.selection,
                            n = i.selectionStart;
                        return s && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((t = s.createRange()).moveStart("character", -y.val().length), (e = t.text.length)) : (n || "0" === n) && (e = n), e;
                    } catch (t) {}
                },
                setCaret: function (t) {
                    try {
                        if (a.is(":focus")) {
                            var e,
                                i = a.get(0);
                            i.setSelectionRange ? i.setSelectionRange(t, t) : ((e = i.createTextRange()).collapse(!0), e.moveEnd("character", t), e.moveStart("character", t), e.select());
                        }
                    } catch (t) {}
                },
                events: function () {
                    a.on("keydown.mask", function (t) {
                        a.data("mask-keycode", t.keyCode || t.which), a.data("mask-previus-value", a.val());
                    })
                        .on(l.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", y.behaviour)
                        .on("paste.mask drop.mask", function () {
                            setTimeout(function () {
                                a.keydown().keyup();
                            }, 100);
                        })
                        .on("change.mask", function () {
                            a.data("changed", !0);
                        })
                        .on("blur.mask", function () {
                            o === y.val() || a.data("changed") || a.trigger("change"), a.data("changed", !1);
                        })
                        .on("blur.mask", function () {
                            o = y.val();
                        })
                        .on("focus.mask", function (t) {
                            !0 === w.selectOnFocus && l(t.target).select();
                        })
                        .on("focusout.mask", function () {
                            w.clearIfNotMatch && !r.test(y.val()) && y.val("");
                        });
                },
                getRegexMask: function () {
                    for (var t = [], e, i, s, n, a, o, r = 0; r < b.length; r++)
                        (e = k.translation[b.charAt(r)])
                            ? ((i = e.pattern.toString().replace(/.{1}$|^.{1}/g, "")), (s = e.optional), (n = e.recursive) ? (t.push(b.charAt(r)), (a = { digit: b.charAt(r), pattern: i })) : t.push(s || n ? i + "?" : i))
                            : t.push(b.charAt(r).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    return (o = t.join("")), a && (o = o.replace(new RegExp("(" + a.digit + "(.*" + a.digit + ")?)"), "($1)?").replace(new RegExp(a.digit, "g"), a.pattern)), new RegExp(o);
                },
                destroyEvents: function () {
                    a.off(["input", "keydown", "keyup", "paste", "drop", "blur", "focusout", ""].join(".mask "));
                },
                val: function (t) {
                    var e,
                        i = a.is("input") ? "val" : "text",
                        s;
                    return (s = 0 < arguments.length ? (a[i]() !== t && a[i](t), a) : a[i]());
                },
                calculateCaretPosition: function (t, e) {
                    var i = e.length,
                        s = a.data("mask-previus-value") || "",
                        n = s.length;
                    return 8 === a.data("mask-keycode") && s !== e ? (t -= e.slice(0, t).length - s.slice(0, t).length) : s !== e && (n <= t ? (t = i) : (t += e.slice(0, t).length - s.slice(0, t).length)), t;
                },
                behaviour: function (t) {
                    (t = t || window.event), (y.invalid = []);
                    var e = a.data("mask-keycode");
                    if (-1 === l.inArray(e, k.byPassKeys)) {
                        var i = y.getMasked(),
                            s = y.getCaret();
                        return (
                            setTimeout(
                                function (t, e) {
                                    y.setCaret(y.calculateCaretPosition(t, e));
                                },
                                10,
                                s,
                                i
                            ),
                            y.val(i),
                            y.setCaret(s),
                            y.callbacks(t)
                        );
                    }
                },
                getMasked: function (t, e) {
                    var i = [],
                        s = void 0 === e ? y.val() : e + "",
                        n = 0,
                        a = b.length,
                        o = 0,
                        r = s.length,
                        l = 1,
                        d = "push",
                        c = -1,
                        h,
                        u,
                        p;
                    for (
                        u = w.reverse
                            ? ((d = "unshift"),
                              (l = -1),
                              (h = 0),
                              (n = a - 1),
                              (o = r - 1),
                              function () {
                                  return -1 < n && -1 < o;
                              })
                            : ((h = a - 1),
                              function () {
                                  return n < a && o < r;
                              });
                        u();

                    ) {
                        var f = b.charAt(n),
                            g = s.charAt(o),
                            m = k.translation[f];
                        m
                            ? (g.match(m.pattern)
                                  ? (i[d](g), m.recursive && (-1 === c ? (c = n) : n === h && (n = c - l), h === c && (n -= l)), (n += l))
                                  : g === p
                                  ? (p = void 0)
                                  : m.optional
                                  ? ((n += l), (o -= l))
                                  : m.fallback
                                  ? (i[d](m.fallback), (n += l), (o -= l))
                                  : y.invalid.push({ p: o, v: g, e: m.pattern }),
                              (o += l))
                            : (t || i[d](f), g === f ? (o += l) : (p = f), (n += l));
                    }
                    var v = b.charAt(h);
                    return a !== r + 1 || k.translation[v] || i.push(v), i.join("");
                },
                callbacks: function (t) {
                    var e = y.val(),
                        i = e !== o,
                        s = [e, t, a, w],
                        n = function (t, e, i) {
                            "function" == typeof w[t] && e && w[t].apply(this, i);
                        };
                    n("onChange", !0 === i, s), n("onKeyPress", !0 === i, s), n("onComplete", e.length === b.length, s), n("onInvalid", 0 < y.invalid.length, [e, t, a, y.invalid, w]);
                },
            };
            a = l(a);
            var k = this,
                o = y.val(),
                r;
            (b = "function" == typeof b ? b(y.val(), void 0, a, w) : b),
                (k.mask = b),
                (k.options = w),
                (k.remove = function () {
                    var t = y.getCaret();
                    return y.destroyEvents(), y.val(k.getCleanVal()), y.setCaret(t), a;
                }),
                (k.getCleanVal = function () {
                    return y.getMasked(!0);
                }),
                (k.getMaskedVal = function (t) {
                    return y.getMasked(!1, t);
                }),
                (k.init = function (t) {
                    if (
                        ((t = t || !1),
                        (w = w || {}),
                        (k.clearIfNotMatch = l.jMaskGlobals.clearIfNotMatch),
                        (k.byPassKeys = l.jMaskGlobals.byPassKeys),
                        (k.translation = l.extend({}, l.jMaskGlobals.translation, w.translation)),
                        (k = l.extend(!0, {}, k, w)),
                        (r = y.getRegexMask()),
                        t)
                    )
                        y.events(), y.val(y.getMasked());
                    else {
                        w.placeholder && a.attr("placeholder", w.placeholder), a.data("maskcfg") && a.attr("autocomplete", "off");
                        for (var e = 0, i = !0; e < b.length; e++) {
                            var s = k.translation[b.charAt(e)];
                            if (s && s.recursive) {
                                i = !1;
                                break;
                            }
                        }
                        i && a.attr("maxlength", b.length), y.destroyEvents(), y.events();
                        var n = y.getCaret();
                        y.val(y.getMasked()), y.setCaret(n);
                    }
                }),
                k.init(!a.is("input"));
        };
        l.maskWatchers = {};
        var i = function () {
                var t = l(this),
                    e = {},
                    i = "data-maskcfg-",
                    s = t.attr("data-maskcfg");
                if ((t.attr(i + "reverse") && (e.reverse = !0), t.attr(i + "clearifnotmatch") && (e.clearIfNotMatch = !0), "true" === t.attr(i + "selectonfocus") && (e.selectOnFocus = !0), d(t, s, e)))
                    return t.data("maskcfg", new r(this, s, e));
            },
            d = function (t, e, i) {
                i = i || {};
                var s = l(t).data("maskcfg"),
                    n = JSON.stringify,
                    a = l(t).val() || l(t).text();
                try {
                    return "function" == typeof e && (e = e(a)), "object" != typeof s || n(s.options) !== n(i) || s.mask !== e;
                } catch (t) {}
            },
            t = function (t) {
                var e = document.createElement("div"),
                    i;
                return (i = (t = "on" + t) in e) || (e.setAttribute(t, "return;"), (i = "function" == typeof e[t])), (e = null), i;
            };
        (l.fn.mask = function (t, e) {
            e = e || {};
            var i = this.selector,
                s = l.jMaskGlobals,
                n = s.watchInterval,
                a = e.watchInputs || s.watchInputs,
                o = function () {
                    if (d(this, t, e)) return l(this).data("maskcfg", new r(this, t, e));
                };
            return (
                l(this).each(o),
                i &&
                    "" !== i &&
                    a &&
                    (clearInterval(l.maskWatchers[i]),
                    (l.maskWatchers[i] = setInterval(function () {
                        l(document).find(i).each(o);
                    }, n))),
                this
            );
        }),
            (l.fn.masked = function (t) {
                return this.data("maskcfg").getMaskedVal(t);
            }),
            (l.fn.unmask = function () {
                return (
                    clearInterval(l.maskWatchers[this.selector]),
                    delete l.maskWatchers[this.selector],
                    this.each(function () {
                        var t;
                        l(this).data("maskcfg") && l(this).removeData("maskcfg");
                    })
                );
            }),
            (l.fn.cleanVal = function () {
                return this.data("maskcfg").getCleanVal();
            }),
            (l.applyDataMask = function (t) {
                var e;
                ((t = t || l.jMaskGlobals.maskElements) instanceof l ? t : l(t)).filter(l.jMaskGlobals.dataMaskAttr).each(i);
            });
        var e = {
            maskElements: "input,td,span,div",
            dataMaskAttr: "*[data-maskcfg]",
            dataMask: !0,
            watchInterval: 300,
            watchInputs: !0,
            useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && t("input"),
            watchDataMask: !1,
            byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
            translation: { 0: { pattern: /\d/ }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, recursive: !0 }, A: { pattern: /[a-zA-Z0-9]/ }, S: { pattern: /[a-zA-Z]/ } },
        };
        (l.jMaskGlobals = l.jMaskGlobals || {}),
            (e = l.jMaskGlobals = l.extend(!0, {}, e, l.jMaskGlobals)).dataMask && l.applyDataMask(),
            setInterval(function () {
                l.jMaskGlobals.watchDataMask && l.applyDataMask();
            }, e.watchInterval);
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
            if ((990 < t && (psLib.IsDesktop = !0), 1206 < t && (psLib.IsHD = !0), psLib.DetectMobile(navigator.userAgent) && (psLib.IsMobile = !0), psLib.DetectTablet(navigator.userAgent))) {
                var e = window.matchMedia("(orientation: portrait)").matches;
                (psLib.IsTablet = !0),
                    (psLib.IsTabletPortrait = !!e),
                    window.addEventListener("orientationchange", function () {
                        0 == screen.orientation.angle ? (psLib.IsTabletPortrait = !0) : (psLib.IsTabletPortrait = !1);
                    });
            }
            (-1 < navigator.appVersion.indexOf("MSIE 10") || -1 < navigator.appVersion.indexOf("MSIE 9") || -1 < navigator.appVersion.indexOf("MSIE 8")) &&
                ((psLib.IsMobile = !1), (psLib.IsTablet = !1), (psLib.IsDesktop = !0), (psLib.IsHD = !1), (psLib.IsOldIE = !0)),
                -1 < navigator.appVersion.indexOf("MSIE 8") && $("html").addClass("lt-ie9");
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
                        s = 0 == t.next(".ps-frm-multiselect-change").length,
                        n = t.is(".ps-frm-valid"),
                        a = !(!n || void 0 === t.data("onerror")) && t.data("onerror"),
                        o = t.is(":disabled"),
                        r = { title: e, isValid: n, onError: a },
                        l,
                        d;
                    t.removeData("onerror"), void 0 !== t.attr("id") ? (d = l = t.attr("id")) : ((d = "psLib-select-" + (l = Math.floor(100 * Math.random()))), t.attr("id", d));
                    var c = "psLib-ModalMultiple-" + l.toString(),
                        h = "psLib-ListMultiple-" + l.toString();
                    s && t.after("<div class='ps-frm-multiselect-change " + (n ? "ps-frm-valid" : "") + " " + (o ? "ps-frm-disabled" : "") + "' id='" + h + "' " + (a ? "data-onerror='" + a + "'" : "") + "></div>"),
                        t.data({ multiselectmodal: c, multiselectlist: h }),
                        psLib.FormMultiSelectCreateContent(h, c, d, l, s, r);
                })
                .off("change.pslib")
                .on("change.pslib", function () {
                    var t = $(this),
                        e = t.attr("id"),
                        i = t.data("multiselectlist"),
                        s = t.data("multiselectmodal"),
                        n;
                    t.find("option").each(function () {
                        var t = $(this),
                            e = t.is(":selected");
                        $("#" + s)
                            .find("input[value='" + t.val() + "']")
                            .prop("checked", e);
                    }),
                        psLib.FormMultiSelectConfig(e, s, i);
                }),
                $(".ps-frm-valid[data-onerror]").each(function () {
                    var t = $(this),
                        e = t.attr("data-onerror"),
                        i = -1 < e.indexOf("clone:");
                    if ((void 0 === t.data("guideinitialized") || "null" == typeof t.data("guideinitialized") || "false" == t.data("guideinitialized")) && !t.is(".ps-frm-multiselect")) {
                        i && ((e = e.replace("clone:", "")), (e = $(e).clone().html()));
                        var s =
                                "ps-frm-ctt-error-" +
                                Math.random()
                                    .toString(36)
                                    .replace(/[^a-z]+/g, "")
                                    .substr(0, 5),
                            n = '\t\t\t\t<div style="display:none;" class="ps-frm-ctt-error" id="' + s + '">';
                        i || (n += '\t\t\t\t\t<div class="ps-panel ps-panel-ico ps-panel-error">\t\t\t\t\t\t <div class="ps-panel-ctt">\t\t\t\t\t\t\t<span class="ps-ico ps-ico-alert"></span>'),
                            (n += e),
                            i || (n += "\t\t\t\t\t\t </div>\t\t\t\t\t</div>"),
                            (n += "\t\t\t\t</div>"),
                            $(this).data("onerror", "#" + s),
                            psLib.IsMobile
                                ? t.prev().is(".ps-frm-lbl-internal")
                                    ? t.prev().prev().is(".ps-frm-ctt-error") || t.prev().before(n)
                                    : t.is(".ps-frm-multiselect-change") && t.prev().prev().is(".ps-frm-lbl-internal")
                                    ? t.prev().prev().prev().is(".ps-frm-ctt-error") || t.prev().prev().before(n)
                                    : t.parent().is(".ps-frm-select")
                                    ? t.parent().before(n)
                                    : t.prev().is(".ps-frm-ctt-error") || t.before(n)
                                : t.parent().is(".ps-frm-select")
                                ? t.parent().after(n)
                                : t.after().is(".ps-frm-ctt-error") || t.after(n);
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
                        var s = new Date(e[2], parseInt(e[1]) - 1, e[0]);
                        "" == e || (parseInt(e[0]) == parseInt(s.getDate()) && parseInt(e[1]) == parseInt(s.getMonth()) + 1) || ((i = !1), psLib.IsOldIE && e == t.attr("placeholder") && (i = !0)), psLib.FormShowFieldError(this, i);
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
                            (35 <= t.keyCode && t.keyCode <= 39) ||
                            (!t.shiftKey && ((48 <= t.keyCode && t.keyCode <= 57) || (96 <= t.keyCode && t.keyCode <= 105))) ||
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
                            for (var i = 1, s = t.length; i < s; i++)
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
                    -1 < source.indexOf("function:")
                        ? (config.source = eval("(window." + source.replace("function:", "") + ")"))
                        : -1 < source.indexOf("remote:")
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
                                            s = new Date(i).setHours(24),
                                            n = "",
                                            a = 0;
                                        if (void 0 !== this.getAttribute("min")) {
                                            for (var o = this.getAttribute("min"), r = 0, l = (o = o.split("-")).length; r < l; r++) o[r] = parseInt(o[r]);
                                            var d = new Date(o[0], o[1] - 1, o[2]);
                                            s < d && (alert("Data invÃ¡lida, a data mÃ­nima permitida Ã© " + $.datepicker.formatDate("dd/mm/yy", d)), a++);
                                        }
                                        if (void 0 !== this.getAttribute("max")) {
                                            for (var c = this.getAttribute("max"), r = 0, l = (c = c.split("-")).length; r < l; r++) c[r] = parseInt(c[r]);
                                            var h = new Date(c[0], c[1] - 1, c[2]);
                                            h < s && (alert("Data invÃ¡lida, a data mÃ¡xima permitida Ã© " + $.datepicker.formatDate("dd/mm/yy", h)), a++);
                                        }
                                        0 < a ? t.addClass("ps-frm-error") : t.removeClass("ps-frm-error"), (n = (i = i.split("-"))[2] + "/" + i[1] + "/" + i[0]), e.val(n).trigger("change");
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
                            s = e.data("calendarmindate"),
                            n = e.data("calendarmaxdate"),
                            a = !0;
                        if (("blur" == t.type && psLib.IsMobile) || ("change" == t.type && !psLib.IsMobile)) {
                            i = psLib.IsMobile ? i.split("-") : i.split("/");
                            var o = psLib.IsMobile ? new Date(i[0], parseInt(i[1]) - 1, i[2]) : new Date(i[2], parseInt(i[1]) - 1, i[0]);
                            if ("" != i) {
                                if (
                                    (((!psLib.IsMobile || (parseInt(i[2]) == parseInt(o.getDate()) && parseInt(i[1]) == parseInt(o.getMonth()) + 1)) &&
                                        (psLib.IsMobile || (parseInt(i[0]) == parseInt(o.getDate()) && parseInt(i[1]) == parseInt(o.getMonth()) + 1))) ||
                                        ((a = !1), psLib.IsOldIE && i == e.attr("placeholder") && (a = !0)),
                                    void 0 !== s && -1 < s.indexOf("/"))
                                ) {
                                    s = s.split("/");
                                    var r = new Date(s[2], parseInt(s[1]) - 1, s[0]);
                                    o.getTime() < r.getTime() && (a = !1);
                                }
                                if (void 0 !== n && -1 < n.indexOf("/")) {
                                    n = n.split("/");
                                    var l = new Date(n[2], parseInt(n[1]) - 1, n[0]);
                                    o.getTime() > l.getTime() && (a = !1), console.log(a);
                                }
                            }
                            psLib.FormShowFieldError(this, a);
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
                                    return -1 < $.inArray($.datepicker.formatDate("dd/mm/yy", t), opts) ? [!0, "ps-frm-datepicker-availableDate", ""] : [!1, "", ""];
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
                        0 < opts.length &&
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
                    if (0 < opts.length) {
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
                -1 < window.navigator.appVersion.indexOf("MSIE 8") &&
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
                            var e = $(this).attr("placeholder");
                            void 0 !== e &&
                                "" != e &&
                                ($(this)
                                    .on("focus blur keydown", function (t) {
                                        "focus" == t.type ? this.value == e && $(this).val("") : "blur" == t.type && ("" == $.trim(this.value) ? $(this).val(e) : $(this).removeClass("ps-frm-notFilled"));
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
            return -1 < t.indexOf("/") && (e = (t = t.split("/"))[2] + "-" + t[1] + "-" + t[0]), e;
        },
        FormValidateMail: function (t) {
            var e;
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
        },
        FormValidateCPF: function (t) {
            var e, s;
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
            if (((10 != (s = (10 * e) % 11) && 11 != s) || (s = 0), s != parseInt(t.substring(9, 10)))) return !1;
            for (e = 0, i = 1; i <= 10; i++) e += parseInt(t.substring(i - 1, i)) * (12 - i);
            return (10 != (s = (10 * e) % 11) && 11 != s) || (s = 0), s == parseInt(t.substring(10, 11));
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
            for (tamanho = t.length - 2, numeros = t.substring(0, tamanho), digitos = t.substring(tamanho), soma = 0, pos = tamanho - 7, i = tamanho; 1 <= i; i--) (soma += numeros.charAt(tamanho - i) * pos--), pos < 2 && (pos = 9);
            if (((resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)), resultado != digitos.charAt(0))) return !1;
            for (tamanho += 1, numeros = t.substring(0, tamanho), soma = 0, pos = tamanho - 7, i = tamanho; 1 <= i; i--) (soma += numeros.charAt(tamanho - i) * pos--), pos < 2 && (pos = 9);
            return (resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)), resultado == digitos.charAt(1);
        },
        FormValidatePhone: function (t) {
            var e = !0;
            return (
                "" != (t = t.replace(/\(/g, "").replace(/\)/g, "").replace(/ /g, "").replace(/\./g, "")) &&
                    (-1 < t.indexOf("0000000") ||
                        -1 < t.indexOf("1111111") ||
                        -1 < t.indexOf("2222222") ||
                        -1 < t.indexOf("3333333") ||
                        -1 < t.indexOf("4444444") ||
                        -1 < t.indexOf("5555555") ||
                        -1 < t.indexOf("6666666") ||
                        -1 < t.indexOf("7777777") ||
                        -1 < t.indexOf("8888888") ||
                        -1 < t.indexOf("9999999")) &&
                    (e = !1),
                e
            );
        },
        FormCleanupString: function (t, e) {
            return (
                void 0 === e && (e = !1),
                (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(
                    /[Ã¡Ã Ã¢Ã£Ã¤]/g,
                    "a"
                )).replace(/[ÃÃ€Ã‚ÃƒÃ„]/g, "A")).replace(/[Ã©Ã¨ÃªÃ«]/g, "e")).replace(/[Ã‰ÃˆÃŠÃ‹]/g, "E")).replace(/[Ã­Ã¬Ã®Ã¯]/g, "i")).replace(/[ÃÃŒÃŽÃ]/g, "I")).replace(/[Ã³Ã²Ã´ÃµÃ¶]/g, "o")).replace(/[Ã“Ã’Ã”Ã•Ã–]/g, "O")).replace(
                    /[ÃºÃ¹Ã»Ã¼]/g,
                    "u"
                )).replace(/[ÃšÃ™Ã›Ãœ]/g, "U")).replace(/[Ã§]/g, "c")).replace(/[Ã‡]/g, "C")).replace(/\Ëœ/g, "")).replace(/\`/g, "")).replace(/\;/g, "")).replace(/\'/g, "")).replace(/\//g, "")).replace(/\\/g, "")).replace(
                    /\|/g,
                    ""
                )).replace(/\[/g, "")).replace(/\]/g, "")).replace(/\{/g, "")).replace(/\}/g, "")).replace(/\?/g, "")).replace(/\</g, "")).replace(/\>/g, "")).replace(/\-/g, "")).replace(/\+/g, "")).replace(/\=/g, "")).replace(
                    /\(/g,
                    ""
                )).replace(/\)/g, "")).replace(/\!/g, "")).replace(/\@/g, "")).replace(/\#/g, "")).replace(/\$/g, "")).replace(/\%/g, "")).replace(/\^/g, "")).replace(/\&/g, "")).replace(/\*/g, "")),
                e || (t = t.replace(/\d/g, "")),
                t
            );
        },
        FormShowFieldError: function (t, e) {
            var i = void 0 !== $(t).data("onerror") && $(t).data("onerror"),
                s = $(t).data("onerror");
            e ? ($(t).removeClass("ps-frm-error"), void 0 !== s && $(s).slideUp()) : ($(t).addClass("ps-frm-error"), void 0 !== s && $(s).slideDown());
        },
        FormValidate: function (t, e, i) {
            void 0 === e && (e = !0), void 0 === i && (i = !0);
            var s =
                    "input[type='date']:visible,input[type='text']:visible,input[type='tel']:visible, input[type='number']:visible,input[type='email']:visible,input[type='password']:visible,textarea:visible,select:visible,select.ps-frm-multiselect,input[type='radio']:visible,input[type='checkbox']:visible",
                n = "ps-frm-error",
                a = !0;
            e || (s = "input,textarea,select");
            for (var o = $(s, t), r = 0, l = o.length; r < l; r++) {
                var d = $(o[r]).val(),
                    c = $(o[r]).attr("class"),
                    h = $(o[r]).is("select"),
                    u = $(o[r]).is(":radio"),
                    p = $(o[r]).is(":checkbox");
                if (void 0 !== c && !$(o[r]).is(":disabled")) {
                    if ((h && (d = $("option:selected", o[r]).val()), u || p)) {
                        var f = $(o[r]).attr("name");
                        d = void 0 !== $("input[name='" + f + "']:checked").val() ? $("input[name='" + f + "']:checked").val() : "";
                    }
                    if (c.match(/ps-frm-error/i)) a = !1;
                    else if (c.match(/ps-frm-valid/i))
                        if (h && $(o[r]).is(".ps-frm-multiselect") && 0 == d) {
                            var g = "#" + $(o[r]).data("multiselectlist"),
                                d = $("option:selected", o[r]).length;
                            $(o[r])
                                .off("change.pslib")
                                .on("change.pslib", function (t) {
                                    var e = $(this),
                                        i = e.data("multiselectlist"),
                                        s,
                                        n = !1;
                                    null !== e.val() && (n = !0), psLib.FormShowFieldError(o[r], n), psLib.FormShowFieldError(g, n);
                                }),
                                psLib.FormShowFieldError(o[r], !1),
                                psLib.FormShowFieldError(g, !1);
                        } else
                            "" == d || c.match(/ps-frm-notFilled/i)
                                ? ((a = !1),
                                  h
                                      ? $(o[r])
                                            .off("change.pslib")
                                            .on("change.pslib", function (t) {
                                                $(this).parent().removeClass(n), psLib.FormShowFieldError(this, !0);
                                            })
                                            .parent()
                                            .addClass(n)
                                      : u || p
                                      ? $(o[r])
                                            .off("click.pslib")
                                            .on("click.pslib", function (t) {
                                                var e = $(this).attr("name");
                                                $("input[name='" + e + "']").removeClass(n), psLib.FormShowFieldError(this, !0);
                                            })
                                      : $(o[r])
                                            .off("keyup")
                                            .on("keyup", function (t) {
                                                psLib.FormShowFieldError(this, !0);
                                            }),
                                  psLib.FormShowFieldError(o[r], !1))
                                : ($(o[r]).removeClass(n), psLib.FormShowFieldError(o[r], !0));
                }
            }
            var m = void 0 !== $(t).data("formerrorpanel") && $(t).data("formerrorpanel"),
                v;
            return (
                !a &&
                    i &&
                    (m
                        ? $(m).slideDown(200, function () {
                              (v = $(m).offset()), psLib.ScrollTo(v.top - 32);
                          })
                        : ((v = $("." + n + ":eq(0)").offset()), psLib.ScrollTo(v.top - 32))),
                a && m && $(m).slideUp(200),
                a
            );
        },
        FormMultiSelectCreateListItem: function (t, e, i, s, n) {
            return (
                "<li class='" +
                i +
                "'>\t\t\t\t\t" +
                t +
                "\t\t\t\t\t<a href='javascript:;' \t\t\t\t\t\tclass='ps-frm-multiselect-remove' \t\t\t\t\t\tdata-multiselect='" +
                s +
                "' \t\t\t\t\t\tdata-multiselectmodal='" +
                n +
                "' \t\t\t\t\t\tdata-multiselectvalue='" +
                e +
                "' >\t\t\t\t\t\t<span class='ps-ico ps-ico-close'></span>\t\t\t\t\t</a>\t\t\t\t</li>"
            );
        },
        FormMultiSelectConfig: function (r, l, t) {
            var e = $(".ps-modal-content", "#" + l),
                d = $(".ps-frm-multiselect-selecteditens", "#" + t),
                i = d.parent().find(".ps-btn-multiselect-trigger"),
                s = d.parent().find(".ps-btn-multiselect-addremove"),
                c = $("#" + r),
                h = 0;
            $("input[type='checkbox']", e).each(function () {
                var t = $(this),
                    e = this.id,
                    i = t.val(),
                    s = t.is(":checked"),
                    n = t.data("multiselecttext"),
                    a = $("li." + e, d);
                if (s) {
                    if (0 == a.length) {
                        var o = psLib.FormMultiSelectCreateListItem(n, i, e, r, l);
                        d.append(o), psLib.FormMultiSelectRemove(d);
                    }
                    h++;
                } else 0 < a.length && $(".ps-frm-multiselect-remove", a).trigger("click");
                c.find("option[value='" + i + "']").prop("selected", s);
            }),
                0 < h ? (d.show(), i.hide(), s.show(), psLib.FormShowFieldError("#" + t, !0), psLib.FormShowFieldError("#" + r, !0)) : (d.hide(), i.show(), s.hide());
        },
        FormMultiSelectRemove: function (t) {
            $(".ps-frm-multiselect-remove", t)
                .off("click.pslib")
                .on("click.pslib", function () {
                    var t,
                        e = $(this).data(),
                        i = $(this).parent(),
                        s = i.parent(),
                        n = s.parent().find(".ps-btn-multiselect-trigger"),
                        a = s.parent().find(".ps-btn-multiselect-addremove");
                    $("#" + e.multiselect + " option[value='" + e.multiselectvalue + "']").prop("selected", !1),
                        $("#" + e.multiselectmodal + " input:checkbox[value='" + e.multiselectvalue + "']").prop("checked", !1),
                        i.fadeOut("fast", function () {
                            $(this).remove(), 0 == $("#" + e.multiselect + " option:selected").length ? (a.hide(), n.show()) : (n.hide(), a.show());
                        });
                });
        },
        FormMultiSelectCreateContent: function (t, a, o, r, e, i) {
            var s = $("#" + o + " option"),
                l = "",
                d = "";
            s.each(function () {
                var t = $(this).val(),
                    e = t.replace(/\//g, "-").replace(/\./g, "-").replace(/\|/g, "-").replace(/\#/g, "-"),
                    i = $(this).text(),
                    s = $(this).is(":selected"),
                    n = "ps-frm-chk-" + e + "-" + r;
                (d +=
                    '\t\t\t\t\t<div class="ps-frm-multiselect-label">\t\t\t\t\t\t<input type="checkbox" \t\t\t\t\t\t\tname="ps-frm-chk-multiselect-' +
                    r +
                    '" \t\t\t\t\t\t\tvalue="' +
                    t +
                    '" \t\t\t\t\t\t\tclass="ps-frm-checkbox" \t\t\t\t\t\t\tdata-multiselecttext="' +
                    i +
                    '"\t\t\t\t\t\t\tid="' +
                    n +
                    '" \t\t\t\t\t\t\t' +
                    (s ? "checked" : "") +
                    '\t\t\t\t\t\t\t/>\t\t\t\t\t\t<label \t\t\t\t\t\t\tclass="ps-frm-checkbox" \t\t\t\t\t\t\tfor="' +
                    n +
                    '">' +
                    i +
                    "</label>\t\t\t\t\t</div>"),
                    s && (l += psLib.FormMultiSelectCreateListItem(i, t, n, o, a));
            });
            var n =
                    '\t\t\t\t<div class="ps-modal ps-multiselect-modal" id="' +
                    a +
                    '">\t\t\t\t\t<a href="javascript:;" class="ps-modal-close ps-modal-close-default"><span class="ps-ico ps-ico-sm ps-sm-ico-lg ps-ico-close"></span></a>\t\t\t\t\t<div class="ps-modal-container">\t\t\t\t\t\t<div class="ps-modal-title">\t\t\t\t\t\t\t' +
                    i.title +
                    '\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="ps-modal-content">\t\t\t\t\t\t\t' +
                    d +
                    '\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="ps-modal-foot">\t\t\t\t\t\t\t<div class="ps-mod8 ps-sm-mod4 ps-sm-lspan4">\t\t\t\t\t\t\t\t<a href="javascript:;" class="ps-btn ps-btn-primary ps-modal-close" data-modal="#' +
                    a +
                    '">Selecionar</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>',
                c = "<ul class='ps-frm-multiselect-selecteditens' style='display: none;'>\t\t\t\t\t" + l + "\t\t\t\t</ul>\t\t\t   ",
                h =
                    '\t\t\t\t<a href="javascript:;" \t\t\t\t\tdata-id="' +
                    r +
                    '" \t\t\t\t\tclass="ps-btn ps-btn-multiselect-trigger ps-open-modal" \t\t\t\t\tdata-modal="#' +
                    a +
                    '"\t\t\t\t\tdata-modalonhide="psLib.FormMultiSelectConfig(\'' +
                    o +
                    "','" +
                    a +
                    "','" +
                    t +
                    '\')">\t\t\t\t\tSelecionar\t\t\t\t</a>\t\t\t\t<a href="javascript:;" \t\t\t\t\tdata-id="' +
                    r +
                    '" \t\t\t\t\tclass="ps-btn ps-btn-primary ps-btn-multiselect-addremove ps-open-modal" \t\t\t\t\tdata-modal="#' +
                    a +
                    '"\t\t\t\t\tstyle="display: none;" \t\t\t\t\tdata-modalonhide="psLib.FormMultiSelectConfig(\'' +
                    o +
                    "','" +
                    a +
                    "','" +
                    t +
                    "')\">\t\t\t\t\t...\t\t\t\t</a>";
            e ? ($("body").append(n), $("#" + t).html(c + h)) : ($("ul.ps-frm-multiselect-selecteditens", "#" + t).html(l), $(".ps-modal-content", "#" + a).html(d)),
                "" != l && ($(".ps-btn-multiselect-trigger", "#" + t).hide(), $(".ps-btn-multiselect-addremove", "#" + t).show(), $(".ps-frm-multiselect-selecteditens", "#" + t).show(), psLib.FormMultiSelectRemove("#" + t));
        },
        FormSelectValues2Array: function (t, s) {
            void 0 === s && (s = !0);
            var n = [];
            return (
                !!t.is("select") &&
                ($("option", t).each(function () {
                    var t = $(this).val(),
                        e = $(this).text(),
                        i = $(this).is(":selected");
                    "" != t && (s ? n.push(t) : n.push({ text: e, val: t, isSel: i }));
                }),
                n)
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
                        s = void 0 !== e.data("notifyduration") ? e.data("notifyduration") : 5e3,
                        n = void 0 !== e.data("notifyonshow") && e.data("notifyonshow"),
                        a = void 0 !== e.data("notifyonhide") && e.data("notifyonhide");
                    if (void 0 === i) return !1;
                    psLib.NotifyShowHide(i, s, n, a);
                });
        },
        NotifyShowHide: function (dest, duration, onShow, onHide) {
            var obj,
                notifyCreate = !1;
            if (void 0 === dest || "integer" == typeof dest) return console.warn("NotificaÃ§Ã£o inexistente"), !1;
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
            if (void 0 === obj) return console.warn("ImpossÃ­vel fechar notificaÃ§Ã£o"), !1;
            void 0 === erase && (erase = !1),
                obj.stop(!0, !1).animate({ "margin-bottom": 0 }, 500, function () {
                    void 0 !== $(this).data("notifyonhide") && eval($(this).data("notifyonhide")), erase && obj.remove();
                });
        },
        NotifyCreate: function (t) {
            var e = "",
                i,
                s = "",
                n = "Notify" + new Date().valueOf();
            return (
                (t = 0 == t.indexOf("error:") ? ((s = "ps-notify-error"), t.replace("error:", "")) : 0 == t.indexOf("alert:") ? ((s = "ps-notify-alert"), t.replace("alert:", "")) : t.replace("success:", "")),
                (e +=
                    '<div class="ps-notify ps-caption ps-caption-uppercased ' +
                    s +
                    '" id="' +
                    n +
                    '">\t\t\t\t\t<span class="ps-ico ps-ico-sm ps-ico-alert"></span>\t\t\t\t\t' +
                    t +
                    '\t\t\t\t\t<a href="javascript:;" class="ps-notify-close ps-notify-close-default"><span class="ps-ico ps-ico-xsm ps-ico-close"></span></a>\t\t\t\t</div>'),
                $("body").append(e),
                n
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
                            s = void 0 !== e.data("scrolloffset") ? e.data("scrolloffset") : 0;
                        if ((i = $(i)).length) {
                            var n = i.offset();
                            psLib.ScrollTo(n.top - s);
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
                                var t = 0 < window.scrollY ? window.scrollY : window.pageYOffset;
                                h < t ? top.addClass("ps-site-top-fixed-min") : top.removeClass("ps-site-top-fixed-min");
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
                            var t = 0 < window.scrollY ? window.scrollY : window.pageYOffset,
                                e = objD.offset(),
                                i = objD.outerHeight(),
                                s = e.top + i - $(this).outerHeight();
                            void 0 === t && (t = window.document.documentElement.scrollTop), s <= t && (legalAccept.addClass("ps-legalAccept-enabled"), btn.removeClass("ps-btn-disabled"));
                        });
            }
            fixedScroll.length &&
                (psLib.IsTablet || psLib.IsOldIE
                    ? fixedScroll.each(function () {
                          var e = $(this),
                              i = e.outerWidth(),
                              s = e.offset(),
                              n = void 0 !== e.data("fixedscrolltopoffset") ? e.data("fixedscrolltopoffset") : 0;
                          $(window)
                              .off("scroll.fixedScroll_pslib")
                              .on("scroll.fixedScroll_pslib", function () {
                                  var t = 0 < window.scrollY ? window.scrollY : window.pageYOffset;
                                  void 0 === t && (t = window.document.documentElement.scrollTop),
                                      t >= s.top
                                          ? e
                                                .addClass("ps-fixedscroll-on")
                                                .css({ top: n + "px", left: s.left + "px" })
                                                .attr("style", e.attr("style") + ";width:" + i + "px !important")
                                          : e.removeClass("ps-fixedscroll-on");
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
                (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = $.trim(t)).replace(/[Ã¡Ã Ã¢Ã£Ã¤]/g, "a")).replace(
                    /[Ã©Ã¨ÃªÃ«]/g,
                    "e"
                )).replace(/[Ã­Ã¬Ã®Ã¯]/g, "i")).replace(/[Ã³Ã²Ã´ÃµÃ¶]/g, "o")).replace(/[ÃºÃ¹Ã»Ã¼]/g, "u")).replace(/[Ã§]/g, "c")).replace(/\Ëœ/g, "")).replace(/\`/g, "")).replace(/\;/g, "")).replace(/\'/g, "")).replace(/\//g, "")).replace(
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
                0 < $(".ps-site-top-mob-fixed").length ? (t -= $(".ps-site-top-mob-fixed").outerHeight()) : 0 < $(".ps-site-top-fixed").length && (t -= $(".ps-site-top-fixed").outerHeight()),
                $("html,body").animate({ scrollTop: t }, e, i);
        },
        ConvertHexToRGB: function (t) {
            var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return (e = parseInt(e[1], 16) + "," + parseInt(e[2], 16) + "," + parseInt(e[3], 16));
        },
        Tooltip: function (t) {
            var a = null,
                o = { top: !0, right: !1, bottom: !1, left: !1 },
                r = !1;
            $(".ps-tooltip", t)
                .off("mouseenter.pslib mouseleave.pslib click.pslib focusout.pslib")
                .on("mouseenter.pslib mouseleave.pslib click.pslib focusout.pslib", function (t) {
                    var e = $(this),
                        i = e.attr("title"),
                        s = e.data("title", i),
                        n = t.type;
                    (o.right = e.is(".ps-tooltip-right")),
                        (o.bottom = e.is(".ps-tooltip-bottom")),
                        (o.left = e.is(".ps-tooltip-left")),
                        ("mouseenter" !== n && "click" !== n) || r
                            ? ("mouseleave" !== n && "focusout" !== n) || !r || (psLib.TooltipUtil.hide(a, e), (r = !1))
                            : ((a = psLib.TooltipUtil.create(e.data("title"))), psLib.TooltipUtil.show(a, o, e), (psLib.IsMobile && psLib.IsTablet) || e.removeAttr("title"), (r = !0));
                });
        },
        TooltipUtil: {
            create: function (t) {
                return $('<div class="ps-tooltip-ctt"/>').html(t);
            },
            show: function (t, e, i) {
                var s = { top: 0, left: 0, opacity: 1, visibility: "visible" };
                $("body").append(t);
                var n = i.offset().top,
                    a = i.offset().left,
                    o = i.outerWidth(),
                    r = i.outerHeight(),
                    l = t.outerWidth(),
                    d = t.outerHeight(),
                    c = $(window).outerWidth(),
                    h = $(window).outerHeight(),
                    u = $(window).scrollTop(),
                    p = $(window).scrollLeft(),
                    f = 14,
                    g = 7,
                    m = "ps-arrow-bottom",
                    v = "ps-arrow-side-left",
                    b = "ps-arrow-top",
                    w = "ps-arrow-side-right",
                    y = {
                        _TOP: function () {
                            if (((s.top = n - d - g), s.top - u <= 0)) return y._BOTTOM();
                            t.addClass(m);
                        },
                        _RIGHT: function () {
                            if (((s.top = n + (r / 2 - d / 2)), (s.left = a + o + g), s.left + l > c)) return y._LEFT();
                            t.addClass(v);
                        },
                        _BOTTOM: function () {
                            if (((s.top = n + r + g), s.top >= h + u)) return y._TOP();
                            t.addClass(b);
                        },
                        _LEFT: function () {
                            if (((s.top = n + (r / 2 - d / 2)), (s.left = a - l - g), s.left <= 0)) return y._RIGHT();
                            t.addClass(w);
                        },
                    },
                    k = "ps-arrow-right",
                    _ = "ps-arrow-center",
                    C = "ps-arrow-left",
                    x = {
                        _LEFT: function () {
                            if (((s.left = a + (o / 2 - (l + f))), s.left <= 0)) return x._RIGHT();
                            t.addClass(k);
                        },
                        _CENTER: function () {
                            return (s.left = a + (o / 2 - l / 2)), s.left + l > c ? x._LEFT() : s.left <= 0 ? x._RIGHT() : void t.addClass(_);
                        },
                        _RIGHT: function () {
                            if (((s.left = a + o / 2 - f), s.left + l > c)) return x._LEFT();
                            t.addClass(C);
                        },
                    };
                e.right ? y._RIGHT() : e.bottom ? (y._BOTTOM(), x._CENTER()) : e.left ? y._LEFT() : (y._TOP(), x._CENTER()), t.css(s);
            },
            hide: function (t, e) {
                var i, s;
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
                                      maxW < dw && (dw = maxW),
                                      $(d).addClass("ps-popover-left"),
                                      (config = { right: "35px", "margin-top": "-" + marginTop + "px", "max-width": maxW + "px" }),
                                      isHelper || (config = { "margin-top": "-" + (th / 2 + 21) + "px", right: parentW - ref.left + parentRef.left + 7 + "px" }))
                                    : (271 < maxW && (maxW = 271),
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
                            s = e.data("accordionidx");
                        void 0 !== s &&
                            i.find(".ps-panel").each(function () {
                                var t;
                                if ($(this).data("accordionidx") == s) return $(this).find(".ps-panel-head").trigger("click"), !0;
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
                                posSub = 0 < $(".ps-site-top-mob-fixed:visible,.ps-site-top-fixed:visible").length ? $(".ps-site-top-mob-fixed,.ps-site-top-fixed").outerHeight() : 0;
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
                            s = "ps-menu-opened";
                        if (i.is(":visible")) e.removeClass(s), i.slideUp("fast");
                        else {
                            var n = e.offset();
                            e.addClass(s), i.slideDown("fast"), psLib.ScrollTo(n.top - 30);
                        }
                    })),
                $(".ps-menu > li", t).each(function () {
                    var t = $(this);
                    ((!psLib.IsMobile && t.not(".ps-menu-vertical,.ps-menu-horizontal")) || psLib.IsMobile) &&
                        0 < t.children("ul").length &&
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
                        s = void 0 !== e.data("modalbackdropstatic") && e.data("modalbackdropstatic");
                    if (
                        ((keyboard = void 0 === e.data("modalkeyboarddisable") || e.data("modalkeyboarddisable")),
                        (onShow = void 0 !== e.data("modalonshow") && e.data("modalonshow")),
                        (onHide = void 0 !== e.data("modalonhide") && e.data("modalonhide")),
                        0 != i)
                    ) {
                        if (0 < $(".ps-modal-container", i).length) {
                            var n = e[0].getBoundingClientRect(),
                                a = $(".ps-modal-container", i).attr("class"),
                                o = "";
                            (a = $.trim(a.replace("ps-modal-container", ""))),
                                psLib.IsMobile ||
                                    (e.addClass("ps-button-transition-modal"),
                                    (o = '<div class="ps-transition-modal ' + a + '" style="width:' + n.width + "px;height:" + n.height + "px;left:" + n.left + "px;top:" + n.top + 'px;"></div>'),
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
                                    psLib.IsMobile || $(".ps-transition-modal").remove(), 0 < $("#ps-modal-blackdrop").length && psLib.Modal(i);
                                }, 1e3);
                        }
                        psLib.ModalShowHide(i, s, keyboard, onShow, onHide);
                    }
                });
        },
        ModalShowHide: function (dest, backdrop, keyboard, onShow, onHide) {
            if (void 0 === dest || !$(dest).length) return console.warn("Modal inexistente"), !1;
            var modal = $(dest),
                mode = modal.is(":visible") ? "hide" : "show";
            if ((void 0 === keyboard && (keyboard = !0), void 0 === backdrop && (backdrop = !1), void 0 === onShow && (onShow = !1), void 0 === onHide && (onHide = !1), "show" == mode)) {
                $("body").append("<div class='ps-modal-blackdrop' id='ps-modal-blackdrop'></div>").addClass("ps-modal-blackdrop-visible"),
                    modal.show(),
                    setTimeout(function () {
                        backdrop ? modal.addClass("ps-modal-backdrop-static") : modal.removeClass("ps-modal-backdrop-static"), modal.addClass("ps-modal-visible").data({ modalonhide: onHide });
                    }, 100);
                var title = modal.find(".ps-modal-title").length ? modal.find(".ps-modal-title").outerHeight() : 0,
                    foot = modal.find(".ps-modal-foot").length ? modal.find(".ps-modal-foot").outerHeight() : 0,
                    windowH = $(window).height();
                psLib.IsMobile ? modal.find(".ps-modal-content").css("max-height", windowH - title - foot + "px") : modal.find(".ps-modal-content").css("padding-bottom", foot + 14 + "px"),
                    keyboard &&
                        $(window)
                            .off("keyup.modal_pslib")
                            .off("keyup.modal_pslib")
                            .on("keyup.modal_pslib", function (t) {
                                27 == t.keyCode && (psLib.ModalShowHide(dest), psLib.ModalShowHideBlackdrop(), $(this).off("keyup.modal_pslib"));
                            }),
                    onShow && eval(onShow);
            } else {
                var callback = void 0 !== modal.data("modalonhide") && modal.data("modalonhide");
                modal.removeClass("ps-modal-visible").removeData("modalonhide"),
                    $(window).off("keyup.modal_pslib"),
                    setTimeout(function () {
                        modal.hide(), psLib.ModalShowHideBlackdrop(), callback && eval(callback);
                    }, 200);
            }
            setTimeout(function () {
                $(".ps-modal-close")
                    .off("click.pslib")
                    .on("click.pslib", function () {
                        var t = $(this),
                            e = t.parent().hasClass("ps-modal-container") ? t.parent().parent() : t.parent(),
                            i = void 0 !== t.data("modal") ? t.data("modal") : e;
                        psLib.ModalShowHideBlackdrop(), psLib.ModalShowHide(i);
                    }),
                    $(".ps-modal-blackdrop")
                        .off("click.pslib")
                        .on("click.pslib", function () {
                            $(".ps-modal-visible").find(".ps-modal-close").trigger("click");
                        }),
                    backdrop ||
                        $(".ps-modal-visible")
                            .off("click.pslib")
                            .on("click.pslib", function (t) {
                                $(t.target).is(".ps-modal") && $(".ps-modal-blackdrop").trigger("click");
                            });
            }, 150);
        },
        ModalShowHideBlackdrop: function (t) {
            $("#ps-modal-blackdrop").remove(), $("body").removeClass("ps-modal-blackdrop-visible");
        },
        ScrollBar: function (t) {
            var i = !1;
            $(".ps-scrollbar").each(function () {
                var t = $(this),
                    e = void 0 !== t.data("ps-scrollbar-autohide") && t.data("ps-scrollbar-autohide");
                t.psScrollBar({ autoHide: e }),
                    t.on("mouseenter click", function () {
                        i || (t.recalculate(), (i = !0));
                    });
            });
        },
        Cards: function (t) {
            var a = 0,
                e = void 0 !== t ? $("#" + t) : $("#psLib-card-" + Math.floor(100 * Math.random()));
            e.each(function () {
                var t = $(this),
                    e = $(".ps-card", t),
                    i = $(".ps-caption", e),
                    s = e.height(),
                    n = 60 < i.height() ? 0 : i.height();
                a < s && (a = 0 < i.length ? s + n : s);
            }),
                e.find(".ps-card").is(".ps-card--smaller, .ps-card--small, .ps-card--medium, .ps-card--big, .ps-card--bigger") ? e.find(".ps-card").height(a) : e.find(".ps-card").height(a + 50);
        },
        Video: function (t) {
            $(".ps-video").each(function () {
                var t = $(this),
                    e = void 0 !== t.data("title") && t.data("title"),
                    i = void 0 !== t.data("description") && t.data("description"),
                    s = void 0 !== t.data("thumb") && t.data("thumb"),
                    n,
                    a =
                        '<a href="javascript:;" class="ps-open-video ps-rounded-border" data-modal="' +
                        (void 0 !== t.data("modal") ? t.data("modal") : "videoModal") +
                        '" data-content="video">\t\t\t\t\t\t\t\t<img src="' +
                        s +
                        '" alt="' +
                        e +
                        '" />\t\t\t\t\t\t\t\t<h2 class="ps-title ps-color-white ps-alignCenter ps-md-pad">' +
                        e +
                        '</h2>\t\t\t\t\t\t\t\t<p class="ps-title ps-video-description ps-color-white ps-alignCenter">' +
                        i +
                        "</p>\t\t\t\t\t\t\t </a>";
                t.append(a), psLib.Modal(".ps-open-modal");
            }),
                $(".ps-open-video")
                    .off("click.pslib")
                    .on("click.pslib", function (t) {
                        t.preventDefault();
                        var e,
                            i = $(this).parent(),
                            s = void 0 !== i.data("url") && i.data("url"),
                            n = void 0 !== i.data("autoplay") && i.data("autoplay") ? "1" : "0",
                            a = void 0 !== i.data("modal") ? $(i.data("modal")) : $("#videoModal"),
                            o = void 0 !== i.data("modalwidth") ? i.data("modalwidth") : "medium";
                        if (!s) return console.warn("Video inexistente"), !1;
                        var r = '<iframe id="psVideoIFrame" width="100%" height="100%" src="' + s + "&autoplay=" + n + '" frameborder="0" allowfullscreen="1"></iframe>',
                            l = "ps-sm-modal-" + o;
                        $(".ps-modal-content", a).html(r), $(".ps-modal-container", a).addClass(l), psLib.ModalShowHide(a, !1, !1, !1, "psLib.RemoveVideoIFrame()");
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
                s = i.parent(),
                n = "ps-wizard-step-selected",
                a = "ps-wizard-step-after";
            e.find(".ps-wizard-content-item").hide(), $(t).fadeIn(200), i.removeClass(a).addClass(n), i.prevUntil().addClass(a).removeClass(n), i.nextUntil().removeClass(a).removeClass(n);
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
    })(function (M) {
        function s(t, e) {
            var i,
                s,
                n,
                a = t.nodeName.toLowerCase();
            return "area" === a
                ? ((s = (i = t.parentNode).name), !(!t.href || !s || "map" !== i.nodeName.toLowerCase()) && !!(n = M("img[usemap='#" + s + "']")[0]) && o(n))
                : (/^(input|select|textarea|button|object)$/.test(a) ? !t.disabled : ("a" === a && t.href) || e) && o(t);
        }
        function o(t) {
            return (
                M.expr.filters.visible(t) &&
                !M(t)
                    .parents()
                    .addBack()
                    .filter(function () {
                        return "hidden" === M.css(this, "visibility");
                    }).length
            );
        }
        function l(t) {
            for (var e, i; t.length && t[0] !== document; ) {
                if (("absolute" === (e = t.css("position")) || "relative" === e || "fixed" === e) && ((i = parseInt(t.css("zIndex"), 10)), !isNaN(i) && 0 !== i)) return i;
                t = t.parent();
            }
            return 0;
        }
        function t() {
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
                M.extend(this._defaults, this.regional[""]),
                (this.regional.en = M.extend(!0, {}, this.regional[""])),
                (this.regional["en-US"] = M.extend(!0, {}, this.regional.en)),
                (this.dpDiv = n(M("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")));
        }
        function n(t) {
            var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t
                .delegate(e, "mouseout", function () {
                    M(this).removeClass("ui-state-hover"),
                        -1 !== this.className.indexOf("ui-datepicker-prev") && M(this).removeClass("ui-datepicker-prev-hover"),
                        -1 !== this.className.indexOf("ui-datepicker-next") && M(this).removeClass("ui-datepicker-next-hover");
                })
                .delegate(e, "mouseover", r);
        }
        function r() {
            M.datepicker._isDisabledDatepicker(k.inline ? k.dpDiv.parent()[0] : k.input[0]) ||
                (M(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                M(this).addClass("ui-state-hover"),
                -1 !== this.className.indexOf("ui-datepicker-prev") && M(this).addClass("ui-datepicker-prev-hover"),
                -1 !== this.className.indexOf("ui-datepicker-next") && M(this).addClass("ui-datepicker-next-hover"));
        }
        function h(t, e) {
            for (var i in (M.extend(t, e), e)) null == e[i] && (t[i] = e[i]);
            return t;
        }
        function e(e) {
            return function () {
                var t = this.element.val();
                e.apply(this, arguments), this._refresh(), t !== this.element.val() && this._trigger("change");
            };
        }
        var i, a, d, c;
        (M.ui = M.ui || {}),
            M.extend(M.ui, {
                version: "1.11.4",
                keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 },
            }),
            M.fn.extend({
                scrollParent: function (t) {
                    var e = this.css("position"),
                        i = "absolute" === e,
                        s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                        n = this.parents()
                            .filter(function () {
                                var t = M(this);
                                return (!i || "static" !== t.css("position")) && s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));
                            })
                            .eq(0);
                    return "fixed" !== e && n.length ? n : M(this[0].ownerDocument || document);
                },
                uniqueId:
                    ((c = 0),
                    function () {
                        return this.each(function () {
                            this.id || (this.id = "ui-id-" + ++c);
                        });
                    }),
                removeUniqueId: function () {
                    return this.each(function () {
                        /^ui-id-\d+$/.test(this.id) && M(this).removeAttr("id");
                    });
                },
            }),
            M.extend(M.expr[":"], {
                data: M.expr.createPseudo
                    ? M.expr.createPseudo(function (e) {
                          return function (t) {
                              return !!M.data(t, e);
                          };
                      })
                    : function (t, e, i) {
                          return !!M.data(t, i[3]);
                      },
                focusable: function (t) {
                    return s(t, !isNaN(M.attr(t, "tabindex")));
                },
                tabbable: function (t) {
                    var e = M.attr(t, "tabindex"),
                        i = isNaN(e);
                    return (i || 0 <= e) && s(t, !i);
                },
            }),
            M("<a>").outerWidth(1).jquery ||
                M.each(["Width", "Height"], function (t, i) {
                    function s(t, e, i, s) {
                        return (
                            M.each(n, function () {
                                (e -= parseFloat(M.css(t, "padding" + this)) || 0), i && (e -= parseFloat(M.css(t, "border" + this + "Width")) || 0), s && (e -= parseFloat(M.css(t, "margin" + this)) || 0);
                            }),
                            e
                        );
                    }
                    var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                        a = i.toLowerCase(),
                        o = { innerWidth: M.fn.innerWidth, innerHeight: M.fn.innerHeight, outerWidth: M.fn.outerWidth, outerHeight: M.fn.outerHeight };
                    (M.fn["inner" + i] = function (t) {
                        return void 0 === t
                            ? o["inner" + i].call(this)
                            : this.each(function () {
                                  M(this).css(a, s(this, t) + "px");
                              });
                    }),
                        (M.fn["outer" + i] = function (t, e) {
                            return "number" != typeof t
                                ? o["outer" + i].call(this, t)
                                : this.each(function () {
                                      M(this).css(a, s(this, t, !0, e) + "px");
                                  });
                        });
                }),
            M.fn.addBack ||
                (M.fn.addBack = function (t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                }),
            M("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
                (M.fn.removeData =
                    ((d = M.fn.removeData),
                    function (t) {
                        return arguments.length ? d.call(this, M.camelCase(t)) : d.call(this);
                    })),
            (M.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
            M.fn.extend({
                focus:
                    ((a = M.fn.focus),
                    function (e, i) {
                        return "number" == typeof e
                            ? this.each(function () {
                                  var t = this;
                                  setTimeout(function () {
                                      M(t).focus(), i && i.call(t);
                                  }, e);
                              })
                            : a.apply(this, arguments);
                    }),
                disableSelection:
                    ((i = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"),
                    function () {
                        return this.bind(i + ".ui-disableSelection", function (t) {
                            t.preventDefault();
                        });
                    }),
                enableSelection: function () {
                    return this.unbind(".ui-disableSelection");
                },
                zIndex: function (t) {
                    if (void 0 !== t) return this.css("zIndex", t);
                    if (this.length)
                        for (var e, i, s = M(this[0]); s.length && s[0] !== document; ) {
                            if (("absolute" === (e = s.css("position")) || "relative" === e || "fixed" === e) && ((i = parseInt(s.css("zIndex"), 10)), !isNaN(i) && 0 !== i)) return i;
                            s = s.parent();
                        }
                    return 0;
                },
            }),
            (M.ui.plugin = {
                add: function (t, e, i) {
                    var s,
                        n = M.ui[t].prototype;
                    for (s in i) (n.plugins[s] = n.plugins[s] || []), n.plugins[s].push([e, i[s]]);
                },
                call: function (t, e, i, s) {
                    var n,
                        a = t.plugins[e];
                    if (a && (s || (t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))) for (n = 0; a.length > n; n++) t.options[a[n][0]] && a[n][1].apply(t.element, i);
                },
            });
        var u = 0,
            p = Array.prototype.slice,
            f;
        (M.cleanData =
            ((f = M.cleanData),
            function (t) {
                var e, i, s;
                for (s = 0; null != (i = t[s]); s++)
                    try {
                        (e = M._data(i, "events")) && e.remove && M(i).triggerHandler("remove");
                    } catch (t) {}
                f(t);
            })),
            (M.widget = function (t, i, e) {
                var s,
                    n,
                    a,
                    o,
                    r = {},
                    l = t.split(".")[0];
                return (
                    (t = t.split(".")[1]),
                    (s = l + "-" + t),
                    e || ((e = i), (i = M.Widget)),
                    (M.expr[":"][s.toLowerCase()] = function (t) {
                        return !!M.data(t, s);
                    }),
                    (M[l] = M[l] || {}),
                    (n = M[l][t]),
                    (a = M[l][t] = function (t, e) {
                        return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new a(t, e);
                    }),
                    M.extend(a, n, { version: e.version, _proto: M.extend({}, e), _childConstructors: [] }),
                    ((o = new i()).options = M.widget.extend({}, o.options)),
                    M.each(e, function (e, s) {
                        return M.isFunction(s)
                            ? void (r[e] =
                                  ((n = function () {
                                      return i.prototype[e].apply(this, arguments);
                                  }),
                                  (a = function (t) {
                                      return i.prototype[e].apply(this, t);
                                  }),
                                  function () {
                                      var t,
                                          e = this._super,
                                          i = this._superApply;
                                      return (this._super = n), (this._superApply = a), (t = s.apply(this, arguments)), (this._super = e), (this._superApply = i), t;
                                  }))
                            : void (r[e] = s);
                        var n, a;
                    }),
                    (a.prototype = M.widget.extend(o, { widgetEventPrefix: (n && o.widgetEventPrefix) || t }, r, { constructor: a, namespace: l, widgetName: t, widgetFullName: s })),
                    n
                        ? (M.each(n._childConstructors, function (t, e) {
                              var i = e.prototype;
                              M.widget(i.namespace + "." + i.widgetName, a, e._proto);
                          }),
                          delete n._childConstructors)
                        : i._childConstructors.push(a),
                    M.widget.bridge(t, a),
                    a
                );
            }),
            (M.widget.extend = function (t) {
                for (var e, i, s = p.call(arguments, 1), n = 0, a = s.length; n < a; n++)
                    for (e in s[n]) (i = s[n][e]), s[n].hasOwnProperty(e) && void 0 !== i && (t[e] = M.isPlainObject(i) ? (M.isPlainObject(t[e]) ? M.widget.extend({}, t[e], i) : M.widget.extend({}, i)) : i);
                return t;
            }),
            (M.widget.bridge = function (a, e) {
                var o = e.prototype.widgetFullName || a;
                M.fn[a] = function (i) {
                    var t = "string" == typeof i,
                        s = p.call(arguments, 1),
                        n = this;
                    return (
                        t
                            ? this.each(function () {
                                  var t,
                                      e = M.data(this, o);
                                  return "instance" === i
                                      ? ((n = e), !1)
                                      : e
                                      ? M.isFunction(e[i]) && "_" !== i.charAt(0)
                                          ? (t = e[i].apply(e, s)) !== e && void 0 !== t
                                              ? ((n = t && t.jquery ? n.pushStack(t.get()) : t), !1)
                                              : void 0
                                          : M.error("no such method '" + i + "' for " + a + " widget instance")
                                      : M.error("cannot call methods on " + a + " prior to initialization; attempted to call method '" + i + "'");
                              })
                            : (s.length && (i = M.widget.extend.apply(null, [i].concat(s))),
                              this.each(function () {
                                  var t = M.data(this, o);
                                  t ? (t.option(i || {}), t._init && t._init()) : M.data(this, o, new e(i, this));
                              })),
                        n
                    );
                };
            }),
            (M.Widget = function () {}),
            (M.Widget._childConstructors = []),
            (M.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: { disabled: !1, create: null },
                _createWidget: function (t, e) {
                    (e = M(e || this.defaultElement || this)[0]),
                        (this.element = M(e)),
                        (this.uuid = u++),
                        (this.eventNamespace = "." + this.widgetName + this.uuid),
                        (this.bindings = M()),
                        (this.hoverable = M()),
                        (this.focusable = M()),
                        e !== this &&
                            (M.data(e, this.widgetFullName, this),
                            this._on(!0, this.element, {
                                remove: function (t) {
                                    t.target === e && this.destroy();
                                },
                            }),
                            (this.document = M(e.style ? e.ownerDocument : e.document || e)),
                            (this.window = M(this.document[0].defaultView || this.document[0].parentWindow))),
                        (this.options = M.widget.extend({}, this.options, this._getCreateOptions(), t)),
                        this._create(),
                        this._trigger("create", null, this._getCreateEventData()),
                        this._init();
                },
                _getCreateOptions: M.noop,
                _getCreateEventData: M.noop,
                _create: M.noop,
                _init: M.noop,
                destroy: function () {
                    this._destroy(),
                        this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(M.camelCase(this.widgetFullName)),
                        this.widget()
                            .unbind(this.eventNamespace)
                            .removeAttr("aria-disabled")
                            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
                        this.bindings.unbind(this.eventNamespace),
                        this.hoverable.removeClass("ui-state-hover"),
                        this.focusable.removeClass("ui-state-focus");
                },
                _destroy: M.noop,
                widget: function () {
                    return this.element;
                },
                option: function (t, e) {
                    var i,
                        s,
                        n,
                        a = t;
                    if (0 === arguments.length) return M.widget.extend({}, this.options);
                    if ("string" == typeof t)
                        if (((a = {}), (t = (i = t.split(".")).shift()), i.length)) {
                            for (s = a[t] = M.widget.extend({}, this.options[t]), n = 0; i.length - 1 > n; n++) (s[i[n]] = s[i[n]] || {}), (s = s[i[n]]);
                            if (((t = i.pop()), 1 === arguments.length)) return void 0 === s[t] ? null : s[t];
                            s[t] = e;
                        } else {
                            if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                            a[t] = e;
                        }
                    return this._setOptions(a), this;
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
                _on: function (o, r, t) {
                    var l,
                        d = this;
                    "boolean" != typeof o && ((t = r), (r = o), (o = !1)),
                        t ? ((r = l = M(r)), (this.bindings = this.bindings.add(r))) : ((t = r), (r = this.element), (l = this.widget())),
                        M.each(t, function (t, e) {
                            function i() {
                                return o || (!0 !== d.options.disabled && !M(this).hasClass("ui-state-disabled")) ? ("string" == typeof e ? d[e] : e).apply(d, arguments) : void 0;
                            }
                            "string" != typeof e && (i.guid = e.guid = e.guid || i.guid || M.guid++);
                            var s = t.match(/^([\w:-]*)\s*(.*)$/),
                                n = s[1] + d.eventNamespace,
                                a = s[2];
                            a ? l.delegate(a, n, i) : r.bind(n, i);
                        });
                },
                _off: function (t, e) {
                    (e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                        t.unbind(e).undelegate(e),
                        (this.bindings = M(this.bindings.not(t).get())),
                        (this.focusable = M(this.focusable.not(t).get())),
                        (this.hoverable = M(this.hoverable.not(t).get()));
                },
                _delay: function (t, e) {
                    function i() {
                        return ("string" == typeof t ? s[t] : t).apply(s, arguments);
                    }
                    var s = this;
                    return setTimeout(i, e || 0);
                },
                _hoverable: function (t) {
                    (this.hoverable = this.hoverable.add(t)),
                        this._on(t, {
                            mouseenter: function (t) {
                                M(t.currentTarget).addClass("ui-state-hover");
                            },
                            mouseleave: function (t) {
                                M(t.currentTarget).removeClass("ui-state-hover");
                            },
                        });
                },
                _focusable: function (t) {
                    (this.focusable = this.focusable.add(t)),
                        this._on(t, {
                            focusin: function (t) {
                                M(t.currentTarget).addClass("ui-state-focus");
                            },
                            focusout: function (t) {
                                M(t.currentTarget).removeClass("ui-state-focus");
                            },
                        });
                },
                _trigger: function (t, e, i) {
                    var s,
                        n,
                        a = this.options[t];
                    if (((i = i || {}), ((e = M.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase()), (e.target = this.element[0]), (n = e.originalEvent))) for (s in n) s in e || (e[s] = n[s]);
                    return this.element.trigger(e, i), !((M.isFunction(a) && !1 === a.apply(this.element[0], [e].concat(i))) || e.isDefaultPrevented());
                },
            }),
            M.each({ show: "fadeIn", hide: "fadeOut" }, function (a, o) {
                M.Widget.prototype["_" + a] = function (e, t, i) {
                    "string" == typeof t && (t = { effect: t });
                    var s,
                        n = t ? (!0 === t || "number" == typeof t ? o : t.effect || o) : a;
                    "number" == typeof (t = t || {}) && (t = { duration: t }),
                        (s = !M.isEmptyObject(t)),
                        (t.complete = i),
                        t.delay && e.delay(t.delay),
                        s && M.effects && M.effects.effect[n]
                            ? e[a](t)
                            : n !== a && e[n]
                            ? e[n](t.duration, t.easing, i)
                            : e.queue(function (t) {
                                  M(this)[a](), i && i.call(e[0]), t();
                              });
                };
            }),
            M.widget;
        var g = !1;
        M(document).mouseup(function () {
            g = !1;
        }),
            M.widget("ui.mouse", {
                version: "1.11.4",
                options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 },
                _mouseInit: function () {
                    var e = this;
                    this.element
                        .bind("mousedown." + this.widgetName, function (t) {
                            return e._mouseDown(t);
                        })
                        .bind("click." + this.widgetName, function (t) {
                            return !0 === M.data(t.target, e.widgetName + ".preventClickEvent") ? (M.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1) : void 0;
                        }),
                        (this.started = !1);
                },
                _mouseDestroy: function () {
                    this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
                },
                _mouseDown: function (t) {
                    if (!g) {
                        (this._mouseMoved = !1), this._mouseStarted && this._mouseUp(t), (this._mouseDownEvent = t);
                        var e = this,
                            i = 1 === t.which,
                            s = !("string" != typeof this.options.cancel || !t.target.nodeName) && M(t.target).closest(this.options.cancel).length;
                        return (
                            i &&
                                !s &&
                                this._mouseCapture(t) &&
                                ((this.mouseDelayMet = !this.options.delay),
                                this.mouseDelayMet ||
                                    (this._mouseDelayTimer = setTimeout(function () {
                                        e.mouseDelayMet = !0;
                                    }, this.options.delay)),
                                this._mouseDistanceMet(t) && this._mouseDelayMet(t) && ((this._mouseStarted = !1 !== this._mouseStart(t)), !this._mouseStarted)
                                    ? t.preventDefault()
                                    : (!0 === M.data(t.target, this.widgetName + ".preventClickEvent") && M.removeData(t.target, this.widgetName + ".preventClickEvent"),
                                      (this._mouseMoveDelegate = function (t) {
                                          return e._mouseMove(t);
                                      }),
                                      (this._mouseUpDelegate = function (t) {
                                          return e._mouseUp(t);
                                      }),
                                      this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                                      t.preventDefault(),
                                      (g = !0))),
                            !0
                        );
                    }
                },
                _mouseMove: function (t) {
                    if (this._mouseMoved) {
                        if (M.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) return this._mouseUp(t);
                        if (!t.which) return this._mouseUp(t);
                    }
                    return (
                        (t.which || t.button) && (this._mouseMoved = !0),
                        this._mouseStarted
                            ? (this._mouseDrag(t), t.preventDefault())
                            : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t)), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
                              !this._mouseStarted)
                    );
                },
                _mouseUp: function (t) {
                    return (
                        this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
                        this._mouseStarted && ((this._mouseStarted = !1), t.target === this._mouseDownEvent.target && M.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)),
                        (g = !1)
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
                function _(t, e, i) {
                    return [parseFloat(t[0]) * (l.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (l.test(t[1]) ? i / 100 : 1)];
                }
                function C(t, e) {
                    return parseInt(M.css(t, e), 10) || 0;
                }
                function e(t) {
                    var e = t[0];
                    return 9 === e.nodeType
                        ? { width: t.width(), height: t.height(), offset: { top: 0, left: 0 } }
                        : M.isWindow(e)
                        ? { width: t.width(), height: t.height(), offset: { top: t.scrollTop(), left: t.scrollLeft() } }
                        : e.preventDefault
                        ? { width: 0, height: 0, offset: { top: e.pageY, left: e.pageX } }
                        : { width: t.outerWidth(), height: t.outerHeight(), offset: t.offset() };
                }
                M.ui = M.ui || {};
                var n,
                    x,
                    S = Math.max,
                    T = Math.abs,
                    D = Math.round,
                    s = /left|center|right/,
                    a = /top|center|bottom/,
                    o = /[\+\-]\d+(\.[\d]+)?%?/,
                    r = /^\w+/,
                    l = /%$/,
                    i = M.fn.position;
                (M.position = {
                    scrollbarWidth: function () {
                        if (void 0 !== n) return n;
                        var t,
                            e,
                            i = M("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                            s = i.children()[0];
                        return M("body").append(i), (t = s.offsetWidth), i.css("overflow", "scroll"), t === (e = s.offsetWidth) && (e = i[0].clientWidth), i.remove(), (n = t - e);
                    },
                    getScrollInfo: function (t) {
                        var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                            i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                            s = "scroll" === e || ("auto" === e && t.width < t.element[0].scrollWidth),
                            n;
                        return { width: "scroll" === i || ("auto" === i && t.height < t.element[0].scrollHeight) ? M.position.scrollbarWidth() : 0, height: s ? M.position.scrollbarWidth() : 0 };
                    },
                    getWithinInfo: function (t) {
                        var e = M(t || window),
                            i = M.isWindow(e[0]),
                            s = !!e[0] && 9 === e[0].nodeType;
                        return {
                            element: e,
                            isWindow: i,
                            isDocument: s,
                            offset: e.offset() || { left: 0, top: 0 },
                            scrollLeft: e.scrollLeft(),
                            scrollTop: e.scrollTop(),
                            width: i || s ? e.width() : e.outerWidth(),
                            height: i || s ? e.height() : e.outerHeight(),
                        };
                    },
                }),
                    (M.fn.position = function (h) {
                        if (!h || !h.of) return i.apply(this, arguments);
                        h = M.extend({}, h);
                        var u,
                            p,
                            f,
                            g,
                            m,
                            t,
                            v = M(h.of),
                            b = M.position.getWithinInfo(h.within),
                            w = M.position.getScrollInfo(b),
                            y = (h.collision || "flip").split(" "),
                            k = {};
                        return (
                            (t = e(v)),
                            v[0].preventDefault && (h.at = "left top"),
                            (p = t.width),
                            (f = t.height),
                            (g = t.offset),
                            (m = M.extend({}, g)),
                            M.each(["my", "at"], function () {
                                var t,
                                    e,
                                    i = (h[this] || "").split(" ");
                                1 === i.length && (i = s.test(i[0]) ? i.concat(["center"]) : a.test(i[0]) ? ["center"].concat(i) : ["center", "center"]),
                                    (i[0] = s.test(i[0]) ? i[0] : "center"),
                                    (i[1] = a.test(i[1]) ? i[1] : "center"),
                                    (t = o.exec(i[0])),
                                    (e = o.exec(i[1])),
                                    (k[this] = [t ? t[0] : 0, e ? e[0] : 0]),
                                    (h[this] = [r.exec(i[0])[0], r.exec(i[1])[0]]);
                            }),
                            1 === y.length && (y[1] = y[0]),
                            "right" === h.at[0] ? (m.left += p) : "center" === h.at[0] && (m.left += p / 2),
                            "bottom" === h.at[1] ? (m.top += f) : "center" === h.at[1] && (m.top += f / 2),
                            (u = _(k.at, p, f)),
                            (m.left += u[0]),
                            (m.top += u[1]),
                            this.each(function () {
                                var i,
                                    t,
                                    o = M(this),
                                    r = o.outerWidth(),
                                    l = o.outerHeight(),
                                    e = C(this, "marginLeft"),
                                    s = C(this, "marginTop"),
                                    n = r + e + C(this, "marginRight") + w.width,
                                    a = l + s + C(this, "marginBottom") + w.height,
                                    d = M.extend({}, m),
                                    c = _(k.my, o.outerWidth(), o.outerHeight());
                                "right" === h.my[0] ? (d.left -= r) : "center" === h.my[0] && (d.left -= r / 2),
                                    "bottom" === h.my[1] ? (d.top -= l) : "center" === h.my[1] && (d.top -= l / 2),
                                    (d.left += c[0]),
                                    (d.top += c[1]),
                                    x || ((d.left = D(d.left)), (d.top = D(d.top))),
                                    (i = { marginLeft: e, marginTop: s }),
                                    M.each(["left", "top"], function (t, e) {
                                        M.ui.position[y[t]] &&
                                            M.ui.position[y[t]][e](d, {
                                                targetWidth: p,
                                                targetHeight: f,
                                                elemWidth: r,
                                                elemHeight: l,
                                                collisionPosition: i,
                                                collisionWidth: n,
                                                collisionHeight: a,
                                                offset: [u[0] + c[0], u[1] + c[1]],
                                                my: h.my,
                                                at: h.at,
                                                within: b,
                                                elem: o,
                                            });
                                    }),
                                    h.using &&
                                        (t = function (t) {
                                            var e = g.left - d.left,
                                                i = e + p - r,
                                                s = g.top - d.top,
                                                n = s + f - l,
                                                a = {
                                                    target: { element: v, left: g.left, top: g.top, width: p, height: f },
                                                    element: { element: o, left: d.left, top: d.top, width: r, height: l },
                                                    horizontal: i < 0 ? "left" : 0 < e ? "right" : "center",
                                                    vertical: n < 0 ? "top" : 0 < s ? "bottom" : "middle",
                                                };
                                            p < r && p > T(e + i) && (a.horizontal = "center"),
                                                f < l && f > T(s + n) && (a.vertical = "middle"),
                                                (a.important = S(T(e), T(i)) > S(T(s), T(n)) ? "horizontal" : "vertical"),
                                                h.using.call(this, t, a);
                                        }),
                                    o.offset(M.extend(d, { using: t }));
                            })
                        );
                    }),
                    (M.ui.position = {
                        fit: {
                            left: function (t, e) {
                                var i,
                                    s = e.within,
                                    n = s.isWindow ? s.scrollLeft : s.offset.left,
                                    a = s.width,
                                    o = t.left - e.collisionPosition.marginLeft,
                                    r = n - o,
                                    l = o + e.collisionWidth - a - n;
                                e.collisionWidth > a
                                    ? 0 < r && l <= 0
                                        ? ((i = t.left + r + e.collisionWidth - a - n), (t.left += r - i))
                                        : (t.left = 0 < l && r <= 0 ? n : l < r ? n + a - e.collisionWidth : n)
                                    : 0 < r
                                    ? (t.left += r)
                                    : 0 < l
                                    ? (t.left -= l)
                                    : (t.left = S(t.left - o, t.left));
                            },
                            top: function (t, e) {
                                var i,
                                    s = e.within,
                                    n = s.isWindow ? s.scrollTop : s.offset.top,
                                    a = e.within.height,
                                    o = t.top - e.collisionPosition.marginTop,
                                    r = n - o,
                                    l = o + e.collisionHeight - a - n;
                                e.collisionHeight > a
                                    ? 0 < r && l <= 0
                                        ? ((i = t.top + r + e.collisionHeight - a - n), (t.top += r - i))
                                        : (t.top = 0 < l && r <= 0 ? n : l < r ? n + a - e.collisionHeight : n)
                                    : 0 < r
                                    ? (t.top += r)
                                    : 0 < l
                                    ? (t.top -= l)
                                    : (t.top = S(t.top - o, t.top));
                            },
                        },
                        flip: {
                            left: function (t, e) {
                                var i,
                                    s,
                                    n = e.within,
                                    a = n.offset.left + n.scrollLeft,
                                    o = n.width,
                                    r = n.isWindow ? n.scrollLeft : n.offset.left,
                                    l = t.left - e.collisionPosition.marginLeft,
                                    d = l - r,
                                    c = l + e.collisionWidth - o - r,
                                    h = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                                    u = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                                    p = -2 * e.offset[0];
                                d < 0
                                    ? ((i = t.left + h + u + p + e.collisionWidth - o - a) < 0 || T(d) > i) && (t.left += h + u + p)
                                    : 0 < c && (0 < (s = t.left - e.collisionPosition.marginLeft + h + u + p - r) || c > T(s)) && (t.left += h + u + p);
                            },
                            top: function (t, e) {
                                var i,
                                    s,
                                    n = e.within,
                                    a = n.offset.top + n.scrollTop,
                                    o = n.height,
                                    r = n.isWindow ? n.scrollTop : n.offset.top,
                                    l = t.top - e.collisionPosition.marginTop,
                                    d = l - r,
                                    c = l + e.collisionHeight - o - r,
                                    h,
                                    u = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                                    p = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                                    f = -2 * e.offset[1];
                                d < 0
                                    ? ((s = t.top + u + p + f + e.collisionHeight - o - a) < 0 || T(d) > s) && (t.top += u + p + f)
                                    : 0 < c && (0 < (i = t.top - e.collisionPosition.marginTop + u + p + f - r) || c > T(i)) && (t.top += u + p + f);
                            },
                        },
                        flipfit: {
                            left: function () {
                                M.ui.position.flip.left.apply(this, arguments), M.ui.position.fit.left.apply(this, arguments);
                            },
                            top: function () {
                                M.ui.position.flip.top.apply(this, arguments), M.ui.position.fit.top.apply(this, arguments);
                            },
                        },
                    }),
                    (function () {
                        var t,
                            e,
                            i,
                            s,
                            n,
                            a = document.getElementsByTagName("body")[0],
                            o = document.createElement("div");
                        for (n in ((t = document.createElement(a ? "div" : "body")),
                        (i = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }),
                        a && M.extend(i, { position: "absolute", left: "-1000px", top: "-1000px" }),
                        i))
                            t.style[n] = i[n];
                        t.appendChild(o),
                            (e = a || document.documentElement).insertBefore(t, e.firstChild),
                            (o.style.cssText = "position: absolute; left: 10.7432222px;"),
                            (s = M(o).offset().left),
                            (x = 10 < s && s < 11),
                            (t.innerHTML = ""),
                            e.removeChild(t);
                    })();
            })(),
            M.ui.position,
            M.widget("ui.menu", {
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
                            "click .ui-menu-item": function (t) {
                                var e = M(t.target);
                                !this.mouseHandled &&
                                    e.not(".ui-state-disabled").length &&
                                    (this.select(t),
                                    t.isPropagationStopped() || (this.mouseHandled = !0),
                                    e.has(".ui-menu").length
                                        ? this.expand(t)
                                        : !this.element.is(":focus") &&
                                          M(this.document[0].activeElement).closest(".ui-menu").length &&
                                          (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                            },
                            "mouseenter .ui-menu-item": function (t) {
                                if (!this.previousFilter) {
                                    var e = M(t.currentTarget);
                                    e.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, e);
                                }
                            },
                            mouseleave: "collapseAll",
                            "mouseleave .ui-menu": "collapseAll",
                            focus: function (t, e) {
                                var i = this.active || this.element.find(this.options.items).eq(0);
                                e || this.focus(t, i);
                            },
                            blur: function (t) {
                                this._delay(function () {
                                    M.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t);
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
                                var t = M(this);
                                t.data("ui-menu-submenu-carat") && t.remove();
                            }),
                        this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
                },
                _keydown: function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a = !0;
                    switch (t.keyCode) {
                        case M.ui.keyCode.PAGE_UP:
                            this.previousPage(t);
                            break;
                        case M.ui.keyCode.PAGE_DOWN:
                            this.nextPage(t);
                            break;
                        case M.ui.keyCode.HOME:
                            this._move("first", "first", t);
                            break;
                        case M.ui.keyCode.END:
                            this._move("last", "last", t);
                            break;
                        case M.ui.keyCode.UP:
                            this.previous(t);
                            break;
                        case M.ui.keyCode.DOWN:
                            this.next(t);
                            break;
                        case M.ui.keyCode.LEFT:
                            this.collapse(t);
                            break;
                        case M.ui.keyCode.RIGHT:
                            this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                            break;
                        case M.ui.keyCode.ENTER:
                        case M.ui.keyCode.SPACE:
                            this._activate(t);
                            break;
                        case M.ui.keyCode.ESCAPE:
                            this.collapse(t);
                            break;
                        default:
                            (a = !1),
                                (i = this.previousFilter || ""),
                                (s = String.fromCharCode(t.keyCode)),
                                (n = !1),
                                clearTimeout(this.filterTimer),
                                s === i ? (n = !0) : (s = i + s),
                                (e = this._filterMenuItems(s)),
                                (e = n && -1 !== e.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : e).length || ((s = String.fromCharCode(t.keyCode)), (e = this._filterMenuItems(s))),
                                e.length
                                    ? (this.focus(t, e),
                                      (this.previousFilter = s),
                                      (this.filterTimer = this._delay(function () {
                                          delete this.previousFilter;
                                      }, 1e3)))
                                    : delete this.previousFilter;
                    }
                    a && t.preventDefault();
                },
                _activate: function (t) {
                    this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(t) : this.select(t));
                },
                refresh: function () {
                    var t,
                        e,
                        i = this,
                        s = this.options.icons.submenu,
                        n = this.element.find(this.options.menus);
                    this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
                        n
                            .filter(":not(.ui-menu)")
                            .addClass("ui-menu ui-widget ui-widget-content ui-front")
                            .hide()
                            .attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" })
                            .each(function () {
                                var t = M(this),
                                    e = t.parent(),
                                    i = M("<span>")
                                        .addClass("ui-menu-icon ui-icon " + s)
                                        .data("ui-menu-submenu-carat", !0);
                                e.attr("aria-haspopup", "true").prepend(i), t.attr("aria-labelledby", e.attr("id"));
                            }),
                        (e = (t = n.add(this.element)).find(this.options.items)).not(".ui-menu-item").each(function () {
                            var t = M(this);
                            i._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider");
                        }),
                        e.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }),
                        e.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                        this.active && !M.contains(this.element[0], this.active[0]) && this.blur();
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
                    var i, s;
                    this.blur(t, t && "focus" === t.type),
                        this._scrollIntoView(e),
                        (this.active = e.first()),
                        (s = this.active.addClass("ui-state-focus").removeClass("ui-state-active")),
                        this.options.role && this.element.attr("aria-activedescendant", s.attr("id")),
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
                _scrollIntoView: function (t) {
                    var e, i, s, n, a, o;
                    this._hasScroll() &&
                        ((e = parseFloat(M.css(this.activeMenu[0], "borderTopWidth")) || 0),
                        (i = parseFloat(M.css(this.activeMenu[0], "paddingTop")) || 0),
                        (s = t.offset().top - this.activeMenu.offset().top - e - i),
                        (n = this.activeMenu.scrollTop()),
                        (a = this.activeMenu.height()),
                        (o = t.outerHeight()),
                        s < 0 ? this.activeMenu.scrollTop(n + s) : a < s + o && this.activeMenu.scrollTop(n + s - a + o));
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
                _open: function (t) {
                    var e = M.extend({ of: this.active }, this.options.position);
                    clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(e);
                },
                collapseAll: function (e, i) {
                    clearTimeout(this.timer),
                        (this.timer = this._delay(function () {
                            var t = i ? this.element : M(e && e.target).closest(this.element.find(".ui-menu"));
                            t.length || (t = this.element), this._close(t), this.blur(e), (this.activeMenu = t);
                        }, this.delay));
                },
                _close: function (t) {
                    t || (t = this.active ? this.active.parent() : this.element),
                        t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");
                },
                _closeOnDocumentClick: function (t) {
                    return !M(t.target).closest(".ui-menu").length;
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
                    var s;
                    this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)),
                        (s && s.length && this.active) || (s = this.activeMenu.find(this.options.items)[e]()),
                        this.focus(i, s);
                },
                nextPage: function (t) {
                    var e, i, s;
                    return this.active
                        ? void (
                              this.isLastItem() ||
                              (this._hasScroll()
                                  ? ((i = this.active.offset().top),
                                    (s = this.element.height()),
                                    this.active.nextAll(".ui-menu-item").each(function () {
                                        return (e = M(this)).offset().top - i - s < 0;
                                    }),
                                    this.focus(t, e))
                                  : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
                          )
                        : void this.next(t);
                },
                previousPage: function (t) {
                    var e, i, s;
                    return this.active
                        ? void (
                              this.isFirstItem() ||
                              (this._hasScroll()
                                  ? ((i = this.active.offset().top),
                                    (s = this.element.height()),
                                    this.active.prevAll(".ui-menu-item").each(function () {
                                        return 0 < (e = M(this)).offset().top - i + s;
                                    }),
                                    this.focus(t, e))
                                  : this.focus(t, this.activeMenu.find(this.options.items).first()))
                          )
                        : void this.next(t);
                },
                _hasScroll: function () {
                    return this.element.outerHeight() < this.element.prop("scrollHeight");
                },
                select: function (t) {
                    this.active = this.active || M(t.target).closest(".ui-menu-item");
                    var e = { item: this.active };
                    this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, e);
                },
                _filterMenuItems: function (t) {
                    var e = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                        i = RegExp("^" + e, "i");
                    return this.activeMenu
                        .find(this.options.items)
                        .filter(".ui-menu-item")
                        .filter(function () {
                            return i.test(M.trim(M(this).text()));
                        });
                },
            }),
            M.widget("ui.autocomplete", {
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
                    var i,
                        s,
                        n,
                        t = this.element[0].nodeName.toLowerCase(),
                        e = "textarea" === t,
                        a = "input" === t;
                    (this.isMultiLine = !!e || (!a && this.element.prop("isContentEditable"))),
                        (this.valueMethod = this.element[e || a ? "val" : "text"]),
                        (this.isNewMenu = !0),
                        this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
                        this._on(this.element, {
                            keydown: function (t) {
                                if (this.element.prop("readOnly")) s = n = i = !0;
                                else {
                                    s = n = i = !1;
                                    var e = M.ui.keyCode;
                                    switch (t.keyCode) {
                                        case e.PAGE_UP:
                                            (i = !0), this._move("previousPage", t);
                                            break;
                                        case e.PAGE_DOWN:
                                            (i = !0), this._move("nextPage", t);
                                            break;
                                        case e.UP:
                                            (i = !0), this._keyEvent("previous", t);
                                            break;
                                        case e.DOWN:
                                            (i = !0), this._keyEvent("next", t);
                                            break;
                                        case e.ENTER:
                                            this.menu.active && ((i = !0), t.preventDefault(), this.menu.select(t));
                                            break;
                                        case e.TAB:
                                            this.menu.active && this.menu.select(t);
                                            break;
                                        case e.ESCAPE:
                                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(t), t.preventDefault());
                                            break;
                                        default:
                                            (s = !0), this._searchTimeout(t);
                                    }
                                }
                            },
                            keypress: function (t) {
                                if (i) return (i = !1), void ((!this.isMultiLine || this.menu.element.is(":visible")) && t.preventDefault());
                                if (!s) {
                                    var e = M.ui.keyCode;
                                    switch (t.keyCode) {
                                        case e.PAGE_UP:
                                            this._move("previousPage", t);
                                            break;
                                        case e.PAGE_DOWN:
                                            this._move("nextPage", t);
                                            break;
                                        case e.UP:
                                            this._keyEvent("previous", t);
                                            break;
                                        case e.DOWN:
                                            this._keyEvent("next", t);
                                    }
                                }
                            },
                            input: function (t) {
                                return n ? ((n = !1), void t.preventDefault()) : void this._searchTimeout(t);
                            },
                            focus: function () {
                                (this.selectedItem = null), (this.previous = this._value());
                            },
                            blur: function (t) {
                                return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t));
                            },
                        }),
                        this._initSource(),
                        (this.menu = M("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance")),
                        this._on(this.menu.element, {
                            mousedown: function (t) {
                                t.preventDefault(),
                                    (this.cancelBlur = !0),
                                    this._delay(function () {
                                        delete this.cancelBlur;
                                    });
                                var i = this.menu.element[0];
                                M(t.target).closest(".ui-menu-item").length ||
                                    this._delay(function () {
                                        var e = this;
                                        this.document.one("mousedown", function (t) {
                                            t.target === e.element[0] || t.target === i || M.contains(i, t.target) || e.close();
                                        });
                                    });
                            },
                            menufocus: function (t, e) {
                                var i, s;
                                return this.isNewMenu && ((this.isNewMenu = !1), t.originalEvent && /^mouse/.test(t.originalEvent.type))
                                    ? (this.menu.blur(),
                                      void this.document.one("mousemove", function () {
                                          M(t.target).trigger(t.originalEvent);
                                      }))
                                    : ((s = e.item.data("ui-autocomplete-item")),
                                      !1 !== this._trigger("focus", t, { item: s }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(s.value),
                                      void ((i = e.item.attr("aria-label") || s.value) && M.trim(i).length && (this.liveRegion.children().hide(), M("<div>").text(i).appendTo(this.liveRegion))));
                            },
                            menuselect: function (t, e) {
                                var i = e.item.data("ui-autocomplete-item"),
                                    s = this.previous;
                                this.element[0] !== this.document[0].activeElement &&
                                    (this.element.focus(),
                                    (this.previous = s),
                                    this._delay(function () {
                                        (this.previous = s), (this.selectedItem = i);
                                    })),
                                    !1 !== this._trigger("select", t, { item: i }) && this._value(i.value),
                                    (this.term = this._value()),
                                    this.close(t),
                                    (this.selectedItem = i);
                            },
                        }),
                        (this.liveRegion = M("<span>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)),
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
                    var t = this.options.appendTo;
                    return t && (t = t.jquery || t.nodeType ? M(t) : this.document.find(t).eq(0)), (t && t[0]) || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t;
                },
                _initSource: function () {
                    var i,
                        s,
                        n = this;
                    M.isArray(this.options.source)
                        ? ((i = this.options.source),
                          (this.source = function (t, e) {
                              e(M.ui.autocomplete.filter(i, t.term));
                          }))
                        : "string" == typeof this.options.source
                        ? ((s = this.options.source),
                          (this.source = function (t, e) {
                              n.xhr && n.xhr.abort(),
                                  (n.xhr = M.ajax({
                                      url: s,
                                      data: t,
                                      dataType: "json",
                                      success: function (t) {
                                          e(t);
                                      },
                                      error: function () {
                                          e([]);
                                      },
                                  }));
                          }))
                        : (this.source = this.options.source);
                },
                _searchTimeout: function (s) {
                    clearTimeout(this.searching),
                        (this.searching = this._delay(function () {
                            var t = this.term === this._value(),
                                e = this.menu.element.is(":visible"),
                                i = s.altKey || s.ctrlKey || s.metaKey || s.shiftKey;
                            (!t || (t && !e && !i)) && ((this.selectedItem = null), this.search(null, s));
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
                    return M.proxy(function (t) {
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
                _normalize: function (t) {
                    return t.length && t[0].label && t[0].value
                        ? t
                        : M.map(t, function (t) {
                              return "string" == typeof t ? { label: t, value: t } : M.extend({}, t, { label: t.label || t.value, value: t.value || t.label });
                          });
                },
                _suggest: function (t) {
                    var e = this.menu.element.empty();
                    this._renderMenu(e, t), (this.isNewMenu = !0), this.menu.refresh(), e.show(), this._resizeMenu(), e.position(M.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next();
                },
                _resizeMenu: function () {
                    var t = this.menu.element;
                    t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
                },
                _renderMenu: function (i, t) {
                    var s = this;
                    M.each(t, function (t, e) {
                        s._renderItemData(i, e);
                    });
                },
                _renderItemData: function (t, e) {
                    return this._renderItem(t, e).data("ui-autocomplete-item", e);
                },
                _renderItem: function (t, e) {
                    return M("<li>").text(e.label).appendTo(t);
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
            M.extend(M.ui.autocomplete, {
                escapeRegex: function (t) {
                    return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                },
                filter: function (t, e) {
                    var i = RegExp(M.ui.autocomplete.escapeRegex(e), "i");
                    return M.grep(t, function (t) {
                        return i.test(t.label || t.value || t);
                    });
                },
            }),
            M.widget("ui.autocomplete", M.ui.autocomplete, {
                options: {
                    messages: {
                        noResults: "No search results.",
                        results: function (t) {
                            return t + (1 < t ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                        },
                    },
                },
                __response: function (t) {
                    var e;
                    this._superApply(arguments),
                        this.options.disabled ||
                            this.cancelSearch ||
                            ((e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults), this.liveRegion.children().hide(), M("<div>").text(e).appendTo(this.liveRegion));
                },
            }),
            M.ui.autocomplete;
        var m,
            v = "ui-button ui-widget ui-state-default ui-corner-all",
            b = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            w = function () {
                var t = M(this);
                setTimeout(function () {
                    t.find(":ui-button").button("refresh");
                }, 1);
            },
            y = function (t) {
                var e = t.name,
                    i = t.form,
                    s = M([]);
                return (
                    e &&
                        ((e = e.replace(/'/g, "\\'")),
                        (s = i
                            ? M(i).find("[name='" + e + "'][type=radio]")
                            : M("[name='" + e + "'][type=radio]", t.ownerDocument).filter(function () {
                                  return !this.form;
                              }))),
                    s
                );
            },
            k;
        M.widget("ui.button", {
            version: "1.11.4",
            defaultElement: "<button>",
            options: { disabled: null, text: !0, label: null, icons: { primary: null, secondary: null } },
            _create: function () {
                this.element
                    .closest("form")
                    .unbind("reset" + this.eventNamespace)
                    .bind("reset" + this.eventNamespace, w),
                    "boolean" != typeof this.options.disabled ? (this.options.disabled = !!this.element.prop("disabled")) : this.element.prop("disabled", this.options.disabled),
                    this._determineButtonType(),
                    (this.hasTitle = !!this.buttonElement.attr("title"));
                var e = this,
                    i = this.options,
                    t = "checkbox" === this.type || "radio" === this.type,
                    s = t ? "" : "ui-state-active";
                null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
                    this._hoverable(this.buttonElement),
                    this.buttonElement
                        .addClass(v)
                        .attr("role", "button")
                        .bind("mouseenter" + this.eventNamespace, function () {
                            i.disabled || (this === m && M(this).addClass("ui-state-active"));
                        })
                        .bind("mouseleave" + this.eventNamespace, function () {
                            i.disabled || M(this).removeClass(s);
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
                    t &&
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
                              M(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                              var t = e.element[0];
                              y(t)
                                  .not(t)
                                  .map(function () {
                                      return M(this).button("widget")[0];
                                  })
                                  .removeClass("ui-state-active")
                                  .attr("aria-pressed", "false");
                          })
                        : (this.buttonElement
                              .bind("mousedown" + this.eventNamespace, function () {
                                  return (
                                      !i.disabled &&
                                      (M(this).addClass("ui-state-active"),
                                      (m = this),
                                      void e.document.one("mouseup", function () {
                                          m = null;
                                      }))
                                  );
                              })
                              .bind("mouseup" + this.eventNamespace, function () {
                                  return !i.disabled && void M(this).removeClass("ui-state-active");
                              })
                              .bind("keydown" + this.eventNamespace, function (t) {
                                  return !i.disabled && void ((t.keyCode === M.ui.keyCode.SPACE || t.keyCode === M.ui.keyCode.ENTER) && M(this).addClass("ui-state-active"));
                              })
                              .bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                                  M(this).removeClass("ui-state-active");
                              }),
                          this.buttonElement.is("a") &&
                              this.buttonElement.keyup(function (t) {
                                  t.keyCode === M.ui.keyCode.SPACE && M(this).click();
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
                        .removeClass(v + " ui-state-active " + b)
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
                var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                t !== this.options.disabled && this._setOption("disabled", t),
                    "radio" === this.type
                        ? y(this.element[0]).each(function () {
                              M(this).is(":checked") ? M(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : M(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
                          })
                        : "checkbox" === this.type &&
                          (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
            },
            _resetButton: function () {
                if ("input" !== this.type) {
                    var t = this.buttonElement.removeClass(b),
                        e = M("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                        i = this.options.icons,
                        s = i.primary && i.secondary,
                        n = [];
                    i.primary || i.secondary
                        ? (this.options.text && n.push("ui-button-text-icon" + (s ? "s" : i.primary ? "-primary" : "-secondary")),
                          i.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + i.primary + "'></span>"),
                          i.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + i.secondary + "'></span>"),
                          this.options.text || (n.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", M.trim(e))))
                        : n.push("ui-button-text-only"),
                        t.addClass(n.join(" "));
                } else this.options.label && this.element.val(this.options.label);
            },
        }),
            M.widget("ui.buttonset", {
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
                    var t = "rtl" === this.element.css("direction"),
                        e = this.element.find(this.options.items),
                        i = e.filter(":ui-button");
                    e.not(":ui-button").button(),
                        i.button("refresh"),
                        (this.buttons = e
                            .map(function () {
                                return M(this).button("widget")[0];
                            })
                            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
                            .filter(":first")
                            .addClass(t ? "ui-corner-right" : "ui-corner-left")
                            .end()
                            .filter(":last")
                            .addClass(t ? "ui-corner-left" : "ui-corner-right")
                            .end()
                            .end());
                },
                _destroy: function () {
                    this.element.removeClass("ui-buttonset"),
                        this.buttons
                            .map(function () {
                                return M(this).button("widget")[0];
                            })
                            .removeClass("ui-corner-left ui-corner-right")
                            .end()
                            .button("destroy");
                },
            }),
            M.ui.button,
            M.extend(M.ui, { datepicker: { version: "1.11.4" } }),
            M.extend(t.prototype, {
                markerClassName: "hasDatepicker",
                maxRows: 4,
                _widgetDatepicker: function () {
                    return this.dpDiv;
                },
                setDefaults: function (t) {
                    return h(this._defaults, t || {}), this;
                },
                _attachDatepicker: function (t, e) {
                    var i, s, n;
                    (s = "div" === (i = t.nodeName.toLowerCase()) || "span" === i),
                        t.id || ((this.uuid += 1), (t.id = "dp" + this.uuid)),
                        ((n = this._newInst(M(t), s)).settings = M.extend({}, e || {})),
                        "input" === i ? this._connectDatepicker(t, n) : s && this._inlineDatepicker(t, n);
                },
                _newInst: function (t, e) {
                    var i;
                    return {
                        id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                        input: t,
                        selectedDay: 0,
                        selectedMonth: 0,
                        selectedYear: 0,
                        drawMonth: 0,
                        drawYear: 0,
                        inline: e,
                        dpDiv: e ? n(M("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv,
                    };
                },
                _connectDatepicker: function (t, e) {
                    var i = M(t);
                    (e.append = M([])),
                        (e.trigger = M([])),
                        i.hasClass(this.markerClassName) ||
                            (this._attachments(i, e),
                            i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
                            this._autoSize(e),
                            M.data(t, "datepicker", e),
                            e.settings.disabled && this._disableDatepicker(t));
                },
                _attachments: function (t, e) {
                    var i,
                        s,
                        n,
                        a = this._get(e, "appendText"),
                        o = this._get(e, "isRTL");
                    e.append && e.append.remove(),
                        a && ((e.append = M("<span class='" + this._appendClass + "'>" + a + "</span>")), t[o ? "before" : "after"](e.append)),
                        t.unbind("focus", this._showDatepicker),
                        e.trigger && e.trigger.remove(),
                        ("focus" === (i = this._get(e, "showOn")) || "both" === i) && t.focus(this._showDatepicker),
                        ("button" === i || "both" === i) &&
                            ((s = this._get(e, "buttonText")),
                            (n = this._get(e, "buttonImage")),
                            (e.trigger = M(
                                this._get(e, "buttonImageOnly")
                                    ? M("<img/>").addClass(this._triggerClass).attr({ src: n, alt: s, title: s })
                                    : M("<button type='button'></button>")
                                          .addClass(this._triggerClass)
                                          .html(n ? M("<img/>").attr({ src: n, alt: s, title: s }) : s)
                            )),
                            t[o ? "before" : "after"](e.trigger),
                            e.trigger.click(function () {
                                return (
                                    M.datepicker._datepickerShowing && M.datepicker._lastInput === t[0]
                                        ? M.datepicker._hideDatepicker()
                                        : (M.datepicker._datepickerShowing && M.datepicker._lastInput !== t[0] && M.datepicker._hideDatepicker(), M.datepicker._showDatepicker(t[0])),
                                    !1
                                );
                            }));
                },
                _autoSize: function (t) {
                    if (this._get(t, "autoSize") && !t.inline) {
                        var e,
                            i,
                            s,
                            n,
                            a = new Date(2009, 11, 20),
                            o = this._get(t, "dateFormat");
                        o.match(/[DM]/) &&
                            ((e = function (t) {
                                for (n = s = i = 0; t.length > n; n++) t[n].length > i && ((i = t[n].length), (s = n));
                                return s;
                            }),
                            a.setMonth(e(this._get(t, o.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                            a.setDate(e(this._get(t, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())),
                            t.input.attr("size", this._formatDate(t, a).length);
                    }
                },
                _inlineDatepicker: function (t, e) {
                    var i = M(t);
                    i.hasClass(this.markerClassName) ||
                        (i.addClass(this.markerClassName).append(e.dpDiv),
                        M.data(t, "datepicker", e),
                        this._setDate(e, this._getDefaultDate(e), !0),
                        this._updateDatepicker(e),
                        this._updateAlternate(e),
                        e.settings.disabled && this._disableDatepicker(t),
                        e.dpDiv.css("display", "block"));
                },
                _dialogDatepicker: function (t, e, i, s, n) {
                    var a,
                        o,
                        r,
                        l,
                        d,
                        c = this._dialogInst;
                    return (
                        c ||
                            ((this.uuid += 1),
                            (a = "dp" + this.uuid),
                            (this._dialogInput = M("<input type='text' id='" + a + "' style='position: absolute; top: -100px; width: 0px;'/>")),
                            this._dialogInput.keydown(this._doKeyDown),
                            M("body").append(this._dialogInput),
                            ((c = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}),
                            M.data(this._dialogInput[0], "datepicker", c)),
                        h(c.settings, s || {}),
                        (e = e && e.constructor === Date ? this._formatDate(c, e) : e),
                        this._dialogInput.val(e),
                        (this._pos = n ? (n.length ? n : [n.pageX, n.pageY]) : null),
                        this._pos ||
                            ((o = document.documentElement.clientWidth),
                            (r = document.documentElement.clientHeight),
                            (l = document.documentElement.scrollLeft || document.body.scrollLeft),
                            (d = document.documentElement.scrollTop || document.body.scrollTop),
                            (this._pos = [o / 2 - 100 + l, r / 2 - 150 + d])),
                        this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                        (c.settings.onSelect = i),
                        (this._inDialog = !0),
                        this.dpDiv.addClass(this._dialogClass),
                        this._showDatepicker(this._dialogInput[0]),
                        M.blockUI && M.blockUI(this.dpDiv),
                        M.data(this._dialogInput[0], "datepicker", c),
                        this
                    );
                },
                _destroyDatepicker: function (t) {
                    var e,
                        i = M(t),
                        s = M.data(t, "datepicker");
                    i.hasClass(this.markerClassName) &&
                        ((e = t.nodeName.toLowerCase()),
                        M.removeData(t, "datepicker"),
                        "input" === e
                            ? (s.append.remove(),
                              s.trigger.remove(),
                              i.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp))
                            : ("div" === e || "span" === e) && i.removeClass(this.markerClassName).empty(),
                        k === s && (k = null));
                },
                _enableDatepicker: function (e) {
                    var t,
                        i,
                        s = M(e),
                        n = M.data(e, "datepicker");
                    s.hasClass(this.markerClassName) &&
                        ("input" === (t = e.nodeName.toLowerCase())
                            ? ((e.disabled = !1),
                              n.trigger
                                  .filter("button")
                                  .each(function () {
                                      this.disabled = !1;
                                  })
                                  .end()
                                  .filter("img")
                                  .css({ opacity: "1.0", cursor: "" }))
                            : ("div" === t || "span" === t) && ((i = s.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
                        (this._disabledInputs = M.map(this._disabledInputs, function (t) {
                            return t === e ? null : t;
                        })));
                },
                _disableDatepicker: function (e) {
                    var t,
                        i,
                        s = M(e),
                        n = M.data(e, "datepicker");
                    s.hasClass(this.markerClassName) &&
                        ("input" === (t = e.nodeName.toLowerCase())
                            ? ((e.disabled = !0),
                              n.trigger
                                  .filter("button")
                                  .each(function () {
                                      this.disabled = !0;
                                  })
                                  .end()
                                  .filter("img")
                                  .css({ opacity: "0.5", cursor: "default" }))
                            : ("div" === t || "span" === t) && ((i = s.children("." + this._inlineClass)).children().addClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                        (this._disabledInputs = M.map(this._disabledInputs, function (t) {
                            return t === e ? null : t;
                        })),
                        (this._disabledInputs[this._disabledInputs.length] = e));
                },
                _isDisabledDatepicker: function (t) {
                    if (!t) return !1;
                    for (var e = 0; this._disabledInputs.length > e; e++) if (this._disabledInputs[e] === t) return !0;
                    return !1;
                },
                _getInst: function (t) {
                    try {
                        return M.data(t, "datepicker");
                    } catch (t) {
                        throw "Missing instance data for this datepicker";
                    }
                },
                _optionDatepicker: function (t, e, i) {
                    var s,
                        n,
                        a,
                        o,
                        r = this._getInst(t);
                    return 2 === arguments.length && "string" == typeof e
                        ? "defaults" === e
                            ? M.extend({}, M.datepicker._defaults)
                            : r
                            ? "all" === e
                                ? M.extend({}, r.settings)
                                : this._get(r, e)
                            : null
                        : ((s = e || {}),
                          "string" == typeof e && ((s = {})[e] = i),
                          void (
                              r &&
                              (this._curInst === r && this._hideDatepicker(),
                              (n = this._getDateDatepicker(t, !0)),
                              (a = this._getMinMaxDate(r, "min")),
                              (o = this._getMinMaxDate(r, "max")),
                              h(r.settings, s),
                              null !== a && void 0 !== s.dateFormat && void 0 === s.minDate && (r.settings.minDate = this._formatDate(r, a)),
                              null !== o && void 0 !== s.dateFormat && void 0 === s.maxDate && (r.settings.maxDate = this._formatDate(r, o)),
                              "disabled" in s && (s.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)),
                              this._attachments(M(t), r),
                              this._autoSize(r),
                              this._setDate(r, n),
                              this._updateAlternate(r),
                              this._updateDatepicker(r))
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
                _doKeyDown: function (t) {
                    var e,
                        i,
                        s,
                        n = M.datepicker._getInst(t.target),
                        a = !0,
                        o = n.dpDiv.is(".ui-datepicker-rtl");
                    if (((n._keyEvent = !0), M.datepicker._datepickerShowing))
                        switch (t.keyCode) {
                            case 9:
                                M.datepicker._hideDatepicker(), (a = !1);
                                break;
                            case 13:
                                return (
                                    (s = M("td." + M.datepicker._dayOverClass + ":not(." + M.datepicker._currentClass + ")", n.dpDiv))[0] && M.datepicker._selectDay(t.target, n.selectedMonth, n.selectedYear, s[0]),
                                    (e = M.datepicker._get(n, "onSelect")) ? ((i = M.datepicker._formatDate(n)), e.apply(n.input ? n.input[0] : null, [i, n])) : M.datepicker._hideDatepicker(),
                                    !1
                                );
                            case 27:
                                M.datepicker._hideDatepicker();
                                break;
                            case 33:
                                M.datepicker._adjustDate(t.target, t.ctrlKey ? -M.datepicker._get(n, "stepBigMonths") : -M.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 34:
                                M.datepicker._adjustDate(t.target, t.ctrlKey ? +M.datepicker._get(n, "stepBigMonths") : +M.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 35:
                                (t.ctrlKey || t.metaKey) && M.datepicker._clearDate(t.target), (a = t.ctrlKey || t.metaKey);
                                break;
                            case 36:
                                (t.ctrlKey || t.metaKey) && M.datepicker._gotoToday(t.target), (a = t.ctrlKey || t.metaKey);
                                break;
                            case 37:
                                (t.ctrlKey || t.metaKey) && M.datepicker._adjustDate(t.target, o ? 1 : -1, "D"),
                                    (a = t.ctrlKey || t.metaKey),
                                    t.originalEvent.altKey && M.datepicker._adjustDate(t.target, t.ctrlKey ? -M.datepicker._get(n, "stepBigMonths") : -M.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 38:
                                (t.ctrlKey || t.metaKey) && M.datepicker._adjustDate(t.target, -7, "D"), (a = t.ctrlKey || t.metaKey);
                                break;
                            case 39:
                                (t.ctrlKey || t.metaKey) && M.datepicker._adjustDate(t.target, o ? -1 : 1, "D"),
                                    (a = t.ctrlKey || t.metaKey),
                                    t.originalEvent.altKey && M.datepicker._adjustDate(t.target, t.ctrlKey ? +M.datepicker._get(n, "stepBigMonths") : +M.datepicker._get(n, "stepMonths"), "M");
                                break;
                            case 40:
                                (t.ctrlKey || t.metaKey) && M.datepicker._adjustDate(t.target, 7, "D"), (a = t.ctrlKey || t.metaKey);
                                break;
                            default:
                                a = !1;
                        }
                    else 36 === t.keyCode && t.ctrlKey ? M.datepicker._showDatepicker(this) : (a = !1);
                    a && (t.preventDefault(), t.stopPropagation());
                },
                _doKeyPress: function (t) {
                    var e,
                        i,
                        s = M.datepicker._getInst(t.target);
                    return M.datepicker._get(s, "constrainInput")
                        ? ((e = M.datepicker._possibleChars(M.datepicker._get(s, "dateFormat"))), (i = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode)), t.ctrlKey || t.metaKey || i < " " || !e || -1 < e.indexOf(i))
                        : void 0;
                },
                _doKeyUp: function (t) {
                    var e,
                        i = M.datepicker._getInst(t.target);
                    if (i.input.val() !== i.lastVal)
                        try {
                            (e = M.datepicker.parseDate(M.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, M.datepicker._getFormatConfig(i))) &&
                                (M.datepicker._setDateFromField(i), M.datepicker._updateAlternate(i), M.datepicker._updateDatepicker(i));
                        } catch (t) {}
                    return !0;
                },
                _showDatepicker: function (t) {
                    var e, i, s, n, a, o, r;
                    ("input" !== (t = t.target || t).nodeName.toLowerCase() && (t = M("input", t.parentNode)[0]), M.datepicker._isDisabledDatepicker(t) || M.datepicker._lastInput === t) ||
                        ((e = M.datepicker._getInst(t)),
                        M.datepicker._curInst && M.datepicker._curInst !== e && (M.datepicker._curInst.dpDiv.stop(!0, !0), e && M.datepicker._datepickerShowing && M.datepicker._hideDatepicker(M.datepicker._curInst.input[0])),
                        !1 !== (s = (i = M.datepicker._get(e, "beforeShow")) ? i.apply(t, [t, e]) : {}) &&
                            (h(e.settings, s),
                            (e.lastVal = null),
                            (M.datepicker._lastInput = t),
                            M.datepicker._setDateFromField(e),
                            M.datepicker._inDialog && (t.value = ""),
                            M.datepicker._pos || ((M.datepicker._pos = M.datepicker._findPos(t)), (M.datepicker._pos[1] += t.offsetHeight)),
                            (n = !1),
                            M(t)
                                .parents()
                                .each(function () {
                                    return !(n |= "fixed" === M(this).css("position"));
                                }),
                            (a = { left: M.datepicker._pos[0], top: M.datepicker._pos[1] }),
                            (M.datepicker._pos = null),
                            e.dpDiv.empty(),
                            e.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }),
                            M.datepicker._updateDatepicker(e),
                            (a = M.datepicker._checkOffset(e, a, n)),
                            e.dpDiv.css({ position: M.datepicker._inDialog && M.blockUI ? "static" : n ? "fixed" : "absolute", display: "none", left: a.left + "px", top: a.top + "px" }),
                            e.inline ||
                                ((o = M.datepicker._get(e, "showAnim")),
                                (r = M.datepicker._get(e, "duration")),
                                e.dpDiv.css("z-index", l(M(t)) + 1),
                                (M.datepicker._datepickerShowing = !0),
                                M.effects && M.effects.effect[o] ? e.dpDiv.show(o, M.datepicker._get(e, "showOptions"), r) : e.dpDiv[o || "show"](o ? r : null),
                                M.datepicker._shouldFocusInput(e) && e.input.focus(),
                                (M.datepicker._curInst = e))));
                },
                _updateDatepicker: function (t) {
                    (this.maxRows = 4), (k = t).dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
                    var e,
                        i = this._getNumberOfMonths(t),
                        s = i[1],
                        n = 17,
                        a = t.dpDiv.find("." + this._dayOverClass + " a");
                    0 < a.length && r.apply(a.get(0)),
                        t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                        1 < s && t.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", 17 * s + "em"),
                        t.dpDiv[(1 !== i[0] || 1 !== i[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                        t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                        t === M.datepicker._curInst && M.datepicker._datepickerShowing && M.datepicker._shouldFocusInput(t) && t.input.focus(),
                        t.yearshtml &&
                            ((e = t.yearshtml),
                            setTimeout(function () {
                                e === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), (e = t.yearshtml = null);
                            }, 0));
                },
                _shouldFocusInput: function (t) {
                    return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus");
                },
                _checkOffset: function (t, e, i) {
                    var s = t.dpDiv.outerWidth(),
                        n = t.dpDiv.outerHeight(),
                        a = t.input ? t.input.outerWidth() : 0,
                        o = t.input ? t.input.outerHeight() : 0,
                        r = document.documentElement.clientWidth + (i ? 0 : M(document).scrollLeft()),
                        l = document.documentElement.clientHeight + (i ? 0 : M(document).scrollTop());
                    return (
                        (e.left -= this._get(t, "isRTL") ? s - a : 0),
                        (e.left -= i && e.left === t.input.offset().left ? M(document).scrollLeft() : 0),
                        (e.top -= i && e.top === t.input.offset().top + o ? M(document).scrollTop() : 0),
                        (e.left -= Math.min(e.left, e.left + s > r && s < r ? Math.abs(e.left + s - r) : 0)),
                        (e.top -= Math.min(e.top, e.top + n > l && n < l ? Math.abs(n + o) : 0)),
                        e
                    );
                },
                _findPos: function (t) {
                    for (var e, i = this._getInst(t), s = this._get(i, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || M.expr.filters.hidden(t)); ) t = t[s ? "previousSibling" : "nextSibling"];
                    return [(e = M(t).offset()).left, e.top];
                },
                _hideDatepicker: function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a = this._curInst;
                    !a ||
                        (t && a !== M.data(t, "datepicker")) ||
                        (this._datepickerShowing &&
                            ((e = this._get(a, "showAnim")),
                            (i = this._get(a, "duration")),
                            (s = function () {
                                M.datepicker._tidyDialog(a);
                            }),
                            M.effects && (M.effects.effect[e] || M.effects[e]) ? a.dpDiv.hide(e, M.datepicker._get(a, "showOptions"), i, s) : a.dpDiv["slideDown" === e ? "slideUp" : "fadeIn" === e ? "fadeOut" : "hide"](e ? i : null, s),
                            e || s(),
                            (this._datepickerShowing = !1),
                            (n = this._get(a, "onClose")) && n.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]),
                            (this._lastInput = null),
                            this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), M.blockUI && (M.unblockUI(), M("body").append(this.dpDiv))),
                            (this._inDialog = !1)));
                },
                _tidyDialog: function (t) {
                    t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
                },
                _checkExternalClick: function (t) {
                    if (M.datepicker._curInst) {
                        var e = M(t.target),
                            i = M.datepicker._getInst(e[0]);
                        ((e[0].id !== M.datepicker._mainDivId &&
                            0 === e.parents("#" + M.datepicker._mainDivId).length &&
                            !e.hasClass(M.datepicker.markerClassName) &&
                            !e.closest("." + M.datepicker._triggerClass).length &&
                            M.datepicker._datepickerShowing &&
                            (!M.datepicker._inDialog || !M.blockUI)) ||
                            (e.hasClass(M.datepicker.markerClassName) && M.datepicker._curInst !== i)) &&
                            M.datepicker._hideDatepicker();
                    }
                },
                _adjustDate: function (t, e, i) {
                    var s = M(t),
                        n = this._getInst(s[0]);
                    this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(n, e + ("M" === i ? this._get(n, "showCurrentAtPos") : 0), i), this._updateDatepicker(n));
                },
                _gotoToday: function (t) {
                    var e,
                        i = M(t),
                        s = this._getInst(i[0]);
                    this._get(s, "gotoCurrent") && s.currentDay
                        ? ((s.selectedDay = s.currentDay), (s.drawMonth = s.selectedMonth = s.currentMonth), (s.drawYear = s.selectedYear = s.currentYear))
                        : ((e = new Date()), (s.selectedDay = e.getDate()), (s.drawMonth = s.selectedMonth = e.getMonth()), (s.drawYear = s.selectedYear = e.getFullYear())),
                        this._notifyChange(s),
                        this._adjustDate(i);
                },
                _selectMonthYear: function (t, e, i) {
                    var s = M(t),
                        n = this._getInst(s[0]);
                    (n["selected" + ("M" === i ? "Month" : "Year")] = n["draw" + ("M" === i ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10)), this._notifyChange(n), this._adjustDate(s);
                },
                _selectDay: function (t, e, i, s) {
                    var n,
                        a = M(t);
                    M(s).hasClass(this._unselectableClass) ||
                        this._isDisabledDatepicker(a[0]) ||
                        (((n = this._getInst(a[0])).selectedDay = n.currentDay = M("a", s).html()),
                        (n.selectedMonth = n.currentMonth = e),
                        (n.selectedYear = n.currentYear = i),
                        this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)));
                },
                _clearDate: function (t) {
                    var e = M(t);
                    this._selectDate(e, "");
                },
                _selectDate: function (t, e) {
                    var i,
                        s = M(t),
                        n = this._getInst(s[0]);
                    (e = null != e ? e : this._formatDate(n)),
                        n.input && n.input.val(e),
                        this._updateAlternate(n),
                        (i = this._get(n, "onSelect")) ? i.apply(n.input ? n.input[0] : null, [e, n]) : n.input && n.input.trigger("change"),
                        n.inline ? this._updateDatepicker(n) : (this._hideDatepicker(), (this._lastInput = n.input[0]), "object" != typeof n.input[0] && n.input.focus(), (this._lastInput = null));
                },
                _updateAlternate: function (t) {
                    var e,
                        i,
                        s,
                        n = this._get(t, "altField");
                    n &&
                        ((e = this._get(t, "altFormat") || this._get(t, "dateFormat")),
                        (i = this._getDate(t)),
                        (s = this.formatDate(e, i, this._getFormatConfig(t))),
                        M(n).each(function () {
                            M(this).val(s);
                        }));
                },
                noWeekends: function (t) {
                    var e = t.getDay();
                    return [0 < e && e < 6, ""];
                },
                iso8601Week: function (t) {
                    var e,
                        i = new Date(t.getTime());
                    return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), (e = i.getTime()), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1;
                },
                parseDate: function (i, o, t) {
                    if (null == i || null == o) throw "Invalid arguments";
                    if ("" === (o = "object" == typeof o ? "" + o : o + "")) return null;
                    var s,
                        e,
                        n,
                        a,
                        r = 0,
                        l = (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                        d = "string" != typeof l ? l : (new Date().getFullYear() % 100) + parseInt(l, 10),
                        c = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort,
                        h = (t ? t.dayNames : null) || this._defaults.dayNames,
                        u = (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort,
                        p = (t ? t.monthNames : null) || this._defaults.monthNames,
                        f = -1,
                        g = -1,
                        m = -1,
                        v = -1,
                        b = !1,
                        w = function (t) {
                            var e = i.length > s + 1 && i.charAt(s + 1) === t;
                            return e && s++, e;
                        },
                        y = function (t) {
                            var e = w(t),
                                i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                                s,
                                n = RegExp("^\\d{" + ("y" === t ? i : 1) + "," + i + "}"),
                                a = o.substring(r).match(n);
                            if (!a) throw "Missing number at position " + r;
                            return (r += a[0].length), parseInt(a[0], 10);
                        },
                        k = function (t, e, i) {
                            var s = -1,
                                n = M.map(w(t) ? i : e, function (t, e) {
                                    return [[e, t]];
                                }).sort(function (t, e) {
                                    return -(t[1].length - e[1].length);
                                });
                            if (
                                (M.each(n, function (t, e) {
                                    var i = e[1];
                                    return o.substr(r, i.length).toLowerCase() === i.toLowerCase() ? ((s = e[0]), (r += i.length), !1) : void 0;
                                }),
                                -1 !== s)
                            )
                                return s + 1;
                            throw "Unknown name at position " + r;
                        },
                        _ = function () {
                            if (o.charAt(r) !== i.charAt(s)) throw "Unexpected literal at position " + r;
                            r++;
                        };
                    for (s = 0; i.length > s; s++)
                        if (b) "'" !== i.charAt(s) || w("'") ? _() : (b = !1);
                        else
                            switch (i.charAt(s)) {
                                case "d":
                                    m = y("d");
                                    break;
                                case "D":
                                    k("D", c, h);
                                    break;
                                case "o":
                                    v = y("o");
                                    break;
                                case "m":
                                    g = y("m");
                                    break;
                                case "M":
                                    g = k("M", u, p);
                                    break;
                                case "y":
                                    f = y("y");
                                    break;
                                case "@":
                                    (f = (a = new Date(y("@"))).getFullYear()), (g = a.getMonth() + 1), (m = a.getDate());
                                    break;
                                case "!":
                                    (f = (a = new Date((y("!") - this._ticksTo1970) / 1e4)).getFullYear()), (g = a.getMonth() + 1), (m = a.getDate());
                                    break;
                                case "'":
                                    w("'") ? _() : (b = !0);
                                    break;
                                default:
                                    _();
                            }
                    if (o.length > r && ((n = o.substr(r)), !/^\s+/.test(n))) throw "Extra/unparsed characters found in date: " + n;
                    if ((-1 === f ? (f = new Date().getFullYear()) : f < 100 && (f += new Date().getFullYear() - (new Date().getFullYear() % 100) + (f <= d ? 0 : -100)), -1 < v))
                        for (g = 1, m = v; !(m <= (e = this._getDaysInMonth(f, g - 1))); ) g++, (m -= e);
                    if ((a = this._daylightSavingAdjust(new Date(f, g - 1, m))).getFullYear() !== f || a.getMonth() + 1 !== g || a.getDate() !== m) throw "Invalid date";
                    return a;
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
                formatDate: function (i, t, e) {
                    if (!t) return "";
                    var s,
                        n = (e ? e.dayNamesShort : null) || this._defaults.dayNamesShort,
                        a = (e ? e.dayNames : null) || this._defaults.dayNames,
                        o = (e ? e.monthNamesShort : null) || this._defaults.monthNamesShort,
                        r = (e ? e.monthNames : null) || this._defaults.monthNames,
                        l = function (t) {
                            var e = i.length > s + 1 && i.charAt(s + 1) === t;
                            return e && s++, e;
                        },
                        d = function (t, e, i) {
                            var s = "" + e;
                            if (l(t)) for (; i > s.length; ) s = "0" + s;
                            return s;
                        },
                        c = function (t, e, i, s) {
                            return l(t) ? s[e] : i[e];
                        },
                        h = "",
                        u = !1;
                    if (t)
                        for (s = 0; i.length > s; s++)
                            if (u) "'" !== i.charAt(s) || l("'") ? (h += i.charAt(s)) : (u = !1);
                            else
                                switch (i.charAt(s)) {
                                    case "d":
                                        h += d("d", t.getDate(), 2);
                                        break;
                                    case "D":
                                        h += c("D", t.getDay(), n, a);
                                        break;
                                    case "o":
                                        h += d("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                        break;
                                    case "m":
                                        h += d("m", t.getMonth() + 1, 2);
                                        break;
                                    case "M":
                                        h += c("M", t.getMonth(), o, r);
                                        break;
                                    case "y":
                                        h += l("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + (t.getYear() % 100);
                                        break;
                                    case "@":
                                        h += t.getTime();
                                        break;
                                    case "!":
                                        h += 1e4 * t.getTime() + this._ticksTo1970;
                                        break;
                                    case "'":
                                        l("'") ? (h += "'") : (u = !0);
                                        break;
                                    default:
                                        h += i.charAt(s);
                                }
                    return h;
                },
                _possibleChars: function (i) {
                    var s,
                        t = "",
                        e = !1,
                        n = function (t) {
                            var e = i.length > s + 1 && i.charAt(s + 1) === t;
                            return e && s++, e;
                        };
                    for (s = 0; i.length > s; s++)
                        if (e) "'" !== i.charAt(s) || n("'") ? (t += i.charAt(s)) : (e = !1);
                        else
                            switch (i.charAt(s)) {
                                case "d":
                                case "m":
                                case "y":
                                case "@":
                                    t += "0123456789";
                                    break;
                                case "D":
                                case "M":
                                    return null;
                                case "'":
                                    n("'") ? (t += "'") : (e = !0);
                                    break;
                                default:
                                    t += i.charAt(s);
                            }
                    return t;
                },
                _get: function (t, e) {
                    return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
                },
                _setDateFromField: function (t, e) {
                    if (t.input.val() !== t.lastVal) {
                        var i = this._get(t, "dateFormat"),
                            s = (t.lastVal = t.input ? t.input.val() : null),
                            n = this._getDefaultDate(t),
                            a = n,
                            o = this._getFormatConfig(t);
                        try {
                            a = this.parseDate(i, s, o) || n;
                        } catch (t) {
                            s = e ? "" : s;
                        }
                        (t.selectedDay = a.getDate()),
                            (t.drawMonth = t.selectedMonth = a.getMonth()),
                            (t.drawYear = t.selectedYear = a.getFullYear()),
                            (t.currentDay = s ? a.getDate() : 0),
                            (t.currentMonth = s ? a.getMonth() : 0),
                            (t.currentYear = s ? a.getFullYear() : 0),
                            this._adjustInstDate(t);
                    }
                },
                _getDefaultDate: function (t) {
                    return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
                },
                _determineDate: function (r, t, e) {
                    var i = function (t) {
                            var e = new Date();
                            return e.setDate(e.getDate() + t), e;
                        },
                        s,
                        n =
                            null == t || "" === t
                                ? e
                                : "string" == typeof t
                                ? (function (t) {
                                      try {
                                          return M.datepicker.parseDate(M.datepicker._get(r, "dateFormat"), t, M.datepicker._getFormatConfig(r));
                                      } catch (t) {}
                                      for (
                                          var e = (t.toLowerCase().match(/^c/) ? M.datepicker._getDate(r) : null) || new Date(),
                                              i = e.getFullYear(),
                                              s = e.getMonth(),
                                              n = e.getDate(),
                                              a = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                                              o = a.exec(t);
                                          o;

                                      ) {
                                          switch (o[2] || "d") {
                                              case "d":
                                              case "D":
                                                  n += parseInt(o[1], 10);
                                                  break;
                                              case "w":
                                              case "W":
                                                  n += 7 * parseInt(o[1], 10);
                                                  break;
                                              case "m":
                                              case "M":
                                                  (s += parseInt(o[1], 10)), (n = Math.min(n, M.datepicker._getDaysInMonth(i, s)));
                                                  break;
                                              case "y":
                                              case "Y":
                                                  (i += parseInt(o[1], 10)), (n = Math.min(n, M.datepicker._getDaysInMonth(i, s)));
                                          }
                                          o = a.exec(t);
                                      }
                                      return new Date(i, s, n);
                                  })(t)
                                : "number" == typeof t
                                ? isNaN(t)
                                    ? e
                                    : i(t)
                                : new Date(t.getTime());
                    return (n = n && "Invalid Date" == "" + n ? e : n) && (n.setHours(0), n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0)), this._daylightSavingAdjust(n);
                },
                _daylightSavingAdjust: function (t) {
                    return t ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t) : null;
                },
                _setDate: function (t, e, i) {
                    var s = !e,
                        n = t.selectedMonth,
                        a = t.selectedYear,
                        o = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
                    (t.selectedDay = t.currentDay = o.getDate()),
                        (t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth()),
                        (t.drawYear = t.selectedYear = t.currentYear = o.getFullYear()),
                        (n === t.selectedMonth && a === t.selectedYear) || i || this._notifyChange(t),
                        this._adjustInstDate(t),
                        t.input && t.input.val(s ? "" : this._formatDate(t));
                },
                _getDate: function (t) {
                    var e;
                    return !t.currentYear || (t.input && "" === t.input.val()) ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                },
                _attachHandlers: function (t) {
                    var e = this._get(t, "stepMonths"),
                        i = "#" + t.id.replace(/\\\\/g, "\\");
                    t.dpDiv.find("[data-handler]").map(function () {
                        var t = {
                            prev: function () {
                                M.datepicker._adjustDate(i, -e, "M");
                            },
                            next: function () {
                                M.datepicker._adjustDate(i, +e, "M");
                            },
                            hide: function () {
                                M.datepicker._hideDatepicker();
                            },
                            today: function () {
                                M.datepicker._gotoToday(i);
                            },
                            selectDay: function () {
                                return M.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
                            },
                            selectMonth: function () {
                                return M.datepicker._selectMonthYear(i, this, "M"), !1;
                            },
                            selectYear: function () {
                                return M.datepicker._selectMonthYear(i, this, "Y"), !1;
                            },
                        };
                        M(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
                    });
                },
                _generateHTML: function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a,
                        o,
                        r,
                        l,
                        d,
                        c,
                        h,
                        u,
                        p,
                        f,
                        g,
                        m,
                        v,
                        b,
                        w,
                        y,
                        k,
                        _,
                        C,
                        x,
                        S,
                        T,
                        D,
                        M,
                        $,
                        L,
                        I,
                        P,
                        F,
                        A,
                        E,
                        z,
                        O,
                        R,
                        W,
                        j = new Date(),
                        B = this._daylightSavingAdjust(new Date(j.getFullYear(), j.getMonth(), j.getDate())),
                        H = this._get(t, "isRTL"),
                        N = this._get(t, "showButtonPanel"),
                        V = this._get(t, "hideIfNoPrevNext"),
                        Y = this._get(t, "navigationAsDateFormat"),
                        G = this._getNumberOfMonths(t),
                        q = this._get(t, "showCurrentAtPos"),
                        U = this._get(t, "stepMonths"),
                        X = 1 !== G[0] || 1 !== G[1],
                        K = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                        Q = this._getMinMaxDate(t, "min"),
                        J = this._getMinMaxDate(t, "max"),
                        Z = t.drawMonth - q,
                        tt = t.drawYear;
                    if ((Z < 0 && ((Z += 12), tt--), J))
                        for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - G[0] * G[1] + 1, J.getDate())), e = Q && e < Q ? Q : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e; ) --Z < 0 && ((Z = 11), tt--);
                    for (
                        t.drawMonth = Z,
                            t.drawYear = tt,
                            i = this._get(t, "prevText"),
                            i = Y ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - U, 1)), this._getFormatConfig(t)) : i,
                            s = this._canAdjustMonth(t, -1, tt, Z)
                                ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (H ? "e" : "w") + "'>" + i + "</span></a>"
                                : V
                                ? ""
                                : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (H ? "e" : "w") + "'>" + i + "</span></a>",
                            n = this._get(t, "nextText"),
                            n = Y ? this.formatDate(n, this._daylightSavingAdjust(new Date(tt, Z + U, 1)), this._getFormatConfig(t)) : n,
                            a = this._canAdjustMonth(t, 1, tt, Z)
                                ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (H ? "w" : "e") + "'>" + n + "</span></a>"
                                : V
                                ? ""
                                : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (H ? "w" : "e") + "'>" + n + "</span></a>",
                            o = this._get(t, "currentText"),
                            r = this._get(t, "gotoCurrent") && t.currentDay ? K : B,
                            o = Y ? this.formatDate(o, r, this._getFormatConfig(t)) : o,
                            l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>",
                            d = N
                                ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                                  (H ? l : "") +
                                  (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") +
                                  (H ? "" : l) +
                                  "</div>"
                                : "",
                            c = parseInt(this._get(t, "firstDay"), 10),
                            c = isNaN(c) ? 0 : c,
                            h = this._get(t, "showWeek"),
                            u = this._get(t, "dayNames"),
                            p = this._get(t, "dayNamesMin"),
                            f = this._get(t, "monthNames"),
                            g = this._get(t, "monthNamesShort"),
                            m = this._get(t, "beforeShowDay"),
                            v = this._get(t, "showOtherMonths"),
                            b = this._get(t, "selectOtherMonths"),
                            w = this._getDefaultDate(t),
                            y = "",
                            _ = 0;
                        G[0] > _;
                        _++
                    ) {
                        for (C = "", this.maxRows = 4, x = 0; G[1] > x; x++) {
                            if (((S = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay))), (T = " ui-corner-all"), (D = ""), X)) {
                                if (((D += "<div class='ui-datepicker-group"), 1 < G[1]))
                                    switch (x) {
                                        case 0:
                                            (D += " ui-datepicker-group-first"), (T = " ui-corner-" + (H ? "right" : "left"));
                                            break;
                                        case G[1] - 1:
                                            (D += " ui-datepicker-group-last"), (T = " ui-corner-" + (H ? "left" : "right"));
                                            break;
                                        default:
                                            (D += " ui-datepicker-group-middle"), (T = "");
                                    }
                                D += "'>";
                            }
                            for (
                                D +=
                                    "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                                    T +
                                    "'>" +
                                    (/all|left/.test(T) && 0 === _ ? (H ? a : s) : "") +
                                    (/all|right/.test(T) && 0 === _ ? (H ? s : a) : "") +
                                    this._generateMonthYearHeader(t, Z, tt, Q, J, 0 < _ || 0 < x, f, g) +
                                    "</div><table class='ui-datepicker-calendar'><thead><tr>",
                                    M = h ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "",
                                    k = 0;
                                k < 7;
                                k++
                            )
                                M += "<th scope='col'" + (5 <= (k + c + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + u[($ = (k + c) % 7)] + "'>" + p[$] + "</span></th>";
                            for (
                                D += M + "</tr></thead><tbody>",
                                    L = this._getDaysInMonth(tt, Z),
                                    tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, L)),
                                    I = (this._getFirstDayOfMonth(tt, Z) - c + 7) % 7,
                                    P = Math.ceil((I + L) / 7),
                                    F = X && this.maxRows > P ? this.maxRows : P,
                                    this.maxRows = F,
                                    A = this._daylightSavingAdjust(new Date(tt, Z, 1 - I)),
                                    E = 0;
                                E < F;
                                E++
                            ) {
                                for (D += "<tr>", z = h ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(A) + "</td>" : "", k = 0; k < 7; k++)
                                    (O = m ? m.apply(t.input ? t.input[0] : null, [A]) : [!0, ""]),
                                        (W = ((R = A.getMonth() !== Z) && !b) || !O[0] || (Q && A < Q) || (J && J < A)),
                                        (z +=
                                            "<td class='" +
                                            (5 <= (k + c + 6) % 7 ? " ui-datepicker-week-end" : "") +
                                            (R ? " ui-datepicker-other-month" : "") +
                                            ((A.getTime() === S.getTime() && Z === t.selectedMonth && t._keyEvent) || (w.getTime() === A.getTime() && w.getTime() === S.getTime()) ? " " + this._dayOverClass : "") +
                                            (W ? " " + this._unselectableClass + " ui-state-disabled" : "") +
                                            (R && !v ? "" : " " + O[1] + (A.getTime() === K.getTime() ? " " + this._currentClass : "") + (A.getTime() === B.getTime() ? " ui-datepicker-today" : "")) +
                                            "'" +
                                            ((R && !v) || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") +
                                            (W ? "" : " data-handler='selectDay' data-event='click' data-month='" + A.getMonth() + "' data-year='" + A.getFullYear() + "'") +
                                            ">" +
                                            (R && !v
                                                ? "&#xa0;"
                                                : W
                                                ? "<span class='ui-state-default'>" + A.getDate() + "</span>"
                                                : "<a class='ui-state-default" +
                                                  (A.getTime() === B.getTime() ? " ui-state-highlight" : "") +
                                                  (A.getTime() === K.getTime() ? " ui-state-active" : "") +
                                                  (R ? " ui-priority-secondary" : "") +
                                                  "' href='#'>" +
                                                  A.getDate() +
                                                  "</a>") +
                                            "</td>"),
                                        A.setDate(A.getDate() + 1),
                                        (A = this._daylightSavingAdjust(A));
                                D += z + "</tr>";
                            }
                            11 < ++Z && ((Z = 0), tt++), (C += D += "</tbody></table>" + (X ? "</div>" + (0 < G[0] && x === G[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""));
                        }
                        y += C;
                    }
                    return (y += d), (t._keyEvent = !1), y;
                },
                _generateMonthYearHeader: function (t, e, i, s, n, a, o, r) {
                    var l,
                        d,
                        c,
                        h,
                        u,
                        p,
                        f,
                        g,
                        m = this._get(t, "changeMonth"),
                        v = this._get(t, "changeYear"),
                        b = this._get(t, "showMonthAfterYear"),
                        w = "<div class='ui-datepicker-title'>",
                        y = "";
                    if (a || !m) y += "<span class='ui-datepicker-month'>" + o[e] + "</span>";
                    else {
                        for (l = s && s.getFullYear() === i, d = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; c < 12; c++)
                            (!l || c >= s.getMonth()) && (!d || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                        y += "</select>";
                    }
                    if ((b || (w += y + (!a && m && v ? "" : "&#xa0;")), !t.yearshtml))
                        if (((t.yearshtml = ""), a || !v)) w += "<span class='ui-datepicker-year'>" + i + "</span>";
                        else {
                            for (
                                h = this._get(t, "yearRange").split(":"),
                                    u = new Date().getFullYear(),
                                    f = (p = function (t) {
                                        var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? u + parseInt(t, 10) : parseInt(t, 10);
                                        return isNaN(e) ? u : e;
                                    })(h[0]),
                                    g = Math.max(f, p(h[1] || "")),
                                    f = s ? Math.max(f, s.getFullYear()) : f,
                                    g = n ? Math.min(g, n.getFullYear()) : g,
                                    t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                                f <= g;
                                f++
                            )
                                t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                            (t.yearshtml += "</select>"), (w += t.yearshtml), (t.yearshtml = null);
                        }
                    return (w += this._get(t, "yearSuffix")), b && (w += (!a && m && v ? "" : "&#xa0;") + y), w + "</div>";
                },
                _adjustInstDate: function (t, e, i) {
                    var s = t.drawYear + ("Y" === i ? e : 0),
                        n = t.drawMonth + ("M" === i ? e : 0),
                        a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
                        o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a)));
                    (t.selectedDay = o.getDate()), (t.drawMonth = t.selectedMonth = o.getMonth()), (t.drawYear = t.selectedYear = o.getFullYear()), ("M" === i || "Y" === i) && this._notifyChange(t);
                },
                _restrictMinMax: function (t, e) {
                    var i = this._getMinMaxDate(t, "min"),
                        s = this._getMinMaxDate(t, "max"),
                        n = i && e < i ? i : e;
                    return s && s < n ? s : n;
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
                _canAdjustMonth: function (t, e, i, s) {
                    var n = this._getNumberOfMonths(t),
                        a = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
                    return e < 0 && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(t, a);
                },
                _isInRange: function (t, e) {
                    var i,
                        s,
                        n = this._getMinMaxDate(t, "min"),
                        a = this._getMinMaxDate(t, "max"),
                        o = null,
                        r = null,
                        l = this._get(t, "yearRange");
                    return (
                        l && ((i = l.split(":")), (s = new Date().getFullYear()), (o = parseInt(i[0], 10)), (r = parseInt(i[1], 10)), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)),
                        (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!o || e.getFullYear() >= o) && (!r || r >= e.getFullYear())
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
                _formatDate: function (t, e, i, s) {
                    e || ((t.currentDay = t.selectedDay), (t.currentMonth = t.selectedMonth), (t.currentYear = t.selectedYear));
                    var n = e ? ("object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e))) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                    return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t));
                },
            }),
            (M.fn.datepicker = function (t, e) {
                if (!this.length) return this;
                M.datepicker.initialized || (M(document).mousedown(M.datepicker._checkExternalClick), (M.datepicker.initialized = !0)), 0 === M("#" + M.datepicker._mainDivId).length && M("body").append(M.datepicker.dpDiv);
                var i = Array.prototype.slice.call(arguments, 1);
                return "string" != typeof t || ("isDisabled" !== t && "getDate" !== t && "widget" !== t)
                    ? "option" === t && 2 === arguments.length && "string" == typeof e
                        ? M.datepicker["_" + t + "Datepicker"].apply(M.datepicker, [this[0]].concat(i))
                        : this.each(function () {
                              "string" == typeof t ? M.datepicker["_" + t + "Datepicker"].apply(M.datepicker, [this].concat(i)) : M.datepicker._attachDatepicker(this, t);
                          })
                    : M.datepicker["_" + t + "Datepicker"].apply(M.datepicker, [this[0]].concat(i));
            }),
            (M.datepicker = new t()),
            (M.datepicker.initialized = !1),
            (M.datepicker.uuid = new Date().getTime()),
            (M.datepicker.version = "1.11.4"),
            M.datepicker,
            M.widget("ui.slider", M.ui.mouse, {
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
                    var t,
                        e,
                        i = this.options,
                        s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                        n = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                        a = [];
                    for (e = (i.values && i.values.length) || 1, s.length > e && (s.slice(e).remove(), (s = s.slice(0, e))), t = s.length; t < e; t++) a.push(n);
                    (this.handles = s.add(M(a.join("")).appendTo(this.element))),
                        (this.handle = this.handles.eq(0)),
                        this.handles.each(function (t) {
                            M(this).data("ui-slider-handle-index", t);
                        });
                },
                _createRange: function () {
                    var t = this.options,
                        e = "";
                    t.range
                        ? (!0 === t.range &&
                              (t.values ? (t.values.length && 2 !== t.values.length ? (t.values = [t.values[0], t.values[0]]) : M.isArray(t.values) && (t.values = t.values.slice(0))) : (t.values = [this._valueMin(), this._valueMin()])),
                          this.range && this.range.length
                              ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" })
                              : ((this.range = M("<div></div>").appendTo(this.element)), (e = "ui-slider-range ui-widget-header ui-corner-all")),
                          this.range.addClass(e + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : "")))
                        : (this.range && this.range.remove(), (this.range = null));
                },
                _setupEvents: function () {
                    this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
                },
                _destroy: function () {
                    this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy();
                },
                _mouseCapture: function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a,
                        o,
                        r,
                        l,
                        d = this,
                        c = this.options;
                    return (
                        !c.disabled &&
                        ((this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }),
                        (this.elementOffset = this.element.offset()),
                        (e = { x: t.pageX, y: t.pageY }),
                        (i = this._normValueFromMouse(e)),
                        (s = this._valueMax() - this._valueMin() + 1),
                        this.handles.each(function (t) {
                            var e = Math.abs(i - d.values(t));
                            (e < s || (s === e && (t === d._lastChangedValue || d.values(t) === c.min))) && ((s = e), (n = M(this)), (a = t));
                        }),
                        !1 !== (o = this._start(t, a)) &&
                            ((this._mouseSliding = !0),
                            (this._handleIndex = a),
                            n.addClass("ui-state-active").focus(),
                            (r = n.offset()),
                            (l = !M(t.target).parents().addBack().is(".ui-slider-handle")),
                            (this._clickOffset = l
                                ? { left: 0, top: 0 }
                                : {
                                      left: t.pageX - r.left - n.width() / 2,
                                      top: t.pageY - r.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0),
                                  }),
                            this.handles.hasClass("ui-state-hover") || this._slide(t, a, i),
                            (this._animateOff = !0)))
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
                        (this._animateOff = !1)
                    );
                },
                _detectOrientation: function () {
                    this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
                },
                _normValueFromMouse: function (t) {
                    var e, i, s, n, a;
                    return (
                        1 <
                            (s =
                                (i =
                                    "horizontal" === this.orientation
                                        ? ((e = this.elementSize.width), t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0))
                                        : ((e = this.elementSize.height), t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))) / e) && (s = 1),
                        s < 0 && (s = 0),
                        "vertical" === this.orientation && (s = 1 - s),
                        (n = this._valueMax() - this._valueMin()),
                        (a = this._valueMin() + s * n),
                        this._trimAlignValue(a)
                    );
                },
                _start: function (t, e) {
                    var i = { handle: this.handles[e], value: this.value() };
                    return this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), this._trigger("start", t, i);
                },
                _slide: function (t, e, i) {
                    var s, n, a;
                    this.options.values && this.options.values.length
                        ? ((s = this.values(e ? 0 : 1)),
                          2 === this.options.values.length && !0 === this.options.range && ((0 === e && s < i) || (1 === e && i < s)) && (i = s),
                          i !== this.values(e) && (((n = this.values())[e] = i), (a = this._trigger("slide", t, { handle: this.handles[e], value: i, values: n })), (s = this.values(e ? 0 : 1)), !1 !== a && this.values(e, i)))
                        : i !== this.value() && !1 !== (a = this._trigger("slide", t, { handle: this.handles[e], value: i })) && this.value(i);
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
                values: function (t, e) {
                    var i, s, n;
                    if (1 < arguments.length) return (this.options.values[t] = this._trimAlignValue(e)), this._refreshValue(), void this._change(null, t);
                    if (!arguments.length) return this._values();
                    if (!M.isArray(t)) return this.options.values && this.options.values.length ? this._values(t) : this.value();
                    for (i = this.options.values, s = t, n = 0; i.length > n; n += 1) (i[n] = this._trimAlignValue(s[n])), this._change(null, n);
                    this._refreshValue();
                },
                _setOption: function (t, e) {
                    var i,
                        s = 0;
                    switch (
                        ("range" === t &&
                            !0 === this.options.range &&
                            ("min" === e ? ((this.options.value = this._values(0)), (this.options.values = null)) : "max" === e && ((this.options.value = this._values(this.options.values.length - 1)), (this.options.values = null))),
                        M.isArray(this.options.values) && (s = this.options.values.length),
                        "disabled" === t && this.element.toggleClass("ui-state-disabled", !!e),
                        this._super(t, e),
                        t)
                    ) {
                        case "orientation":
                            this._detectOrientation(),
                                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                                this._refreshValue(),
                                this.handles.css("horizontal" === e ? "bottom" : "left", "");
                            break;
                        case "value":
                            (this._animateOff = !0), this._refreshValue(), this._change(null, 0), (this._animateOff = !1);
                            break;
                        case "values":
                            for (this._animateOff = !0, this._refreshValue(), i = 0; i < s; i += 1) this._change(null, i);
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
                    return this._trimAlignValue(t);
                },
                _values: function (t) {
                    var e, i, s;
                    if (arguments.length) return (e = this.options.values[t]), this._trimAlignValue(e);
                    if (this.options.values && this.options.values.length) {
                        for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
                        return i;
                    }
                    return [];
                },
                _trimAlignValue: function (t) {
                    if (this._valueMin() >= t) return this._valueMin();
                    if (t >= this._valueMax()) return this._valueMax();
                    var e = 0 < this.options.step ? this.options.step : 1,
                        i = (t - this._valueMin()) % e,
                        s = t - i;
                    return 2 * Math.abs(i) >= e && (s += 0 < i ? e : -e), parseFloat(s.toFixed(5));
                },
                _calculateNewMax: function () {
                    var t = this.options.max,
                        e = this._valueMin(),
                        i = this.options.step,
                        s;
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
                        t,
                        s,
                        n,
                        a = this.options.range,
                        o = this.options,
                        r = this,
                        l = !this._animateOff && o.animate,
                        d = {};
                    this.options.values && this.options.values.length
                        ? this.handles.each(function (t) {
                              (i = ((r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin())) * 100),
                                  (d["horizontal" === r.orientation ? "left" : "bottom"] = i + "%"),
                                  M(this).stop(1, 1)[l ? "animate" : "css"](d, o.animate),
                                  !0 === r.options.range &&
                                      ("horizontal" === r.orientation
                                          ? (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({ left: i + "%" }, o.animate), 1 === t && r.range[l ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: o.animate }))
                                          : (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({ bottom: i + "%" }, o.animate), 1 === t && r.range[l ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: o.animate }))),
                                  (e = i);
                          })
                        : ((t = this.value()),
                          (s = this._valueMin()),
                          (n = this._valueMax()),
                          (i = n !== s ? ((t - s) / (n - s)) * 100 : 0),
                          (d["horizontal" === this.orientation ? "left" : "bottom"] = i + "%"),
                          this.handle.stop(1, 1)[l ? "animate" : "css"](d, o.animate),
                          "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ width: i + "%" }, o.animate),
                          "max" === a && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: !1, duration: o.animate }),
                          "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({ height: i + "%" }, o.animate),
                          "max" === a && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: !1, duration: o.animate }));
                },
                _handleEvents: {
                    keydown: function (t) {
                        var e,
                            i,
                            s,
                            n,
                            a = M(t.target).data("ui-slider-handle-index");
                        switch (t.keyCode) {
                            case M.ui.keyCode.HOME:
                            case M.ui.keyCode.END:
                            case M.ui.keyCode.PAGE_UP:
                            case M.ui.keyCode.PAGE_DOWN:
                            case M.ui.keyCode.UP:
                            case M.ui.keyCode.RIGHT:
                            case M.ui.keyCode.DOWN:
                            case M.ui.keyCode.LEFT:
                                if ((t.preventDefault(), !this._keySliding && ((this._keySliding = !0), M(t.target).addClass("ui-state-active"), !1 === (e = this._start(t, a))))) return;
                        }
                        switch (((n = this.options.step), (i = s = this.options.values && this.options.values.length ? this.values(a) : this.value()), t.keyCode)) {
                            case M.ui.keyCode.HOME:
                                s = this._valueMin();
                                break;
                            case M.ui.keyCode.END:
                                s = this._valueMax();
                                break;
                            case M.ui.keyCode.PAGE_UP:
                                s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case M.ui.keyCode.PAGE_DOWN:
                                s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / this.numPages);
                                break;
                            case M.ui.keyCode.UP:
                            case M.ui.keyCode.RIGHT:
                                if (i === this._valueMax()) return;
                                s = this._trimAlignValue(i + n);
                                break;
                            case M.ui.keyCode.DOWN:
                            case M.ui.keyCode.LEFT:
                                if (i === this._valueMin()) return;
                                s = this._trimAlignValue(i - n);
                        }
                        this._slide(t, a, s);
                    },
                    keyup: function (t) {
                        var e = M(t.target).data("ui-slider-handle-index");
                        this._keySliding && ((this._keySliding = !1), this._stop(t, e), this._change(t, e), M(t.target).removeClass("ui-state-active"));
                    },
                },
            }),
            M.widget("ui.spinner", {
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
                    var s = {},
                        n = this.element;
                    return (
                        M.each(["min", "max", "step"], function (t, e) {
                            var i = n.attr(e);
                            void 0 !== i && i.length && (s[e] = i);
                        }),
                        s
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
                            this._spin((0 < e ? 1 : -1) * this.options.step, t),
                                clearTimeout(this.mousewheelTimer),
                                (this.mousewheelTimer = this._delay(function () {
                                    this.spinning && this._stop(t);
                                }, 100)),
                                t.preventDefault();
                        }
                    },
                    "mousedown .ui-spinner-button": function (t) {
                        function e() {
                            var t;
                            this.element[0] === this.document[0].activeElement ||
                                (this.element.focus(),
                                (this.previous = i),
                                this._delay(function () {
                                    this.previous = i;
                                }));
                        }
                        var i;
                        (i = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val()),
                            t.preventDefault(),
                            e.call(this),
                            (this.cancelBlur = !0),
                            this._delay(function () {
                                delete this.cancelBlur, e.call(this);
                            }),
                            !1 !== this._start(t) && this._repeat(null, M(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t);
                    },
                    "mouseup .ui-spinner-button": "_stop",
                    "mouseenter .ui-spinner-button": function (t) {
                        return M(t.currentTarget).hasClass("ui-state-active") ? !1 !== this._start(t) && void this._repeat(null, M(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t) : void 0;
                    },
                    "mouseleave .ui-spinner-button": "_stop",
                },
                _draw: function () {
                    var t = (this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml()));
                    this.element.attr("role", "spinbutton"),
                        (this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all")),
                        this.buttons.height() > Math.ceil(0.5 * t.height()) && 0 < t.height() && t.height(t.height()),
                        this.options.disabled && this.disable();
                },
                _keydown: function (t) {
                    var e = this.options,
                        i = M.ui.keyCode;
                    switch (t.keyCode) {
                        case i.UP:
                            return this._repeat(null, 1, t), !0;
                        case i.DOWN:
                            return this._repeat(null, -1, t), !0;
                        case i.PAGE_UP:
                            return this._repeat(null, e.page, t), !0;
                        case i.PAGE_DOWN:
                            return this._repeat(null, -e.page, t), !0;
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
                    return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1), (this.spinning = !0));
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
                _increment: function (t) {
                    var e = this.options.incremental;
                    return e ? (M.isFunction(e) ? e(t) : Math.floor((t * t * t) / 5e4 - (t * t) / 500 + (17 * t) / 200 + 1)) : 1;
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
                        s = this.options;
                    return (
                        (i = t - (e = null !== s.min ? s.min : 0)),
                        (t = e + (i = Math.round(i / s.step) * s.step)),
                        (t = parseFloat(t.toFixed(this._precision()))),
                        null !== s.max && t > s.max ? s.max : null !== s.min && s.min > t ? s.min : t
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
                _setOptions: e(function (t) {
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
                stepUp: e(function (t) {
                    this._stepUp(t);
                }),
                _stepUp: function (t) {
                    this._start() && (this._spin((t || 1) * this.options.step), this._stop());
                },
                stepDown: e(function (t) {
                    this._stepDown(t);
                }),
                _stepDown: function (t) {
                    this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
                },
                pageUp: e(function (t) {
                    this._stepUp((t || 1) * this.options.page);
                }),
                pageDown: e(function (t) {
                    this._stepDown((t || 1) * this.options.page);
                }),
                value: function (t) {
                    return arguments.length ? void e(this._value).call(this, t) : this._parse(this.element.val());
                },
                widget: function () {
                    return this.uiSpinner;
                },
            });
        var _ = "ui-effects-",
            C = M,
            x;
        (M.effects = { effect: {} }),
            (function (c, h) {
                function u(t, e, i) {
                    var s = m[e.type] || {};
                    return null == t ? (i || !e.def ? null : e.def) : ((t = s.floor ? ~~t : parseFloat(t)), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : t < 0 ? 0 : t > s.max ? s.max : t);
                }
                function r(o) {
                    var r = f(),
                        l = (r._rgba = []);
                    return (
                        (o = o.toLowerCase()),
                        v(e, function (t, e) {
                            var i,
                                s = e.re.exec(o),
                                n = s && e.parse(s),
                                a = e.space || "rgba";
                            return n ? ((i = r[a](n)), (r[g[a].cache] = i[g[a].cache]), (l = r._rgba = i._rgba), !1) : h;
                        }),
                        l.length ? ("0,0,0,0" === l.join() && c.extend(l, d.transparent), r) : d[o]
                    );
                }
                function l(t, e, i) {
                    return 6 * (i = (i + 1) % 1) < 1 ? t + 6 * (e - t) * i : 2 * i < 1 ? e : 3 * i < 2 ? t + 6 * (e - t) * (2 / 3 - i) : t;
                }
                var d,
                    t = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    p = /^([\-+])=\s*(\d+\.?\d*)/,
                    e = [
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
                    f = (c.Color = function (t, e, i, s) {
                        return new c.Color.fn.parse(t, e, i, s);
                    }),
                    g = {
                        rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } },
                        hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } },
                    },
                    m = { byte: { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
                    o = (f.support = {}),
                    i = c("<p>")[0],
                    v = c.each;
                (i.style.cssText = "background-color:rgba(1,1,1,.5)"),
                    (o.rgba = -1 < i.style.backgroundColor.indexOf("rgba")),
                    v(g, function (t, e) {
                        (e.cache = "_" + t), (e.props.alpha = { idx: 3, type: "percent", def: 1 });
                    }),
                    (f.fn = c.extend(f.prototype, {
                        parse: function (n, t, e, i) {
                            if (n === h) return (this._rgba = [null, null, null, null]), this;
                            (n.jquery || n.nodeType) && ((n = c(n).css(t)), (t = h));
                            var a = this,
                                s = c.type(n),
                                o = (this._rgba = []);
                            return (
                                t !== h && ((n = [n, t, e, i]), (s = "array")),
                                "string" === s
                                    ? this.parse(r(n) || d._default)
                                    : "array" === s
                                    ? (v(g.rgba.props, function (t, e) {
                                          o[e.idx] = u(n[e.idx], e);
                                      }),
                                      this)
                                    : "object" === s
                                    ? (v(
                                          g,
                                          n instanceof f
                                              ? function (t, e) {
                                                    n[e.cache] && (a[e.cache] = n[e.cache].slice());
                                                }
                                              : function (t, i) {
                                                    var s = i.cache;
                                                    v(i.props, function (t, e) {
                                                        if (!a[s] && i.to) {
                                                            if ("alpha" === t || null == n[t]) return;
                                                            a[s] = i.to(a._rgba);
                                                        }
                                                        a[s][e.idx] = u(n[t], e, !0);
                                                    }),
                                                        a[s] && c.inArray(null, a[s].slice(0, 3)) < 0 && ((a[s][3] = 1), i.from && (a._rgba = i.from(a[s])));
                                                }
                                      ),
                                      this)
                                    : h
                            );
                        },
                        is: function (t) {
                            var n = f(t),
                                a = !0,
                                o = this;
                            return (
                                v(g, function (t, e) {
                                    var i,
                                        s = n[e.cache];
                                    return (
                                        s &&
                                            ((i = o[e.cache] || (e.to && e.to(o._rgba)) || []),
                                            v(e.props, function (t, e) {
                                                return null != s[e.idx] ? (a = s[e.idx] === i[e.idx]) : h;
                                            })),
                                        a
                                    );
                                }),
                                a
                            );
                        },
                        _space: function () {
                            var i = [],
                                s = this;
                            return (
                                v(g, function (t, e) {
                                    s[e.cache] && i.push(t);
                                }),
                                i.pop()
                            );
                        },
                        transition: function (t, o) {
                            var r = f(t),
                                e = r._space(),
                                i = g[e],
                                s = 0 === this.alpha() ? f("transparent") : this,
                                l = s[i.cache] || i.to(s._rgba),
                                d = l.slice();
                            return (
                                (r = r[i.cache]),
                                v(i.props, function (t, e) {
                                    var i = e.idx,
                                        s = l[i],
                                        n = r[i],
                                        a = m[e.type] || {};
                                    null !== n && (d[i] = null === s ? n : (a.mod && (n - s > a.mod / 2 ? (s += a.mod) : s - n > a.mod / 2 && (s -= a.mod)), u((n - s) * o + s, e)));
                                }),
                                this[e](d)
                            );
                        },
                        blend: function (t) {
                            if (1 === this._rgba[3]) return this;
                            var e = this._rgba.slice(),
                                i = e.pop(),
                                s = f(t)._rgba;
                            return f(
                                c.map(e, function (t, e) {
                                    return (1 - i) * s[e] + i * t;
                                })
                            );
                        },
                        toRgbaString: function () {
                            var t = "rgba(",
                                e = c.map(this._rgba, function (t, e) {
                                    return null == t ? (2 < e ? 1 : 0) : t;
                                });
                            return 1 === e[3] && (e.pop(), (t = "rgb(")), t + e.join() + ")";
                        },
                        toHslaString: function () {
                            var t = "hsla(",
                                e = c.map(this.hsla(), function (t, e) {
                                    return null == t && (t = 2 < e ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t;
                                });
                            return 1 === e[3] && (e.pop(), (t = "hsl(")), t + e.join() + ")";
                        },
                        toHexString: function (t) {
                            var e = this._rgba.slice(),
                                i = e.pop();
                            return (
                                t && e.push(~~(255 * i)),
                                "#" +
                                    c
                                        .map(e, function (t) {
                                            return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
                                        })
                                        .join("")
                            );
                        },
                        toString: function () {
                            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
                        },
                    })),
                    (f.fn.parse.prototype = f.fn),
                    (g.hsla.to = function (t) {
                        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                        var e,
                            i,
                            s = t[0] / 255,
                            n = t[1] / 255,
                            a = t[2] / 255,
                            o = t[3],
                            r = Math.max(s, n, a),
                            l = Math.min(s, n, a),
                            d = r - l,
                            c = r + l,
                            h = 0.5 * c;
                        return (
                            (e = l === r ? 0 : s === r ? (60 * (n - a)) / d + 360 : n === r ? (60 * (a - s)) / d + 120 : (60 * (s - n)) / d + 240),
                            (i = 0 === d ? 0 : h <= 0.5 ? d / c : d / (2 - c)),
                            [Math.round(e) % 360, i, h, null == o ? 1 : o]
                        );
                    }),
                    (g.hsla.from = function (t) {
                        if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                        var e = t[0] / 360,
                            i = t[1],
                            s = t[2],
                            n = t[3],
                            a = s <= 0.5 ? s * (1 + i) : s + i - s * i,
                            o = 2 * s - a;
                        return [Math.round(255 * l(o, a, e + 1 / 3)), Math.round(255 * l(o, a, e)), Math.round(255 * l(o, a, e - 1 / 3)), n];
                    }),
                    v(g, function (l, t) {
                        var i = t.props,
                            o = t.cache,
                            r = t.to,
                            d = t.from;
                        (f.fn[l] = function (t) {
                            if ((r && !this[o] && (this[o] = r(this._rgba)), t === h)) return this[o].slice();
                            var e,
                                s = c.type(t),
                                n = "array" === s || "object" === s ? t : arguments,
                                a = this[o].slice();
                            return (
                                v(i, function (t, e) {
                                    var i = n["object" === s ? t : e.idx];
                                    null == i && (i = a[e.idx]), (a[e.idx] = u(i, e));
                                }),
                                d ? (((e = f(d(a)))[o] = a), e) : f(a)
                            );
                        }),
                            v(i, function (o, r) {
                                f.fn[o] ||
                                    (f.fn[o] = function (t) {
                                        var e,
                                            i = c.type(t),
                                            s = "alpha" === o ? (this._hsla ? "hsla" : "rgba") : l,
                                            n = this[s](),
                                            a = n[r.idx];
                                        return "undefined" === i
                                            ? a
                                            : ("function" === i && ((t = t.call(this, a)), (i = c.type(t))),
                                              null == t && r.empty ? this : ("string" === i && (e = p.exec(t)) && (t = a + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)), (n[r.idx] = t), this[s](n)));
                                    });
                            });
                    }),
                    (f.hook = function (t) {
                        var e = t.split(" ");
                        v(e, function (t, a) {
                            (c.cssHooks[a] = {
                                set: function (t, e) {
                                    var i,
                                        s,
                                        n = "";
                                    if ("transparent" !== e && ("string" !== c.type(e) || (i = r(e)))) {
                                        if (((e = f(i || e)), !o.rgba && 1 !== e._rgba[3])) {
                                            for (s = "backgroundColor" === a ? t.parentNode : t; ("" === n || "transparent" === n) && s && s.style; )
                                                try {
                                                    (n = c.css(s, "backgroundColor")), (s = s.parentNode);
                                                } catch (t) {}
                                            e = e.blend(n && "transparent" !== n ? n : "_default");
                                        }
                                        e = e.toRgbaString();
                                    }
                                    try {
                                        t.style[a] = e;
                                    } catch (t) {}
                                },
                            }),
                                (c.fx.step[a] = function (t) {
                                    t.colorInit || ((t.start = f(t.elem, a)), (t.end = f(t.end)), (t.colorInit = !0)), c.cssHooks[a].set(t.elem, t.start.transition(t.end, t.pos));
                                });
                        });
                    }),
                    f.hook(t),
                    (c.cssHooks.borderColor = {
                        expand: function (i) {
                            var s = {};
                            return (
                                v(["Top", "Right", "Bottom", "Left"], function (t, e) {
                                    s["border" + e + "Color"] = i;
                                }),
                                s
                            );
                        },
                    }),
                    (d = c.Color.names = {
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
            })(C),
            (function () {
                function o(t) {
                    var e,
                        i,
                        s = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                        n = {};
                    if (s && s.length && s[0] && s[s[0]]) for (i = s.length; i--; ) "string" == typeof s[(e = s[i])] && (n[M.camelCase(e)] = s[e]);
                    else for (e in s) "string" == typeof s[e] && (n[e] = s[e]);
                    return n;
                }
                function r(t, e) {
                    var i,
                        s,
                        n = {};
                    for (i in e) (s = e[i]), t[i] !== s && (a[i] || ((M.fx.step[i] || !isNaN(parseFloat(s))) && (n[i] = s)));
                    return n;
                }
                var l = ["add", "remove", "toggle"],
                    a = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 },
                    d,
                    n,
                    c;
                M.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, e) {
                    M.fx.step[e] = function (t) {
                        (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) && (C.style(t.elem, e, t.end), (t.setAttr = !0));
                    };
                }),
                    M.fn.addBack ||
                        (M.fn.addBack = function (t) {
                            return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
                        }),
                    (M.effects.animateClass = function (n, t, e, i) {
                        var a = M.speed(t, e, i);
                        return this.queue(function () {
                            var t,
                                i = M(this),
                                e = i.attr("class") || "",
                                s = a.children ? i.find("*").addBack() : i;
                            (s = s.map(function () {
                                var t;
                                return { el: M(this), start: o(this) };
                            })),
                                (t = function () {
                                    M.each(l, function (t, e) {
                                        n[e] && i[e + "Class"](n[e]);
                                    });
                                })(),
                                (s = s.map(function () {
                                    return (this.end = o(this.el[0])), (this.diff = r(this.start, this.end)), this;
                                })),
                                i.attr("class", e),
                                (s = s.map(function () {
                                    var t = this,
                                        e = M.Deferred(),
                                        i = M.extend({}, a, {
                                            queue: !1,
                                            complete: function () {
                                                e.resolve(t);
                                            },
                                        });
                                    return this.el.animate(this.diff, i), e.promise();
                                })),
                                M.when.apply(M, s.get()).done(function () {
                                    t(),
                                        M.each(arguments, function () {
                                            var e = this.el;
                                            M.each(this.diff, function (t) {
                                                e.css(t, "");
                                            });
                                        }),
                                        a.complete.call(i[0]);
                                });
                        });
                    }),
                    M.fn.extend({
                        addClass:
                            ((c = M.fn.addClass),
                            function (t, e, i, s) {
                                return e ? M.effects.animateClass.call(this, { add: t }, e, i, s) : c.apply(this, arguments);
                            }),
                        removeClass:
                            ((n = M.fn.removeClass),
                            function (t, e, i, s) {
                                return 1 < arguments.length ? M.effects.animateClass.call(this, { remove: t }, e, i, s) : n.apply(this, arguments);
                            }),
                        toggleClass:
                            ((d = M.fn.toggleClass),
                            function (t, e, i, s, n) {
                                return "boolean" == typeof e || void 0 === e
                                    ? i
                                        ? M.effects.animateClass.call(this, e ? { add: t } : { remove: t }, i, s, n)
                                        : d.apply(this, arguments)
                                    : M.effects.animateClass.call(this, { toggle: t }, e, i, s);
                            }),
                        switchClass: function (t, e, i, s, n) {
                            return M.effects.animateClass.call(this, { add: e, remove: t }, i, s, n);
                        },
                    });
            })(),
            (function () {
                function s(t, e, i, s) {
                    return (
                        M.isPlainObject(t) && (t = (e = t).effect),
                        (t = { effect: t }),
                        null == e && (e = {}),
                        M.isFunction(e) && ((s = e), (i = null), (e = {})),
                        ("number" == typeof e || M.fx.speeds[e]) && ((s = i), (i = e), (e = {})),
                        M.isFunction(i) && ((s = i), (i = null)),
                        e && M.extend(t, e),
                        (i = i || e.duration),
                        (t.duration = M.fx.off ? 0 : "number" == typeof i ? i : i in M.fx.speeds ? M.fx.speeds[i] : M.fx.speeds._default),
                        (t.complete = s || e.complete),
                        t
                    );
                }
                function i(t) {
                    return !(t && "number" != typeof t && !M.fx.speeds[t]) || ("string" == typeof t && !M.effects.effect[t]) || !!M.isFunction(t) || ("object" == typeof t && !t.effect);
                }
                var n, a, o;
                M.extend(M.effects, {
                    version: "1.11.4",
                    save: function (t, e) {
                        for (var i = 0; e.length > i; i++) null !== e[i] && t.data(_ + e[i], t[0].style[e[i]]);
                    },
                    restore: function (t, e) {
                        var i, s;
                        for (s = 0; e.length > s; s++) null !== e[s] && (void 0 === (i = t.data(_ + e[s])) && (i = ""), t.css(e[s], i));
                    },
                    setMode: function (t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
                    },
                    getBaseline: function (t, e) {
                        var i, s;
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
                                s = 0;
                                break;
                            case "center":
                                s = 0.5;
                                break;
                            case "right":
                                s = 1;
                                break;
                            default:
                                s = t[1] / e.width;
                        }
                        return { x: s, y: i };
                    },
                    createWrapper: function (i) {
                        if (i.parent().is(".ui-effects-wrapper")) return i.parent();
                        var s = { width: i.outerWidth(!0), height: i.outerHeight(!0), float: i.css("float") },
                            t = M("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
                            e = { width: i.width(), height: i.height() },
                            n = document.activeElement;
                        try {
                            n.id;
                        } catch (t) {
                            n = document.body;
                        }
                        return (
                            i.wrap(t),
                            (i[0] === n || M.contains(i[0], n)) && M(n).focus(),
                            (t = i.parent()),
                            "static" === i.css("position")
                                ? (t.css({ position: "relative" }), i.css({ position: "relative" }))
                                : (M.extend(s, { position: i.css("position"), zIndex: i.css("z-index") }),
                                  M.each(["top", "left", "bottom", "right"], function (t, e) {
                                      (s[e] = i.css(e)), isNaN(parseInt(s[e], 10)) && (s[e] = "auto");
                                  }),
                                  i.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })),
                            i.css(e),
                            t.css(s).show()
                        );
                    },
                    removeWrapper: function (t) {
                        var e = document.activeElement;
                        return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === e || M.contains(t[0], e)) && M(e).focus()), t;
                    },
                    setTransition: function (s, t, n, a) {
                        return (
                            (a = a || {}),
                            M.each(t, function (t, e) {
                                var i = s.cssUnit(e);
                                0 < i[0] && (a[e] = i[0] * n + i[1]);
                            }),
                            a
                        );
                    },
                }),
                    M.fn.extend({
                        effect: function () {
                            function t(t) {
                                function e() {
                                    M.isFunction(s) && s.call(i[0]), M.isFunction(t) && t();
                                }
                                var i = M(this),
                                    s = a.complete,
                                    n = a.mode;
                                (i.is(":hidden") ? "hide" === n : "show" === n) ? (i[n](), e()) : o.call(i[0], a, e);
                            }
                            var a = s.apply(this, arguments),
                                e = a.mode,
                                i = a.queue,
                                o = M.effects.effect[a.effect];
                            return M.fx.off || !o
                                ? e
                                    ? this[e](a.duration, a.complete)
                                    : this.each(function () {
                                          a.complete && a.complete.call(this);
                                      })
                                : !1 === i
                                ? this.each(t)
                                : this.queue(i || "fx", t);
                        },
                        show:
                            ((o = M.fn.show),
                            function (t) {
                                if (i(t)) return o.apply(this, arguments);
                                var e = s.apply(this, arguments);
                                return (e.mode = "show"), this.effect.call(this, e);
                            }),
                        hide:
                            ((a = M.fn.hide),
                            function (t) {
                                if (i(t)) return a.apply(this, arguments);
                                var e = s.apply(this, arguments);
                                return (e.mode = "hide"), this.effect.call(this, e);
                            }),
                        toggle:
                            ((n = M.fn.toggle),
                            function (t) {
                                if (i(t) || "boolean" == typeof t) return n.apply(this, arguments);
                                var e = s.apply(this, arguments);
                                return (e.mode = "toggle"), this.effect.call(this, e);
                            }),
                        cssUnit: function (t) {
                            var i = this.css(t),
                                s = [];
                            return (
                                M.each(["em", "px", "%", "pt"], function (t, e) {
                                    0 < i.indexOf(e) && (s = [parseFloat(i), e]);
                                }),
                                s
                            );
                        },
                    });
            })(),
            (x = {}),
            M.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
                x[t] = function (t) {
                    return Math.pow(t, e + 2);
                };
            }),
            M.extend(x, {
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
            M.each(x, function (t, e) {
                (M.easing["easeIn" + t] = e),
                    (M.easing["easeOut" + t] = function (t) {
                        return 1 - e(1 - t);
                    }),
                    (M.easing["easeInOut" + t] = function (t) {
                        return t < 0.5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2;
                    });
            }),
            M.effects,
            (M.effects.effect.blind = function (t, e) {
                var i,
                    s,
                    n,
                    a = M(this),
                    o = /up|down|vertical/,
                    r = /up|left|vertical|horizontal/,
                    l = ["position", "top", "bottom", "left", "right", "height", "width"],
                    d = M.effects.setMode(a, t.mode || "hide"),
                    c = t.direction || "up",
                    h = o.test(c),
                    u = h ? "height" : "width",
                    p = h ? "top" : "left",
                    f = r.test(c),
                    g = {},
                    m = "show" === d;
                a.parent().is(".ui-effects-wrapper") ? M.effects.save(a.parent(), l) : M.effects.save(a, l),
                    a.show(),
                    (s = (i = M.effects.createWrapper(a).css({ overflow: "hidden" }))[u]()),
                    (n = parseFloat(i.css(p)) || 0),
                    (g[u] = m ? s : 0),
                    f ||
                        (a
                            .css(h ? "bottom" : "right", 0)
                            .css(h ? "top" : "left", "auto")
                            .css({ position: "absolute" }),
                        (g[p] = m ? n : s + n)),
                    m && (i.css(u, 0), f || i.css(p, n + s)),
                    i.animate(g, {
                        duration: t.duration,
                        easing: t.easing,
                        queue: !1,
                        complete: function () {
                            "hide" === d && a.hide(), M.effects.restore(a, l), M.effects.removeWrapper(a), e();
                        },
                    });
            }),
            (M.effects.effect.bounce = function (t, e) {
                var i,
                    s,
                    n,
                    a = M(this),
                    o = ["position", "top", "bottom", "left", "right", "height", "width"],
                    r = M.effects.setMode(a, t.mode || "effect"),
                    l = "hide" === r,
                    d = "show" === r,
                    c = t.direction || "up",
                    h = t.distance,
                    u = t.times || 5,
                    p = 2 * u + (d || l ? 1 : 0),
                    f = t.duration / p,
                    g = t.easing,
                    m = "up" === c || "down" === c ? "top" : "left",
                    v = "up" === c || "left" === c,
                    b = a.queue(),
                    w = b.length;
                for (
                    (d || l) && o.push("opacity"),
                        M.effects.save(a, o),
                        a.show(),
                        M.effects.createWrapper(a),
                        h || (h = a["top" === m ? "outerHeight" : "outerWidth"]() / 3),
                        d &&
                            (((n = { opacity: 1 })[m] = 0),
                            a
                                .css("opacity", 0)
                                .css(m, v ? 2 * -h : 2 * h)
                                .animate(n, f, g)),
                        l && (h /= Math.pow(2, u - 1)),
                        i = (n = {})[m] = 0;
                    i < u;
                    i++
                )
                    ((s = {})[m] = (v ? "-=" : "+=") + h), a.animate(s, f, g).animate(n, f, g), (h = l ? 2 * h : h / 2);
                l && (((s = { opacity: 0 })[m] = (v ? "-=" : "+=") + h), a.animate(s, f, g)),
                    a.queue(function () {
                        l && a.hide(), M.effects.restore(a, o), M.effects.removeWrapper(a), e();
                    }),
                    1 < w && b.splice.apply(b, [1, 0].concat(b.splice(w, p + 1))),
                    a.dequeue();
            }),
            (M.effects.effect.clip = function (t, e) {
                var i,
                    s,
                    n,
                    a = M(this),
                    o = ["position", "top", "bottom", "left", "right", "height", "width"],
                    r,
                    l = "show" === M.effects.setMode(a, t.mode || "hide"),
                    d,
                    c = "vertical" === (t.direction || "vertical"),
                    h = c ? "height" : "width",
                    u = c ? "top" : "left",
                    p = {};
                M.effects.save(a, o),
                    a.show(),
                    (i = M.effects.createWrapper(a).css({ overflow: "hidden" })),
                    (n = (s = "IMG" === a[0].tagName ? i : a)[h]()),
                    l && (s.css(h, 0), s.css(u, n / 2)),
                    (p[h] = l ? n : 0),
                    (p[u] = l ? 0 : n / 2),
                    s.animate(p, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function () {
                            l || a.hide(), M.effects.restore(a, o), M.effects.removeWrapper(a), e();
                        },
                    });
            }),
            (M.effects.effect.drop = function (t, e) {
                var i,
                    s = M(this),
                    n = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                    a = M.effects.setMode(s, t.mode || "hide"),
                    o = "show" === a,
                    r = t.direction || "left",
                    l = "up" === r || "down" === r ? "top" : "left",
                    d = "up" === r || "left" === r ? "pos" : "neg",
                    c = { opacity: o ? 1 : 0 };
                M.effects.save(s, n),
                    s.show(),
                    M.effects.createWrapper(s),
                    (i = t.distance || s["top" === l ? "outerHeight" : "outerWidth"](!0) / 2),
                    o && s.css("opacity", 0).css(l, "pos" === d ? -i : i),
                    (c[l] = (o ? ("pos" === d ? "+=" : "-=") : "pos" === d ? "-=" : "+=") + i),
                    s.animate(c, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function () {
                            "hide" === a && s.hide(), M.effects.restore(s, n), M.effects.removeWrapper(s), e();
                        },
                    });
            }),
            (M.effects.effect.explode = function (t, e) {
                function i() {
                    b.push(this), b.length === c * h && s();
                }
                function s() {
                    u.css({ visibility: "visible" }), M(b).remove(), f || u.hide(), e();
                }
                var n,
                    a,
                    o,
                    r,
                    l,
                    d,
                    c = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
                    h = c,
                    u = M(this),
                    p,
                    f = "show" === M.effects.setMode(u, t.mode || "hide"),
                    g = u.show().css("visibility", "hidden").offset(),
                    m = Math.ceil(u.outerWidth() / h),
                    v = Math.ceil(u.outerHeight() / c),
                    b = [];
                for (n = 0; n < c; n++)
                    for (r = g.top + n * v, d = n - (c - 1) / 2, a = 0; a < h; a++)
                        (o = g.left + a * m),
                            (l = a - (h - 1) / 2),
                            u
                                .clone()
                                .appendTo("body")
                                .wrap("<div></div>")
                                .css({ position: "absolute", visibility: "visible", left: -a * m, top: -n * v })
                                .parent()
                                .addClass("ui-effects-explode")
                                .css({ position: "absolute", overflow: "hidden", width: m, height: v, left: o + (f ? l * m : 0), top: r + (f ? d * v : 0), opacity: f ? 0 : 1 })
                                .animate({ left: o + (f ? 0 : l * m), top: r + (f ? 0 : d * v), opacity: f ? 1 : 0 }, t.duration || 500, t.easing, i);
            }),
            (M.effects.effect.fade = function (t, e) {
                var i = M(this),
                    s = M.effects.setMode(i, t.mode || "toggle");
                i.animate({ opacity: s }, { queue: !1, duration: t.duration, easing: t.easing, complete: e });
            }),
            (M.effects.effect.fold = function (t, e) {
                var i,
                    s,
                    n = M(this),
                    a = ["position", "top", "bottom", "left", "right", "height", "width"],
                    o = M.effects.setMode(n, t.mode || "hide"),
                    r = "show" === o,
                    l = "hide" === o,
                    d = t.size || 15,
                    c = /([0-9]+)%/.exec(d),
                    h = !!t.horizFirst,
                    u = r !== h,
                    p = u ? ["width", "height"] : ["height", "width"],
                    f = t.duration / 2,
                    g = {},
                    m = {};
                M.effects.save(n, a),
                    n.show(),
                    (i = M.effects.createWrapper(n).css({ overflow: "hidden" })),
                    (s = u ? [i.width(), i.height()] : [i.height(), i.width()]),
                    c && (d = (parseInt(c[1], 10) / 100) * s[l ? 0 : 1]),
                    r && i.css(h ? { height: 0, width: d } : { height: d, width: 0 }),
                    (g[p[0]] = r ? s[0] : d),
                    (m[p[1]] = r ? s[1] : 0),
                    i.animate(g, f, t.easing).animate(m, f, t.easing, function () {
                        l && n.hide(), M.effects.restore(n, a), M.effects.removeWrapper(n), e();
                    });
            }),
            (M.effects.effect.highlight = function (t, e) {
                var i = M(this),
                    s = ["backgroundImage", "backgroundColor", "opacity"],
                    n = M.effects.setMode(i, t.mode || "show"),
                    a = { backgroundColor: i.css("backgroundColor") };
                "hide" === n && (a.opacity = 0),
                    M.effects.save(i, s),
                    i
                        .show()
                        .css({ backgroundImage: "none", backgroundColor: t.color || "#ffff99" })
                        .animate(a, {
                            queue: !1,
                            duration: t.duration,
                            easing: t.easing,
                            complete: function () {
                                "hide" === n && i.hide(), M.effects.restore(i, s), e();
                            },
                        });
            }),
            (M.effects.effect.size = function (a, t) {
                var e,
                    i,
                    o,
                    r = M(this),
                    s = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                    n = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                    l = ["width", "height", "overflow"],
                    d = ["fontSize"],
                    c = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                    h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                    u = M.effects.setMode(r, a.mode || "effect"),
                    p = a.restore || "effect" !== u,
                    f = a.scale || "both",
                    g = a.origin || ["middle", "center"],
                    m = r.css("position"),
                    v = p ? s : n,
                    b = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
                "show" === u && r.show(),
                    (e = { height: r.height(), width: r.width(), outerHeight: r.outerHeight(), outerWidth: r.outerWidth() }),
                    "toggle" === a.mode && "show" === u ? ((r.from = a.to || b), (r.to = a.from || e)) : ((r.from = a.from || ("show" === u ? b : e)), (r.to = a.to || ("hide" === u ? b : e))),
                    (o = { from: { y: r.from.height / e.height, x: r.from.width / e.width }, to: { y: r.to.height / e.height, x: r.to.width / e.width } }),
                    ("box" === f || "both" === f) &&
                        (o.from.y !== o.to.y && ((v = v.concat(c)), (r.from = M.effects.setTransition(r, c, o.from.y, r.from)), (r.to = M.effects.setTransition(r, c, o.to.y, r.to))),
                        o.from.x !== o.to.x && ((v = v.concat(h)), (r.from = M.effects.setTransition(r, h, o.from.x, r.from)), (r.to = M.effects.setTransition(r, h, o.to.x, r.to)))),
                    ("content" === f || "both" === f) && o.from.y !== o.to.y && ((v = v.concat(d).concat(l)), (r.from = M.effects.setTransition(r, d, o.from.y, r.from)), (r.to = M.effects.setTransition(r, d, o.to.y, r.to))),
                    M.effects.save(r, v),
                    r.show(),
                    M.effects.createWrapper(r),
                    r.css("overflow", "hidden").css(r.from),
                    g &&
                        ((i = M.effects.getBaseline(g, e)),
                        (r.from.top = (e.outerHeight - r.outerHeight()) * i.y),
                        (r.from.left = (e.outerWidth - r.outerWidth()) * i.x),
                        (r.to.top = (e.outerHeight - r.to.outerHeight) * i.y),
                        (r.to.left = (e.outerWidth - r.to.outerWidth) * i.x)),
                    r.css(r.from),
                    ("content" === f || "both" === f) &&
                        ((c = c.concat(["marginTop", "marginBottom"]).concat(d)),
                        (h = h.concat(["marginLeft", "marginRight"])),
                        (l = s.concat(c).concat(h)),
                        r.find("*[width]").each(function () {
                            var t = M(this),
                                e = t.height(),
                                i = t.width(),
                                s = t.outerHeight(),
                                n = t.outerWidth();
                            p && M.effects.save(t, l),
                                (t.from = { height: e * o.from.y, width: i * o.from.x, outerHeight: s * o.from.y, outerWidth: n * o.from.x }),
                                (t.to = { height: e * o.to.y, width: i * o.to.x, outerHeight: e * o.to.y, outerWidth: i * o.to.x }),
                                o.from.y !== o.to.y && ((t.from = M.effects.setTransition(t, c, o.from.y, t.from)), (t.to = M.effects.setTransition(t, c, o.to.y, t.to))),
                                o.from.x !== o.to.x && ((t.from = M.effects.setTransition(t, h, o.from.x, t.from)), (t.to = M.effects.setTransition(t, h, o.to.x, t.to))),
                                t.css(t.from),
                                t.animate(t.to, a.duration, a.easing, function () {
                                    p && M.effects.restore(t, l);
                                });
                        })),
                    r.animate(r.to, {
                        queue: !1,
                        duration: a.duration,
                        easing: a.easing,
                        complete: function () {
                            0 === r.to.opacity && r.css("opacity", r.from.opacity),
                                "hide" === u && r.hide(),
                                M.effects.restore(r, v),
                                p ||
                                    ("static" === m
                                        ? r.css({ position: "relative", top: r.to.top, left: r.to.left })
                                        : M.each(["top", "left"], function (n, t) {
                                              r.css(t, function (t, e) {
                                                  var i = parseInt(e, 10),
                                                      s = n ? r.to.left : r.to.top;
                                                  return "auto" === e ? s + "px" : i + s + "px";
                                              });
                                          })),
                                M.effects.removeWrapper(r),
                                t();
                        },
                    });
            }),
            (M.effects.effect.scale = function (t, e) {
                var i = M(this),
                    s = M.extend(!0, {}, t),
                    n = M.effects.setMode(i, t.mode || "effect"),
                    a = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === n ? 0 : 100),
                    o = t.direction || "both",
                    r = t.origin,
                    l = { height: i.height(), width: i.width(), outerHeight: i.outerHeight(), outerWidth: i.outerWidth() },
                    d = "horizontal" !== o ? a / 100 : 1,
                    c = "vertical" !== o ? a / 100 : 1;
                (s.effect = "size"),
                    (s.queue = !1),
                    (s.complete = e),
                    "effect" !== n && ((s.origin = r || ["middle", "center"]), (s.restore = !0)),
                    (s.from = t.from || ("show" === n ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 } : l)),
                    (s.to = { height: l.height * d, width: l.width * c, outerHeight: l.outerHeight * d, outerWidth: l.outerWidth * c }),
                    s.fade && ("show" === n && ((s.from.opacity = 0), (s.to.opacity = 1)), "hide" === n && ((s.from.opacity = 1), (s.to.opacity = 0))),
                    i.effect(s);
            }),
            (M.effects.effect.puff = function (t, e) {
                var i = M(this),
                    s = M.effects.setMode(i, t.mode || "hide"),
                    n = "hide" === s,
                    a = parseInt(t.percent, 10) || 150,
                    o = a / 100,
                    r = { height: i.height(), width: i.width(), outerHeight: i.outerHeight(), outerWidth: i.outerWidth() };
                M.extend(t, { effect: "scale", queue: !1, fade: !0, mode: s, complete: e, percent: n ? a : 100, from: n ? r : { height: r.height * o, width: r.width * o, outerHeight: r.outerHeight * o, outerWidth: r.outerWidth * o } }),
                    i.effect(t);
            }),
            (M.effects.effect.pulsate = function (t, e) {
                var i,
                    s = M(this),
                    n = M.effects.setMode(s, t.mode || "show"),
                    a = "show" === n,
                    o = "hide" === n,
                    r = a || "hide" === n,
                    l = 2 * (t.times || 5) + (r ? 1 : 0),
                    d = t.duration / l,
                    c = 0,
                    h = s.queue(),
                    u = h.length;
                for ((a || !s.is(":visible")) && (s.css("opacity", 0).show(), (c = 1)), i = 1; i < l; i++) s.animate({ opacity: c }, d, t.easing), (c = 1 - c);
                s.animate({ opacity: c }, d, t.easing),
                    s.queue(function () {
                        o && s.hide(), e();
                    }),
                    1 < u && h.splice.apply(h, [1, 0].concat(h.splice(u, l + 1))),
                    s.dequeue();
            }),
            (M.effects.effect.shake = function (t, e) {
                var i,
                    s = M(this),
                    n = ["position", "top", "bottom", "left", "right", "height", "width"],
                    a = M.effects.setMode(s, t.mode || "effect"),
                    o = t.direction || "left",
                    r = t.distance || 20,
                    l = t.times || 3,
                    d = 2 * l + 1,
                    c = Math.round(t.duration / d),
                    h = "up" === o || "down" === o ? "top" : "left",
                    u = "up" === o || "left" === o,
                    p = {},
                    f = {},
                    g = {},
                    m = s.queue(),
                    v = m.length;
                for (M.effects.save(s, n), s.show(), M.effects.createWrapper(s), p[h] = (u ? "-=" : "+=") + r, f[h] = (u ? "+=" : "-=") + 2 * r, g[h] = (u ? "-=" : "+=") + 2 * r, s.animate(p, c, t.easing), i = 1; i < l; i++)
                    s.animate(f, c, t.easing).animate(g, c, t.easing);
                s
                    .animate(f, c, t.easing)
                    .animate(p, c / 2, t.easing)
                    .queue(function () {
                        "hide" === a && s.hide(), M.effects.restore(s, n), M.effects.removeWrapper(s), e();
                    }),
                    1 < v && m.splice.apply(m, [1, 0].concat(m.splice(v, d + 1))),
                    s.dequeue();
            }),
            (M.effects.effect.slide = function (t, e) {
                var i,
                    s = M(this),
                    n = ["position", "top", "bottom", "left", "right", "width", "height"],
                    a = M.effects.setMode(s, t.mode || "show"),
                    o = "show" === a,
                    r = t.direction || "left",
                    l = "up" === r || "down" === r ? "top" : "left",
                    d = "up" === r || "left" === r,
                    c = {};
                M.effects.save(s, n),
                    s.show(),
                    (i = t.distance || s["top" === l ? "outerHeight" : "outerWidth"](!0)),
                    M.effects.createWrapper(s).css({ overflow: "hidden" }),
                    o && s.css(l, d ? (isNaN(i) ? "-" + i : -i) : i),
                    (c[l] = (o ? (d ? "+=" : "-=") : d ? "-=" : "+=") + i),
                    s.animate(c, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function () {
                            "hide" === a && s.hide(), M.effects.restore(s, n), M.effects.removeWrapper(s), e();
                        },
                    });
            }),
            (M.effects.effect.transfer = function (t, e) {
                var i = M(this),
                    s = M(t.to),
                    n = "fixed" === s.css("position"),
                    a = M("body"),
                    o = n ? a.scrollTop() : 0,
                    r = n ? a.scrollLeft() : 0,
                    l = s.offset(),
                    d = { top: l.top - o, left: l.left - r, height: s.innerHeight(), width: s.innerWidth() },
                    c = i.offset(),
                    h = M("<div class='ui-effects-transfer'></div>")
                        .appendTo(document.body)
                        .addClass(t.className)
                        .css({ top: c.top - o, left: c.left - r, height: i.innerHeight(), width: i.innerWidth(), position: n ? "fixed" : "absolute" })
                        .animate(d, t.duration, t.easing, function () {
                            h.remove(), e();
                        });
            });
    }),
    ($.datepicker.regional["pt-BR"] = {
        closeText: "",
        prevText: "&#x3C; MÃªs anterior",
        nextText: "PrÃ³ximo mÃªs &#x3E;",
        currentText: "",
        monthNames: ["Janeiro", "Fevereiro", "MarÃ§o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "TerÃ§a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "SÃ¡bado"],
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
    (function (e) {
        function i(t, e) {
            if (!(1 < t.originalEvent.touches.length)) {
                t.preventDefault();
                var i = t.originalEvent.changedTouches[0],
                    s = document.createEvent("MouseEvents");
                s.initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(s);
            }
        }
        if (((e.support.touch = "ontouchend" in document), e.support.touch)) {
            var s,
                t = e.ui.mouse.prototype,
                n = t._mouseInit,
                a = t._mouseDestroy;
            (t._touchStart = function (t) {
                var e = this;
                !s && e._mouseCapture(t.originalEvent.changedTouches[0]) && ((s = !0), (e._touchMoved = !1), i(t, "mouseover"), i(t, "mousemove"), i(t, "mousedown"));
            }),
                (t._touchMove = function (t) {
                    s && ((this._touchMoved = !0), i(t, "mousemove"));
                }),
                (t._touchEnd = function (t) {
                    s && (i(t, "mouseup"), i(t, "mouseout"), this._touchMoved || i(t, "click"), (s = !1));
                }),
                (t._mouseInit = function () {
                    var t = this;
                    t.element.bind({ touchstart: e.proxy(t, "_touchStart"), touchmove: e.proxy(t, "_touchMove"), touchend: e.proxy(t, "_touchEnd") }), n.call(t);
                }),
                (t._mouseDestroy = function () {
                    var t = this;
                    t.element.unbind({ touchstart: e.proxy(t, "_touchStart"), touchmove: e.proxy(t, "_touchMove"), touchend: e.proxy(t, "_touchEnd") }), a.call(t);
                });
        }
    })(jQuery),
    (function (t, e) {
        "object" == typeof exports ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : (t.Spinner = e());
    })(this, function () {
        "use strict";
        function u(t, e) {
            var i,
                s = document.createElement(t || "div");
            for (i in e) s[i] = e[i];
            return s;
        }
        function c(t) {
            for (var e = 1, i = arguments.length; e < i; e++) t.appendChild(arguments[e]);
            return t;
        }
        function o(t, e, i, s) {
            var n = ["opacity", e, ~~(100 * t), i, s].join("-"),
                a = 0.01 + (i / s) * 100,
                o = Math.max(1 - ((1 - t) / e) * (100 - a), t),
                r = f.substring(0, f.indexOf("Animation")).toLowerCase(),
                l = (r && "-" + r + "-") || "";
            return (
                d[n] ||
                    (g.insertRule("@" + l + "keyframes " + n + "{0%{opacity:" + o + "}" + a + "%{opacity:" + t + "}" + (a + 0.01) + "%{opacity:1}" + ((a + e) % 100) + "%{opacity:" + t + "}100%{opacity:" + o + "}}", g.cssRules.length),
                    (d[n] = 1)),
                n
            );
        }
        function s(t, e) {
            var i,
                s,
                n = t.style;
            for (e = e.charAt(0).toUpperCase() + e.slice(1), s = 0; s < a.length; s++) if (void 0 !== n[(i = a[s] + e)]) return i;
            return void 0 !== n[e] ? e : void 0;
        }
        function p(t, e) {
            for (var i in e) t.style[s(t, i) || i] = e[i];
            return t;
        }
        function e(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var s in i) void 0 === t[s] && (t[s] = i[s]);
            }
            return t;
        }
        function h(t, e) {
            return "string" == typeof t ? t : t[e % t.length];
        }
        function i(t) {
            this.opts = e(t || {}, i.defaults, n);
        }
        function t() {
            function d(t, e) {
                return u("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', e);
            }
            g.addRule(".spin-vml", "behavior:url(#default#VML)"),
                (i.prototype.lines = function (t, s) {
                    function n() {
                        return p(d("group", { coordsize: o + " " + o, coordorigin: -a + " " + -a }), { width: o, height: o });
                    }
                    function e(t, e, i) {
                        c(
                            l,
                            c(
                                p(n(), { rotation: (360 / s.lines) * t + "deg", left: ~~e }),
                                c(
                                    p(d("roundrect", { arcsize: s.corners }), { width: a, height: s.scale * s.width, left: s.scale * s.radius, top: (-s.scale * s.width) >> 1, filter: i }),
                                    d("fill", { color: h(s.color, t), opacity: s.opacity }),
                                    d("stroke", { opacity: 0 })
                                )
                            )
                        );
                    }
                    var i,
                        a = s.scale * (s.length + s.width),
                        o = 2 * s.scale * a,
                        r = -(s.width + s.length) * s.scale * 2 + "px",
                        l = p(n(), { position: "absolute", top: r, left: r });
                    if (s.shadow) for (i = 1; i <= s.lines; i++) e(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                    for (i = 1; i <= s.lines; i++) e(i);
                    return c(t, l);
                }),
                (i.prototype.opacity = function (t, e, i, s) {
                    var n = t.firstChild;
                    (s = (s.shadow && s.lines) || 0), n && e + s < n.childNodes.length && (n = (n = (n = n.childNodes[e + s]) && n.firstChild) && n.firstChild) && (n.opacity = i);
                });
        }
        var f,
            g,
            a = ["webkit", "Moz", "ms", "O"],
            d = {},
            n = {
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
            },
            r;
        if (
            ((i.defaults = {}),
            e(i.prototype, {
                spin: function (t) {
                    this.stop();
                    var i = this,
                        s = i.opts,
                        n = (i.el = p(u(0, { className: s.className }), { position: s.position, width: 0, zIndex: s.zIndex }));
                    if ((p(n, { left: s.left, top: s.top }), t && t.insertBefore(n, t.firstChild || null), n.setAttribute("role", "progressbar"), i.lines(n, i.opts), !f)) {
                        var a,
                            o = 0,
                            r = ((s.lines - 1) * (1 - s.direction)) / 2,
                            l = s.fps,
                            d = l / s.speed,
                            c = (1 - s.opacity) / ((d * s.trail) / 100),
                            h = d / s.lines;
                        !(function t() {
                            o++;
                            for (var e = 0; e < s.lines; e++) (a = Math.max(1 - ((o + (s.lines - e) * h) % d) * c, s.opacity)), i.opacity(n, e * s.direction + r, a, s);
                            i.timeout = i.el && setTimeout(t, ~~(1e3 / l));
                        })();
                    }
                    return i;
                },
                stop: function () {
                    var t = this.el;
                    return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), (this.el = void 0)), this;
                },
                lines: function (t, i) {
                    function e(t, e) {
                        return p(u(), {
                            position: "absolute",
                            width: i.scale * (i.length + i.width) + "px",
                            height: i.scale * i.width + "px",
                            background: t,
                            boxShadow: e,
                            transformOrigin: "left",
                            transform: "rotate(" + ~~((360 / i.lines) * n + i.rotate) + "deg) translate(" + i.scale * i.radius + "px,0)",
                            borderRadius: ((i.corners * i.scale * i.width) >> 1) + "px",
                        });
                    }
                    for (var s, n = 0, a = ((i.lines - 1) * (1 - i.direction)) / 2; n < i.lines; n++)
                        (s = p(u(), {
                            position: "absolute",
                            top: 1 + ~((i.scale * i.width) / 2) + "px",
                            transform: i.hwaccel ? "translate3d(0,0,0)" : "",
                            opacity: i.opacity,
                            animation: f && o(i.opacity, i.trail, a + n * i.direction, i.lines) + " " + 1 / i.speed + "s linear infinite",
                        })),
                            i.shadow && c(s, p(e("#000", "0 0 4px #000"), { top: "2px" })),
                            c(t, c(s, e(h(i.color, n), "0 0 1px rgba(0,0,0,.1)")));
                    return t;
                },
                opacity: function (t, e, i) {
                    e < t.childNodes.length && (t.childNodes[e].style.opacity = i);
                },
            }),
            "undefined" != typeof document)
        ) {
            (r = u("style", { type: "text/css" })), c(document.getElementsByTagName("head")[0], r), (g = r.sheet || r.styleSheet);
            var l = p(u("group"), { behavior: "url(#default#VML)" });
            !s(l, "transform") && l.adj ? t() : (f = s(l, "animation"));
        }
        return i;
    }),
    (function (t) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], t) : t(jQuery);
    })(function ($t) {
        function s(i) {
            return (
                !i || void 0 !== i.allowPageScroll || (void 0 === i.swipe && void 0 === i.swipeStatus) || (i.allowPageScroll = zt),
                void 0 !== i.click && void 0 === i.tap && (i.tap = i.click),
                i || (i = {}),
                (i = $t.extend({}, $t.fn.swipe.defaults, i)),
                this.each(function () {
                    var t = $t(this),
                        e = t.data(te);
                    e || ((e = new n(this, i)), t.data(te, e));
                })
            );
        }
        function n(t, r) {
            function e(t) {
                if (!(O() || 0 < $t(t.target).closest(r.excludedElements, bt).length)) {
                    var e = t.originalEvent ? t.originalEvent : t,
                        i,
                        s = Qt ? e.touches[0] : e;
                    return (
                        (wt = qt),
                        Qt ? (yt = e.touches.length) : t.preventDefault(),
                        (mt = ct = null),
                        (ft = 1),
                        (gt = pt = ut = ht = dt = 0),
                        (kt = H()),
                        (vt = Y()),
                        E(),
                        !Qt || yt === r.fingers || r.fingers === Yt || v() ? (W(0, s), (_t = tt()), 2 == yt && (W(1, e.touches[1]), (ut = pt = U(kt[0].start, kt[1].start))), (r.swipeStatus || r.pinchStatus) && (i = d(e, wt))) : (i = !1),
                        !1 === i
                            ? (d(e, (wt = Kt)), i)
                            : (r.hold &&
                                  (Mt = setTimeout(
                                      $t.proxy(function () {
                                          bt.trigger("hold", [e.target]), r.hold && (i = r.hold.call(bt, e, e.target));
                                      }, this),
                                      r.longTapThreshold
                                  )),
                              R(!0),
                              null)
                    );
                }
            }
            function i(t) {
                var e = t.originalEvent ? t.originalEvent : t;
                if (wt !== Xt && wt !== Kt && !z()) {
                    var i,
                        s,
                        n = j(Qt ? e.touches[0] : e);
                    if (
                        ((Ct = tt()),
                        Qt && (yt = e.touches.length),
                        r.hold && clearTimeout(Mt),
                        (wt = Ut),
                        2 == yt && (0 == ut ? (W(1, e.touches[1]), (ut = pt = U(kt[0].start, kt[1].start))) : (j(e.touches[1]), (pt = U(kt[0].end, kt[1].end)), (mt = K(kt[0].end, kt[1].end))), (ft = X(ut, pt)), (gt = Math.abs(ut - pt))),
                        yt === r.fingers || r.fingers === Yt || !Qt || v())
                    ) {
                        if ((g(t, (ct = Z(n.start, n.end))), (dt = Q(n.start, n.end)), (ht = q()), N(ct, dt), (r.swipeStatus || r.pinchStatus) && (i = d(e, wt)), !r.triggerOnTouchEnd || r.triggerOnTouchLeave)) {
                            var a = !0;
                            if (r.triggerOnTouchLeave) {
                                var o = et(this);
                                a = it(n.end, o);
                            }
                            !r.triggerOnTouchEnd && a ? (wt = l(Ut)) : r.triggerOnTouchLeave && !a && (wt = l(Xt)), (wt != Kt && wt != Xt) || d(e, wt);
                        }
                    } else d(e, (wt = Kt));
                    !1 === i && d(e, (wt = Kt));
                }
            }
            function s(t) {
                var e = t.originalEvent;
                return Qt && 0 < e.touches.length
                    ? (A(), !0)
                    : (z() && (yt = St),
                      (Ct = tt()),
                      (ht = q()),
                      u() || !h() ? d(e, (wt = Kt)) : r.triggerOnTouchEnd || (0 == r.triggerOnTouchEnd && wt === Ut) ? (t.preventDefault(), d(e, (wt = Xt))) : !r.triggerOnTouchEnd && x() ? c(e, (wt = Xt), jt) : wt === Ut && d(e, (wt = Kt)),
                      R(!1),
                      null);
            }
            function n() {
                (pt = ut = _t = Ct = yt = 0), (ft = 1), E(), R(!1);
            }
            function a(t) {
                var e = t.originalEvent;
                r.triggerOnTouchLeave && d(e, (wt = l(Xt)));
            }
            function o() {
                bt.unbind(nt, e), bt.unbind(lt, n), bt.unbind(at, i), bt.unbind(ot, s), rt && bt.unbind(rt, a), R(!1);
            }
            function l(t) {
                var e = t,
                    i = f(),
                    s = h(),
                    n = u();
                return !i || n ? (e = Kt) : !s || t != Ut || (r.triggerOnTouchEnd && !r.triggerOnTouchLeave) ? !s && t == Xt && r.triggerOnTouchLeave && (e = Kt) : (e = Xt), e;
            }
            function d(t, e) {
                var i = void 0;
                return (
                    k() || y() || b() || v()
                        ? ((k() || y()) && (i = c(t, e, Rt)), (b() || v()) && !1 !== i && (i = c(t, e, Wt)))
                        : P() && !1 !== i
                        ? (i = c(t, e, Bt))
                        : F() && !1 !== i
                        ? (i = c(t, e, Ht))
                        : I() && !1 !== i && (i = c(t, e, jt)),
                    e === Kt && n(t),
                    e === Xt && (Qt ? 0 == t.touches.length && n(t) : n(t)),
                    i
                );
            }
            function c(t, e, i) {
                var s = void 0;
                if (i == Rt) {
                    if ((bt.trigger("swipeStatus", [e, ct || null, dt || 0, ht || 0, yt, kt]), r.swipeStatus && !1 === (s = r.swipeStatus.call(bt, t, e, ct || null, dt || 0, ht || 0, yt, kt)))) return !1;
                    if (e == Xt && w()) {
                        if ((bt.trigger("swipe", [ct, dt, ht, yt, kt]), r.swipe && !1 === (s = r.swipe.call(bt, t, ct, dt, ht, yt, kt)))) return !1;
                        switch (ct) {
                            case Lt:
                                bt.trigger("swipeLeft", [ct, dt, ht, yt, kt]), r.swipeLeft && (s = r.swipeLeft.call(bt, t, ct, dt, ht, yt, kt));
                                break;
                            case It:
                                bt.trigger("swipeRight", [ct, dt, ht, yt, kt]), r.swipeRight && (s = r.swipeRight.call(bt, t, ct, dt, ht, yt, kt));
                                break;
                            case Pt:
                                bt.trigger("swipeUp", [ct, dt, ht, yt, kt]), r.swipeUp && (s = r.swipeUp.call(bt, t, ct, dt, ht, yt, kt));
                                break;
                            case Ft:
                                bt.trigger("swipeDown", [ct, dt, ht, yt, kt]), r.swipeDown && (s = r.swipeDown.call(bt, t, ct, dt, ht, yt, kt));
                        }
                    }
                }
                if (i == Wt) {
                    if ((bt.trigger("pinchStatus", [e, mt || null, gt || 0, ht || 0, yt, ft, kt]), r.pinchStatus && !1 === (s = r.pinchStatus.call(bt, t, e, mt || null, gt || 0, ht || 0, yt, ft, kt)))) return !1;
                    if (e == Xt && m())
                        switch (mt) {
                            case At:
                                bt.trigger("pinchIn", [mt || null, gt || 0, ht || 0, yt, ft, kt]), r.pinchIn && (s = r.pinchIn.call(bt, t, mt || null, gt || 0, ht || 0, yt, ft, kt));
                                break;
                            case Et:
                                bt.trigger("pinchOut", [mt || null, gt || 0, ht || 0, yt, ft, kt]), r.pinchOut && (s = r.pinchOut.call(bt, t, mt || null, gt || 0, ht || 0, yt, ft, kt));
                        }
                }
                return (
                    i == jt
                        ? (e !== Kt && e !== Xt) ||
                          (clearTimeout(Dt),
                          clearTimeout(Mt),
                          S() && !M()
                              ? ((Tt = tt()),
                                (Dt = setTimeout(
                                    $t.proxy(function () {
                                        (Tt = null), bt.trigger("tap", [t.target]), r.tap && (s = r.tap.call(bt, t, t.target));
                                    }, this),
                                    r.doubleTapThreshold
                                )))
                              : ((Tt = null), bt.trigger("tap", [t.target]), r.tap && (s = r.tap.call(bt, t, t.target))))
                        : i == Bt
                        ? (e !== Kt && e !== Xt) || (clearTimeout(Dt), (Tt = null), bt.trigger("doubletap", [t.target]), r.doubleTap && (s = r.doubleTap.call(bt, t, t.target)))
                        : i == Ht && ((e !== Kt && e !== Xt) || (clearTimeout(Dt), (Tt = null), bt.trigger("longtap", [t.target]), r.longTap && (s = r.longTap.call(bt, t, t.target)))),
                    s
                );
            }
            function h() {
                var t = !0;
                return null !== r.threshold && (t = dt >= r.threshold), t;
            }
            function u() {
                var t = !1;
                return null !== r.cancelThreshold && null !== ct && (t = V(ct) - dt >= r.cancelThreshold), t;
            }
            function p() {
                return null === r.pinchThreshold || gt >= r.pinchThreshold;
            }
            function f() {
                var t;
                return (t = !r.maxTimeThreshold || !(ht >= r.maxTimeThreshold));
            }
            function g(t, e) {
                if (!1 !== r.preventDefaultEvents)
                    if (r.allowPageScroll === zt) t.preventDefault();
                    else {
                        var i = r.allowPageScroll === Ot;
                        switch (e) {
                            case Lt:
                                ((r.swipeLeft && i) || (!i && r.allowPageScroll != Nt)) && t.preventDefault();
                                break;
                            case It:
                                ((r.swipeRight && i) || (!i && r.allowPageScroll != Nt)) && t.preventDefault();
                                break;
                            case Pt:
                                ((r.swipeUp && i) || (!i && r.allowPageScroll != Vt)) && t.preventDefault();
                                break;
                            case Ft:
                                ((r.swipeDown && i) || (!i && r.allowPageScroll != Vt)) && t.preventDefault();
                        }
                    }
            }
            function m() {
                var t = _(),
                    e = C(),
                    i = p();
                return t && e && i;
            }
            function v() {
                return !!(r.pinchStatus || r.pinchIn || r.pinchOut);
            }
            function b() {
                return !(!m() || !v());
            }
            function w() {
                var t = f(),
                    e = h(),
                    i = _(),
                    s = C(),
                    n,
                    a;
                return !u() && s && i && e && t;
            }
            function y() {
                return !!(r.swipe || r.swipeStatus || r.swipeLeft || r.swipeRight || r.swipeUp || r.swipeDown);
            }
            function k() {
                return !(!w() || !y());
            }
            function _() {
                return yt === r.fingers || r.fingers === Yt || !Qt;
            }
            function C() {
                return 0 !== kt[0].end.x;
            }
            function x() {
                return !!r.tap;
            }
            function S() {
                return !!r.doubleTap;
            }
            function T() {
                return !!r.longTap;
            }
            function D() {
                if (null == Tt) return !1;
                var t = tt();
                return S() && t - Tt <= r.doubleTapThreshold;
            }
            function M() {
                return D();
            }
            function $() {
                return (1 === yt || !Qt) && (isNaN(dt) || dt < r.threshold);
            }
            function L() {
                return ht > r.longTapThreshold && dt < Gt;
            }
            function I() {
                return !(!$() || !x());
            }
            function P() {
                return !(!D() || !S());
            }
            function F() {
                return !(!L() || !T());
            }
            function A() {
                (xt = tt()), (St = event.touches.length + 1);
            }
            function E() {
                St = xt = 0;
            }
            function z() {
                var t = !1,
                    e;
                xt && tt() - xt <= r.fingerReleaseThreshold && (t = !0);
                return t;
            }
            function O() {
                return !(!0 !== bt.data(te + "_intouch"));
            }
            function R(t) {
                !0 === t ? (bt.bind(at, i), bt.bind(ot, s), rt && bt.bind(rt, a)) : (bt.unbind(at, i, !1), bt.unbind(ot, s, !1), rt && bt.unbind(rt, a, !1)), bt.data(te + "_intouch", !0 === t);
            }
            function W(t, e) {
                var i = void 0 !== e.identifier ? e.identifier : 0;
                return (kt[t].identifier = i), (kt[t].start.x = kt[t].end.x = e.pageX || e.clientX), (kt[t].start.y = kt[t].end.y = e.pageY || e.clientY), kt[t];
            }
            function j(t) {
                var e,
                    i = B(void 0 !== t.identifier ? t.identifier : 0);
                return (i.end.x = t.pageX || t.clientX), (i.end.y = t.pageY || t.clientY), i;
            }
            function B(t) {
                for (var e = 0; e < kt.length; e++) if (kt[e].identifier == t) return kt[e];
            }
            function H() {
                for (var t = [], e = 0; e <= 5; e++) t.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
                return t;
            }
            function N(t, e) {
                (e = Math.max(e, V(t))), (vt[t].distance = e);
            }
            function V(t) {
                if (vt[t]) return vt[t].distance;
            }
            function Y() {
                var t = {};
                return (t[Lt] = G(Lt)), (t[It] = G(It)), (t[Pt] = G(Pt)), (t[Ft] = G(Ft)), t;
            }
            function G(t) {
                return { direction: t, distance: 0 };
            }
            function q() {
                return Ct - _t;
            }
            function U(t, e) {
                var i = Math.abs(t.x - e.x),
                    s = Math.abs(t.y - e.y);
                return Math.round(Math.sqrt(i * i + s * s));
            }
            function X(t, e) {
                var i;
                return ((e / t) * 1).toFixed(2);
            }
            function K() {
                return ft < 1 ? Et : At;
            }
            function Q(t, e) {
                return Math.round(Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)));
            }
            function J(t, e) {
                var i = t.x - e.x,
                    s = e.y - t.y,
                    n = Math.atan2(s, i),
                    a = Math.round((180 * n) / Math.PI);
                return a < 0 && (a = 360 - Math.abs(a)), a;
            }
            function Z(t, e) {
                var i = J(t, e);
                return i <= 45 && 0 <= i ? Lt : i <= 360 && 315 <= i ? Lt : 135 <= i && i <= 225 ? It : 45 < i && i < 135 ? Ft : Pt;
            }
            function tt() {
                var t;
                return new Date().getTime();
            }
            function et(t) {
                var e = (t = $t(t)).offset(),
                    i;
                return { left: e.left, right: e.left + t.outerWidth(), top: e.top, bottom: e.top + t.outerHeight() };
            }
            function it(t, e) {
                return t.x > e.left && t.x < e.right && t.y > e.top && t.y < e.bottom;
            }
            var st = Qt || Zt || !r.fallbackToMouseEvents,
                nt = st ? (Zt ? (Jt ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
                at = st ? (Zt ? (Jt ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
                ot = st ? (Zt ? (Jt ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
                rt = st ? null : "mouseleave",
                lt = Zt ? (Jt ? "MSPointerCancel" : "pointercancel") : "touchcancel",
                dt = 0,
                ct = null,
                ht = 0,
                ut = 0,
                pt = 0,
                ft = 1,
                gt = 0,
                mt = 0,
                vt = null,
                bt = $t(t),
                wt = "start",
                yt = 0,
                kt = null,
                _t = 0,
                Ct = 0,
                xt = 0,
                St = 0,
                Tt = 0,
                Dt = null,
                Mt = null;
            try {
                bt.bind(nt, e), bt.bind(lt, n);
            } catch (t) {
                $t.error("events not supported " + nt + "," + lt + " on jQuery.swipe");
            }
            (this.enable = function () {
                return bt.bind(nt, e), bt.bind(lt, n), bt;
            }),
                (this.disable = function () {
                    return o(), bt;
                }),
                (this.destroy = function () {
                    o(), bt.data(te, null), (bt = null);
                }),
                (this.option = function (t, e) {
                    if (void 0 !== r[t]) {
                        if (void 0 === e) return r[t];
                        r[t] = e;
                    } else $t.error("Option " + t + " does not exist on jQuery.swipe.options");
                    return null;
                });
        }
        var Lt = "left",
            It = "right",
            Pt = "up",
            Ft = "down",
            At = "in",
            Et = "out",
            zt = "none",
            Ot = "auto",
            Rt = "swipe",
            Wt = "pinch",
            jt = "tap",
            Bt = "doubletap",
            Ht = "longtap",
            t = "hold",
            Nt = "horizontal",
            Vt = "vertical",
            Yt = "all",
            Gt = 10,
            qt = "start",
            Ut = "move",
            Xt = "end",
            Kt = "cancel",
            Qt = "ontouchstart" in window,
            Jt = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
            Zt = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            te = "TouchSwipe",
            e = {
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
        ($t.fn.swipe = function (t) {
            var e = $t(this),
                i = e.data(te);
            if (i && "string" == typeof t) {
                if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
                $t.error("Method " + t + " does not exist on jQuery.swipe");
            } else if (!(i || ("object" != typeof t && t))) return s.apply(this, arguments);
            return e;
        }),
            ($t.fn.swipe.defaults = e),
            ($t.fn.swipe.phases = { PHASE_START: qt, PHASE_MOVE: Ut, PHASE_END: Xt, PHASE_CANCEL: Kt }),
            ($t.fn.swipe.directions = { LEFT: Lt, RIGHT: It, UP: Pt, DOWN: Ft, IN: At, OUT: Et }),
            ($t.fn.swipe.pageScroll = { NONE: zt, HORIZONTAL: Nt, VERTICAL: Vt, AUTO: Ot }),
            ($t.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: Yt });
    });
var $buo = function (t, e) {
        function i(t) {
            var e = new Date(new Date().getTime() + 36e5 * t);
            document.cookie = "browserupdateorg=pause; expires=" + e.toGMTString() + "; path=/";
        }
        function s() {
            for (var t = arguments, e = t[0], i = 1; i < t.length; ++i) e = e.replace(/%s/, t[i]);
            return e;
        }
        var n = 20,
            a = window.navigator,
            o;
        window._buorgres = this.op = t || {};
        var r = this.op.l;
        (this.op.l = t.l || (a.languages ? a.languages[0] : null) || a.language || a.browserLanguage || a.userLanguage || document.documentElement.getAttribute("lang") || "en"), (this.op.l = this.op.l.replace("_", "-").toLowerCase());
        var l = this.op.l.substr(0, 2),
            d = { i: 12, f: 49, o: 39, s: 9.1, n: 20, c: 53, y: 16.4, v: 1.4 },
            c = { i: 10, f: -3, o: -3, s: 7.1, n: 12, c: -3, a: 534, y: -0.1, v: -0.1 };
        if (!this.op.c || (this.op.c && this.op.c < 4)) var h = { i: 9, f: 10, o: 20, s: 7, n: 12 };
        else var h = { i: 8, f: 5, o: 12.5, s: 6.2, n: 12 };
        var u = t.vs || {},
            p = t.vs || c;
        for (o in c) p[o] || (p[o] = c[o]), d[o] && p[o] >= d[o] && (p[o] = d[o] - 0.2), d[o] && p[o] < 0 && (p[o] = d[o] + p[o]), h[o] && p[o] < h[o] && (p[o] = h[o]);
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
        var g = $bu_getBrowser();
        if (this.op.test || !(!g || !g.n || "x" == g.n || !1 !== g.donotnotify || (-1 < document.cookie.indexOf("browserupdateorg=pause") && 0 < this.op.reminder) || g.v > p[g.n] || (g.mobile && !1 === t.mobile)))
            if (this.op.nomessage) t.onshow(this.op);
            else {
                var m;
                if (!this.op.test && 1e5 * Math.random() < 1) new Image().src = "//browser-update.org/viewcount.php?n=" + g.n + "&v=" + g.v + "&p=" + escape(f) + "&jsv=20&inv=" + this.op.v + "&vs=" + u.i + "," + u.f + "," + u.o + "," + u.s;
                0 < this.op.reminder && i(this.op.reminder);
                var v = {
                    en: "This website would like to remind you: Your browser (%s) is <b>out of date</b>. <a%s>Update your browser</a> for more security, comfort and the best experience on this site.",
                    de:
                        "Sie verwenden einen <b>veralteten Browser</b> (%s) mit <b>Sicherheitsschwachstellen</b> und <b>k&ouml;nnen nicht alle Funktionen dieser Webseite nutzen</b>. <a%s>Hier erfahren Sie, wie einfach Sie Ihren Browser aktualisieren k&ouml;nnen</a>.",
                    it: "Il tuo browser (%s) <b>non Ã¨ aggiornato</b>. Ha delle <b>falle di sicurezza</b> e potrebbe <b>non visualizzare correttamente</b> le pagine di questo e altri siti. <a%s>Aggiorna il tuo browser</a>!",
                    pl:
                        "PrzeglÄ…darka (%s), ktÃ³rej uÅ¼ywasz, jest przestarzaÅ‚a. Posiada ona udokumentowane <b>luki bezpieczeÅ„stwa, inne wady</b> oraz <b>ograniczonÄ… funkcjonalnoÅ›Ä‡</b>. Tracisz moÅ¼liwoÅ›Ä‡ skorzystania z peÅ‚ni moÅ¼liwoÅ›ci oferowanych przez niektÃ³re strony internetowe. <a%s>Dowiedz siÄ™ jak zaktualizowaÄ‡ swojÄ… przeglÄ…darkÄ™</a>.",
                    es:
                        "Su navegador (%s) <b>no estÃ¡ actualizado</b>. Tiene <b>fallos de seguridad</b> conocidos y podrÃ­a <b>no mostrar todas las caracterÃ­sticas</b> de este y otros sitios web. <a%s>AverigÃ¼e cÃ³mo actualizar su navegador.</a>",
                    nl: "Uw browser (%s) is <b>oud</b>. Het heeft bekende <b>veiligheidsissues</b> en kan <b>niet alle mogelijkheden</b> weergeven van deze of andere websites. <a%s>Lees meer over hoe uw browser te upgraden</a>",
                    pt: "Seu navegador (%s) estÃ¡ <b>desatualizado</b>. Ele possui <b>falhas de seguranÃ§a</b> e pode <b>apresentar problemas</b> para exibir este e outros websites. <a%s>Veja como atualizar o seu navegador</a>",
                    sl: "VaÅ¡ brskalnik (%s) je <b>zastarel</b>. Ima veÄ <b>varnostnih pomankljivosti</b> in morda <b>ne bo pravilno prikazal</b> te ali drugih strani. <a%s>Poglejte kako lahko posodobite svoj brskalnik</a>",
                    ru:
                        "Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€ (%s) <b>ÑƒÑÑ‚Ð°Ñ€ÐµÐ»</b>. ÐžÐ½ Ð¸Ð¼ÐµÐµÑ‚ <b>ÑƒÑÐ·Ð²Ð¸Ð¼Ð¾ÑÑ‚Ð¸ Ð² Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸</b> Ð¸ Ð¼Ð¾Ð¶ÐµÑ‚ <b>Ð½Ðµ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ Ð²ÑÐµ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸</b> Ð½Ð° ÑÑ‚Ð¾Ð¼ Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ñ… ÑÐ°Ð¹Ñ‚Ð°Ñ…. <a%s>Ð£Ð·Ð½Ð°Ð¹Ñ‚Ðµ, ÐºÐ°Ðº Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€</a>",
                    id:
                        "Browser Anda (%s) sudah <b>kedaluarsa</b>. Browser yang Anda pakai memiliki <b>kelemahan keamanan</b> dan mungkin <b>tidak dapat menampilkan semua fitur</b> dari situs Web ini dan lainnya. <a%s> Pelajari cara memperbarui browser Anda</a>",
                    uk:
                        "Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€ (%s) <b>Ð·Ð°ÑÑ‚Ð°Ñ€Ñ–Ð²</b>. Ð’Ñ–Ð½ <b>ÑƒÑ€Ð°Ð·Ð»Ð¸Ð²Ð¸Ð¹</b> Ð¹ Ð¼Ð¾Ð¶Ðµ <b>Ð½Ðµ Ð²Ñ–Ð´Ð¾Ð±Ñ€Ð°Ð¶Ð°Ñ‚Ð¸ Ð²ÑÑ– Ð¼Ð¾Ð¶Ð»Ð¸Ð²Ð¾ÑÑ‚Ñ–</b> Ð½Ð° Ñ†ÑŒÐ¾Ð¼Ñƒ Ð¹ Ñ–Ð½ÑˆÐ¸Ñ… ÑÐ°Ð¹Ñ‚Ð°Ñ…. <a%s>Ð”Ñ–Ð·Ð½Ð°Ð¹Ñ‚ÐµÑÑŒ, ÑÐº Ð¾Ð½Ð¾Ð²Ð¸Ñ‚Ð¸ Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€</a>",
                    ko:
                        "ì§€ê¸ˆ ì‚¬ìš©í•˜ê³  ê³„ì‹  ë¸Œë¼ìš°ì €(%s)ëŠ” <b>ì˜¤ëž˜ë˜ì—ˆìŠµë‹ˆë‹¤.</b> ì•Œë ¤ì§„ <b>ë³´ì•ˆ ì·¨ì•½ì </b>ì´ ì¡´ìž¬í•˜ë©°, ìƒˆë¡œìš´ ì›¹ ì‚¬ì´íŠ¸ê°€ <b>ê¹¨ì ¸ ë³´ì¼ ìˆ˜ë„</b> ìžˆìŠµë‹ˆë‹¤. <a%s>ë¸Œë¼ìš°ì €ë¥¼ ì–´ë–»ê²Œ ì—…ë°ì´íŠ¸í•˜ë‚˜ìš”?</a>",
                    rm:
                        "Tes navigatur (%s) Ã¨ <b>antiquÃ </b>. El cuntegna <b>problems da segirezza</b> enconuschents e mussa eventualmain <b>betg tut las funcziuns</b> da questa ed autras websites. <a%s>Emprenda sco actualisar tes navigatur</a>.",
                    jp:
                        "ãŠä½¿ã„ã®ãƒ–ãƒ©ã‚¦ã‚¶ã€Œ%sã€ã¯ã€<b>æ™‚ä»£é…ã‚Œ</b>ã®ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã§ã™ã€‚æ—¢çŸ¥ã®<b>è„†å¼±æ€§</b>ãŒå­˜åœ¨ã™ã‚‹ã°ã‹ã‚Šã‹ã€<b>æ©Ÿèƒ½ä¸è¶³</b>ã«ã‚ˆã£ã¦ã€ã‚µã‚¤ãƒˆãŒæ­£å¸¸ã«è¡¨ç¤ºã§ããªã„å¯èƒ½æ€§ãŒã‚ã‚Šã¾ã™ã€‚ <a%s>ãƒ–ãƒ©ã‚¦ã‚¶ã‚’æ›´æ–°ã™ã‚‹æ–¹æ³•ã‚’ç¢ºèªã™ã‚‹</a>",
                    fr:
                        "Votre navigateur (%s) est <b>pÃ©rimÃ©</b>. Il contient des <b>failles de sÃ©curitÃ©</b> et pourrait <b>ne pas afficher certaines fonctionnalitÃ©s</b> des sites internet rÃ©cents. <a%s>DÃ©couvrez comment mettre votre navigateur Ã  jour</a>",
                    da: "Din browser (%s) er <b>for&aelig;ldet</b>. Den har kendte <b>sikkerhedshuller</b> og kan m&aring;ske <b>ikke vise alle funktioner</b> p&aring; dette og andre websteder. <a%s>Se hvordan du opdaterer din browser</a>",
                    sq:
                        "Shfletuesi juaj (%s) Ã«shtÃ« <b>ca i vjetÃ«r</b>. Ai ka <b>tÃ« meta sigurie</b> tÃ« njohura dhe mundet tÃ« <b>mos i shfaqÃ« tÃ« gjitha karakteristikat</b> e kÃ«saj dhe shumÃ« faqeve web tÃ« tjera. <a%s>MÃ«soni se si tÃ« pÃ«rditÃ«soni shfletuesin tuaj</a>",
                    ca: "El teu navegador (%s) estÃ  <b>desactualitzat</b>. TÃ© <b>vulnerabilitats</b> conegudes i pot <b>no mostrar totes les caracterÃ­stiques</b> d'aquest i altres llocs web. <a%s>AprÃ¨n a actualitzar el navegador</a>",
                    fa:
                        "Ù…Ø±ÙˆØ±Ú¯Ø± Ø´Ù…Ø§ (%s) <b>Ø§Ø² Ø±Ø¯Ù‡ Ø®Ø§Ø±Ø¬ Ø´Ø¯Ù‡</b> Ù…ÛŒ Ø¨Ø§Ø´Ø¯. Ø§ÛŒÙ† Ù…Ø±ÙˆØ±Ú¯Ø± Ø¯Ø§Ø±Ø§ÛŒ <b>Ù…Ø´Ú©Ù„Ø§Øª Ø§Ù…Ù†ÛŒØªÛŒ Ø´Ù†Ø§Ø®ØªÙ‡ Ø´Ø¯Ù‡</b> Ù…ÛŒ Ø¨Ø§Ø´Ø¯ Ùˆ <b>Ù†Ù…ÛŒ ØªÙˆØ§Ù†Ø¯ ØªÙ…Ø§Ù…ÛŒ ÙˆÛŒÚ˜Ú¯ÛŒ Ù‡Ø§ÛŒ Ø§ÛŒÙ†</b> ÙˆØ¨ Ø³Ø§ÛŒØª Ùˆ Ø¯ÛŒÚ¯Ø± ÙˆØ¨ Ø³Ø§ÛŒØª Ù‡Ø§ Ø±Ø§ Ø¨Ù‡ Ø®ÙˆØ¨ÛŒ Ù†Ù…Ø§ÛŒØ´ Ø¯Ù‡Ø¯. <a%s>Ø¯Ø± Ø®ØµÙˆØµ Ú¯Ø±ÙØªÙ† Ø±Ø§Ù‡Ù†Ù…Ø§ÛŒÛŒ Ø¯Ø±Ø®ØµÙˆØµ Ù†Ø­ÙˆÙ‡ ÛŒ Ø¨Ù‡ Ø±ÙˆØ² Ø±Ø³Ø§Ù†ÛŒ Ù…Ø±ÙˆØ±Ú¯Ø± Ø®ÙˆØ¯ Ø§ÛŒÙ†Ø¬Ø§ Ú©Ù„ÛŒÚ© Ú©Ù†ÛŒØ¯.</a>",
                    sv: "Din webblÃ¤sare (%s) Ã¤r <b>fÃ¶rÃ¥ldrad</b>. Den har kÃ¤nda <b>sÃ¤kerhetshÃ¥l</b> och <b>kan inte visa alla funktioner korrekt</b> pÃ¥ denna och pÃ¥ andra webbsidor. <a%s>Uppdatera din webblÃ¤sare idag</a>",
                    hu:
                        "Az Ã–n bÃ¶ngÃ©szÅ‘je (%s) <b>elavult</b>. Ismert <b>biztonsÃ¡gi hiÃ¡nyossÃ¡gai</b> vannak Ã©s esetlegesen <b>nem tud minden funkciÃ³t megjelenÃ­teni</b> ezen vagy mÃ¡s weboldalakon. <a%s>Itt talÃ¡l bÅ‘vebb informÃ¡ciÃ³t a bÃ¶ngÃ©szÅ‘jÃ©nek frissÃ­tÃ©sÃ©vel kapcsolatban</a>\t\t ",
                    gl:
                        "O seu navegador (%s) estÃ¡ <b>desactualizado</b>. Ten coÃ±ecidos <b>fallos de seguranza</b> e poderÃ­a <b>non mostrar tÃ³dalas caracterÃ­sticas</b> deste e outros sitios web. <a%s>Aprenda como pode actualizar o seu navegador</a>",
                    cs:
                        "VÃ¡Å¡ prohlÃ­Å¾eÄ (%s) je <b>zastaralÃ½</b>. Jsou znÃ¡my <b>bezpeÄnostnÃ­ rizika</b> a moÅ¾nÃ¡ <b>nedokÃ¡Å¾e zobrazit vÅ¡echny prvky</b> tÃ©to a dalÅ¡Ã­ch webovÃ½ch strÃ¡nek. <a%s>NauÄte se, jak aktualizovat svÅ¯j prohlÃ­Å¾eÄ</a>",
                    he:
                        "×”×“×¤×“×¤×Ÿ ×©×œ×š (%s) <b>××™× ×• ×ž×¢×•×“×›×Ÿ</b>. ×™×© ×œ×• <b>×‘×¢×™×•×ª ××‘×˜×—×” ×™×“×•×¢×•×ª</b> ×•×¢×©×•×™ <b>×œ× ×œ×”×¦×™×’ ××ª ×›×œ ×”×ª×›×•× ×•×ª</b> ×©×œ ××ª×¨ ×–×” ×•××ª×¨×™× ××—×¨×™×. <a%s>×œ×ž×“ ×›×™×¦×“ ×œ×¢×“×›×Ÿ ××ª ×”×“×¤×“×¤×Ÿ ×©×œ×š</a>",
                    nb: "Nettleseren din (%s) er <b>utdatert</b>. Den har kjente <b>sikkerhetshull</b> og <b>kan ikke vise alle funksjonene</b> pÃ¥ denne og andre websider. <a%s>LÃ¦r hvordan du kan oppdatere din nettleser</a>",
                    "zh-tw": "æ‚¨çš„ç€è¦½å™¨(%s) éœ€è¦æ›´æ–°ã€‚è©²ç€è¦½å™¨æœ‰è«¸å¤šå®‰å…¨æ¼æ´žï¼Œç„¡æ³•é¡¯ç¤ºæœ¬ç¶²ç«™çš„æ‰€æœ‰åŠŸèƒ½ã€‚ <a%s>çž­è§£å¦‚ä½•æ›´æ–°ç€è¦½å™¨</a>",
                    zh: "æ‚¨çš„æµè§ˆå™¨(%s) éœ€è¦æ›´æ–°ã€‚è¯¥æµè§ˆå™¨æœ‰è¯¸å¤šå®‰å…¨æ¼æ´žï¼Œæ— æ³•æ˜¾ç¤ºæœ¬ç½‘ç«™çš„æ‰€æœ‰åŠŸèƒ½ã€‚ <a%s>äº†è§£å¦‚ä½•æ›´æ–°æµè§ˆå™¨</a>",
                    fi:
                        "Selaimesi (%s) on <b>vanhentunut</b>. SiinÃ¤ on tunnettuja tietoturvaongelmia eikÃ¤ se vÃ¤lttÃ¤mÃ¤ttÃ¤ tue kaikkia ominaisuuksia tÃ¤llÃ¤ tai muilla sivustoilla. <a%s>Lue lisÃ¤Ã¤ siitÃ¤ kuinka pÃ¤ivitÃ¤t selaimesi</a>.",
                    tr:
                        "TarayÄ±cÄ±nÄ±z (%s) <b>gÃ¼ncel deÄŸil</b>. Eski versiyon olduÄŸu iÃ§in <b>gÃ¼venlik aÃ§Ä±klarÄ±</b> vardÄ±r ve gÃ¶rmek istediÄŸiniz bu web sitesinin ve diÄŸer web sitelerinin <b>tÃ¼m Ã¶zelliklerini hatasÄ±z bir ÅŸekilde</b> gÃ¶steremeyecektir. <a%s>TarayÄ±cÄ±nÄ±zÄ± nasÄ±l gÃ¼ncelleyebileceÄŸinizi Ã¶ÄŸrenin</a>",
                    ro:
                        "Browser-ul (%s) tau este <b>invechit</b>. Detine <b>probleme de securitate</b> cunoscute si poate <b>sa nu afiseze corect</b> toate elementele acestui si altor site-uri. <a%s>Invata cum sa-ti actualizezi browserul.</a>",
                    bg:
                        "Ð’Ð°ÑˆÐ¸ÑÑ‚ Ð±Ñ€Ð°ÑƒÐ·ÑŠÑ€ (%s) <b>Ð½Ðµ Ðµ Ð°ÐºÑ‚ÑƒÐ°Ð»ÐµÐ½</b>. Ð˜Ð·Ð²ÐµÑÑ‚Ð½Ð¾ Ðµ, Ñ‡Ðµ Ð¸Ð¼Ð° <b>Ð¿Ñ€Ð¾Ð¿ÑƒÑÐºÐ¸ Ð² ÑÐ¸Ð³ÑƒÑ€Ð½Ð¾ÑÑ‚Ñ‚Ð°</b> Ð¸ Ð¼Ð¾Ð¶Ðµ <b>Ð´Ð° Ð½Ðµ Ð¿Ð¾ÐºÐ°Ð¶Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð½Ð¾</b> Ñ‚Ð¾Ð·Ð¸ Ð¸Ð»Ð¸ Ð´Ñ€ÑƒÐ³Ð¸ ÑÐ°Ð¹Ñ‚Ð¾Ð²Ðµ. <a%s>ÐÐ°ÑƒÑ‡ÐµÑ‚Ðµ ÐºÐ°Ðº Ð´Ð° Ð°ÐºÑ‚ÑƒÐ°Ð»Ð¸Ð·Ð¸Ñ€Ð°Ñ‚Ðµ Ð±Ñ€Ð°ÑƒÐ·ÑŠÑ€Ð° ÑÐ¸</a>.",
                    el:
                        "Î‘Ï…Ï„ÏŒÏ‚ Î¿ Î¹ÏƒÏ„ÏŒÏ„Î¿Ï€Î¿Ï‚ ÏƒÎ±Ï‚ Ï…Ï€ÎµÎ½Î¸Ï…Î¼Î¯Î¶ÎµÎ¹: ÎŸ Ï†Ï…Î»Î»Î¿Î¼ÎµÏ„ÏÎ·Ï„Î®Ï‚ ÏƒÎ±Ï‚ (%s) ÎµÎ¯Î½Î±Î¹ <b>Ï€Î±ÏÏ‰Ï‡Î·Î¼Î­Î½Î¿Ï‚</b>. <a%s>Î•Î½Î·Î¼ÎµÏÏŽÏƒÏ„Îµ Ï„Î¿ Ï€ÏÏŒÎ³ÏÎ±Î¼Î¼Î± Ï€ÎµÏÎ¹Î®Î³Î·ÏƒÎ®Ï‚ ÏƒÎ±Ï‚</a> Î³Î¹Î± Î¼ÎµÎ³Î±Î»ÏÏ„ÎµÏÎ· Î±ÏƒÏ†Î¬Î»ÎµÎ¹Î± ÎºÎ±Î¹ Î¬Î½ÎµÏƒÎ· ÏƒÎµ Î±Ï…Ï„Î®Î½ Ï„Î·Î½ Î¹ÏƒÏ„Î¿ÏƒÎµÎ»Î¯Î´Î±.",
                    ar:
                        "Ù…ØªØµÙØ­Ùƒ (%s) <b>Ù…Ù†ØªÙ‡Ù‰ Ø§Ù„ØµÙ„Ø§Ø­ÙŠÙ‡</b>. ÙˆÙŠÙˆØ¬Ø¯ Ø¨Ù‡ <b>Ø«ØºØ±Ø§Øª Ø§Ù…Ù†ÙŠØ©</b> Ù…Ø¹Ø±ÙˆÙØ© ÙˆÙ‚Ø¯ <b>Ù„Ø§ ÙŠÙØ´ØºÙ„ ÙƒØ«ÙŠØ± Ù…Ù† Ø§Ù„Ù…ÙŠØ²Ø§Øª</b> Ø§Ù„Ù…ØªØ¹Ù„Ù‚Ù‡ Ø¨Ù‡Ø°Ù‡ Ø§Ù„Ù…ÙˆÙ‚Ø¹. <a%s>Ø£Ø¶ØºØ· Ù‡Ù†Ø§</a>Ù„ØªØ¹Ø±Ù ÙƒÙŠÙ ØªÙ‚ÙˆÙ… Ø¨ØªØ­Ø¯ÙŠØ« Ù…ØªØµÙØ­Ùƒ",
                    sr:
                        "VaÅ¡ pretraÅ¾ivaÄ (%s) je <b>zastareo</b>. Ima poznate <b>sigurnosne probleme</b> i najverovatnije <b>neÄ‡e prikazati sve funkcionalnisti</b> ovog i drugih sajtova. <a%s>NauÄi viÅ¡e o nadogradnji svog pretraÅ¾ivaÄa</a>",
                    la: "MÄ“s vÄ“lamies Jums atgÄdinÄt: JÅ«su pÄrlÅ«kprogramma (%s) ir novecojusi. <a>Atjauniniet savu pÄrlÅ«kprogrammu</a>, lai uzlabotu droÅ¡Ä«bu, Ätrumu un pÄrlÅ«koÅ¡anas Ä“rtÄ«bas Å¡ajÄ un citÄs lapÄs.",
                    ga:
                        "TÃ¡ an lÃ­onlÃ©itheoir agat (%s) <b>as dÃ¡ta</b>. TÃ¡ <b>laigeachtaÃ­ slÃ¡ndÃ¡la</b> a bhfuil ar eolas ann agus b'fhÃ©idir <b>nach taispeÃ¡nfaidh sÃ© gach gnÃ©</b> den suÃ­omh grÃ©asÃ¡in seo nÃ¡ cinn eile. <a%s>Foghlaim conas do lÃ­onlÃ©itheoir a nuashonrÃº</a>",
                    lv: "JÅ«su pÄrlÅ«kprogramma (%s) ir <b>novecojusi</b>.  Tai ir zinÄmas <b>droÅ¡Ä«bas problÄ“mas</b>, un tÄ var attÄ“lot Å¡o un citas  tÄ«mekÄ¼a lapas <b>nekorekti</b>. <a%s>Uzzini, kÄ atjaunot savu pÄrlÅ«kprogrammu</a>",
                    no: "Dette nettstedet Ã¸nsker Ã¥ minne deg pÃ¥: Din nettleser (%s) er <b>utdatert</b>. <a%s>Oppdater nettleseren din </a> for mer sikkerhet, komfort og den beste opplevelsen pÃ¥ denne siden.",
                    th:
                        "à¹€à¸§à¹‡à¸šà¹„à¸‹à¸•à¹Œà¸™à¸µà¹‰à¸­à¸¢à¸²à¸à¸ˆà¸°à¹€à¸•à¸·à¸­à¸™à¸„à¸¸à¸“: à¹€à¸šà¸£à¸²à¸§à¹Œà¹€à¸‹à¸­à¸£à¹Œ (%s) à¸‚à¸­à¸‡à¸„à¸¸à¸“à¸™à¸±à¹‰à¸™ <b>à¸¥à¹‰à¸²à¸ªà¸¡à¸±à¸¢à¹à¸¥à¹‰à¸§</b> <a%s>à¸›à¸£à¸±à¸šà¸›à¸£à¸¸à¸‡à¹€à¸šà¸£à¸²à¸§à¹Œà¹€à¸‹à¸­à¸£à¹Œà¸‚à¸­à¸‡à¸„à¸¸à¸“</a> à¹€à¸žà¸·à¹ˆà¸­à¹€à¸žà¸´à¹ˆà¸¡ à¸„à¸§à¸²à¸¡à¸›à¸¥à¸­à¸”à¸ à¸±à¸¢ à¸„à¸§à¸²à¸¡à¸ªà¸°à¸”à¸§à¸à¸ªà¸šà¸²à¸¢à¹à¸¥à¸°à¸›à¸£à¸°à¸ªà¸šà¸à¸²à¸£à¸“à¹Œà¸—à¸µà¹ˆà¸”à¸µà¸—à¸µà¹ˆà¸ªà¸¸à¸”à¹ƒà¸™à¹€à¸§à¹‡à¸šà¹„à¸‹à¸•à¹Œà¸™à¸µà¹‰",
                };
                v = t.text ? t.text : t["text_" + l] ? t["text_" + l] : v[l] ? v[l] : v.en;
                var b = "";
                this.op.newwindow && (b = ' target="_blank"'), (this.op.text = s(v, g.t, ' id="buorgul" href="' + this.op.url + '"' + b));
                var w = document.createElement("div");
                ((this.op.div = w).id = "buorg"), (w.className = "buorg");
                var y =
                    "<style>.buorg {position:absolute;position:fixed;z-index:111111;width:100%; top:0px; left:0px;border-bottom:1px solid #A29330;background:#FDF2AB no-repeat 14px center url(//browser-update.org/img/small/" +
                    g.n +
                    ".png);text-align:left; cursor:pointer;font: 13px Arial,sans-serif;color:#000;}.buorg div { padding:5px 36px 5px 40px; }.buorg>div>a,.buorg>div>a:visited{color:#E25600; text-decoration: underline;}#buorgclose{position:absolute;right:6px;top:0px;height:20px;width:12px;font:18px bold;padding:0;}#buorga{display:block;}#buorgcc{display:block;position:absolute; top:-99999px;}@media only screen and (max-width: 700px){.buorg div { padding:5px 15px 5px 9px; }}</style>";
                (w.innerHTML = "<div>" + this.op.text + '<div id="buorgclose"><a id="buorga"><span id="buorgcc">Close</span><span aria-hiden="true">&times;</span></a></div></div>' + y),
                    document.body.insertBefore(w, document.body.firstChild);
                var k = this;
                w.onclick = function () {
                    return k.op.newwindow ? window.open(k.op.url, "_blank") : (window.location.href = k.op.url), i(k.op.reminderClosed), k.op.onclick(k.op), !1;
                };
                try {
                    document.getElementById("buorgul").onclick = function (t) {
                        return (t = t || window.event).stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0), k.op.onclick(k.op), !0;
                    };
                } catch (t) {}
                var _ = document.getElementsByTagName("html")[0] || document.body,
                    C;
                (this.op.bodymt = _.style.marginTop),
                    (_.style.marginTop = w.clientHeight + "px"),
                    (C = k),
                    (document.getElementById("buorga").onclick = function (t) {
                        return (t = t || window.event).stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0), (C.op.div.style.display = "none"), (_.style.marginTop = C.op.bodymt), C.op.onclose(C.op), i(C.op.reminderClosed), !0;
                    }),
                    t.onshow(this.op);
            }
    },
    $buoop = $buoop || {};
if (($buo($buoop), void 0 === psLib)) var psLib = {};
if (
    ((psLib.Carousel = function (t) {
        $(".ps-carousel", t).each(function () {
            var t = $(this);
            if (void 0 !== t.data("guideinitialized") && "null" != typeof t.data("guideinitialized")) {
                if ("false" != t.data("guideinitialized")) return;
                psLib.CarouselDestroy(this);
            }
            psLib.CarouselInit(this), t.data("guideinitialized", "true");
        });
    }),
    (psLib.CarouselDestroy = function (t) {
        if (void 0 === t) return console.warn("Carrossel indisponÃ­vel"), !1;
        $(".ps-carousel-container", t).slick("unslick"), $(t).data("guideinitialized", "false").removeClass("ps-carousel-show").removeAttr("id");
    }),
    (psLib.CarouselInit = function (t) {
        if (void 0 === t) return console.warn("Carrossel indisponÃ­vel"), !1;
        var e = $(t).find(".ps-carousel-container"),
            i = void 0 !== $(t).data("carouselstart") ? parseInt($(t).data("carouselstart")) : 0,
            s = void 0 !== $(t).data("carouselinterval") ? parseInt($(t).data("carouselinterval")) : 5e3,
            n = void 0 === $(t).data("carouselwrap") || $(t).data("carouselwrap"),
            a = void 0 === $(t).data("carouselhoverpause") || $(t).data("carouselhoverpause"),
            o = void 0 === $(t).data("carouselkeyboard") || $(t).data("carouselkeyboard"),
            r = void 0 !== $(t).data("slick") && $(t).data("slick"),
            l = void 0 !== $(t).data("carouselshow") ? $(t).data("carouselshow") : 1,
            d = void 0 !== $(t).data("carouselscroll") ? $(t).data("carouselscroll") : 1,
            c = void 0 !== $(t).data("carouselvariablewidth") && $(t).data("carouselvariablewidth"),
            h = void 0 !== $(t).data("carouselvideo") && $(t).data("carouselvideo"),
            u = {},
            p = e.find(".ps-carousel-item"),
            f = void 0 !== $(t).attr("id") ? $(t).attr("id") : "psLib-carousel-" + Math.floor(100 * Math.random());
        if (r) {
            var g = { dotsClass: "ps-carousel-bullet", prevArrow: '<a href="javascript:;" class="ps-carousel-arrow ps-carousel-left"></a>', nextArrow: '<a href="javascript:;" class="ps-carousel-arrow ps-carousel-right"></a>' };
            $(".ps-carousel-container", t).data("slick", r).slick(g).attr("id", f);
        } else {
            void 0 !== $(t).data("carouselconfig") && ((u = (u = $(t).data("carouselconfig")).replace(/\'/g, '"')), (u = $.parseJSON(u)));
            var g = {
                initialSlide: i,
                autoplaySpeed: s,
                infinite: n,
                pauseOnHover: a,
                accessibility: o,
                slidesToShow: l,
                slidesToScroll: d,
                variableWidth: c,
                autoplay: !1,
                dots: !0,
                arrows: !0,
                responsive: [
                    { breakpoint: 1024, settings: { arrows: !1 } },
                    { breakpoint: 600, settings: { arrows: !1 } },
                    { breakpoint: 480, settings: { arrows: !1 } },
                ],
                dotsClass: "ps-carousel-bullet",
                prevArrow: '<a href="javascript:;" class="ps-carousel-arrow ps-carousel-left"></a>',
                nextArrow: '<a href="javascript:;" class="ps-carousel-arrow ps-carousel-right"></a>',
            };
            $.extend(g, u), $(".ps-carousel-container", t).slick(g).attr("id", f);
        }
        $(t).addClass("ps-carousel-show"),
            p.each(function () {
                if (psLib.IsTablet) {
                    var t = $(this).find(".ps-carousel-item-content[data-carouselitemvalign!='']");
                    if (void 0 !== t) {
                        var e = $(this).data("carouselitemvalign");
                        "middle" == e ? t.css({ top: "50%", "margin-top": "-" + t.outerHeight() / 2 + "px" }) : "bottom" == e && t.css({ top: "initial", bottom: "14px" });
                    }
                    var i = $(this).outerHeight();
                    window.setTimeout(function () {
                        $(this).height(i);
                    }, 50);
                }
            }),
            e.each(function () {
                var t = $(this),
                    e = t.children(".slick-list"),
                    i = t.children(".ps-carousel-bullet"),
                    s = e.find(".slick-slide").length;
                3 === l ? t.addClass("ps-slide--three") : 4 === l ? t.addClass("ps-slide--four") : 5 === l ? t.addClass("ps-slide--five") : 6 === l && t.addClass("ps-slide--six"), s < l && psLib.CarouselCheckSlides(e, i);
            }),
            0 < $(".ps-carousel-container", t).find(".ps-card").length &&
                window.setTimeout(function () {
                    console.log(f), psLib.Cards(f);
                }, 500);
    }),
    (psLib.CarouselCheckSlides = function (t, e) {
        var i = $(t),
            s = i.find(".slick-slide"),
            n = 0,
            a = window.innerWidth;
        $(".slick-slide", i).each(function () {
            n += parseInt($(this).outerWidth());
        }),
            1200 <= a && (a = 1200),
            n <= a && (i.find(".slick-track").css("left", a / 2 - n / 2 + "px"), e.css("display", "none"));
    }),
    (function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? (module.exports = t(require("jquery"))) : t(jQuery);
    })(function (c) {
        "use strict";
        var r = window.Slick || {};
        ((r = (function () {
            function t(t, e) {
                var i,
                    s = this;
                (s.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: c(t),
                    appendDots: c(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (t, e) {
                        return c('<button type="button" data-role="none" role="button" tabindex="0" />').text(e + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (s.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    c.extend(s, s.initials),
                    (s.activeBreakpoint = null),
                    (s.animType = null),
                    (s.animProp = null),
                    (s.breakpoints = []),
                    (s.breakpointSettings = []),
                    (s.cssTransitions = !1),
                    (s.focussed = !1),
                    (s.interrupted = !1),
                    (s.hidden = "hidden"),
                    (s.paused = !0),
                    (s.positionProp = null),
                    (s.respondTo = null),
                    (s.rowCount = 1),
                    (s.shouldClick = !0),
                    (s.$slider = c(t)),
                    (s.$slidesCache = null),
                    (s.transformType = null),
                    (s.transitionType = null),
                    (s.visibilityChange = "visibilitychange"),
                    (s.windowWidth = 0),
                    (s.windowTimer = null),
                    (i = c(t).data("slick") || {}),
                    (s.options = c.extend({}, s.defaults, e, i)),
                    (s.currentSlide = s.options.initialSlide),
                    (s.originalSettings = s.options),
                    void 0 !== document.mozHidden
                        ? ((s.hidden = "mozHidden"), (s.visibilityChange = "mozvisibilitychange"))
                        : void 0 !== document.webkitHidden && ((s.hidden = "webkitHidden"), (s.visibilityChange = "webkitvisibilitychange")),
                    (s.autoPlay = c.proxy(s.autoPlay, s)),
                    (s.autoPlayClear = c.proxy(s.autoPlayClear, s)),
                    (s.autoPlayIterator = c.proxy(s.autoPlayIterator, s)),
                    (s.changeSlide = c.proxy(s.changeSlide, s)),
                    (s.clickHandler = c.proxy(s.clickHandler, s)),
                    (s.selectHandler = c.proxy(s.selectHandler, s)),
                    (s.setPosition = c.proxy(s.setPosition, s)),
                    (s.swipeHandler = c.proxy(s.swipeHandler, s)),
                    (s.dragHandler = c.proxy(s.dragHandler, s)),
                    (s.keyHandler = c.proxy(s.keyHandler, s)),
                    (s.instanceUid = n++),
                    (s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    s.registerBreakpoints(),
                    s.init(!0);
            }
            var n = 0;
            return t;
        })()).prototype.activateADA = function () {
            var t;
            this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
        }),
            (r.prototype.addSlide = r.prototype.slickAdd = function (t, e, i) {
                var s = this;
                if ("boolean" == typeof e) (i = e), (e = null);
                else if (e < 0 || e >= s.slideCount) return !1;
                s.unload(),
                    "number" == typeof e
                        ? 0 === e && 0 === s.$slides.length
                            ? c(t).appendTo(s.$slideTrack)
                            : i
                            ? c(t).insertBefore(s.$slides.eq(e))
                            : c(t).insertAfter(s.$slides.eq(e))
                        : !0 === i
                        ? c(t).prependTo(s.$slideTrack)
                        : c(t).appendTo(s.$slideTrack),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    s.$slides.each(function (t, e) {
                        c(e).attr("data-slick-index", t);
                    }),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
            (r.prototype.animateHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({ height: e }, t.options.speed);
                }
            }),
            (r.prototype.animateSlide = function (t, e) {
                var i = {},
                    s = this;
                s.animateHeight(),
                    !0 === s.options.rtl && !1 === s.options.vertical && (t = -t),
                    !1 === s.transformsEnabled
                        ? !1 === s.options.vertical
                            ? s.$slideTrack.animate({ left: t }, s.options.speed, s.options.easing, e)
                            : s.$slideTrack.animate({ top: t }, s.options.speed, s.options.easing, e)
                        : !1 === s.cssTransitions
                        ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                          c({ animStart: s.currentLeft }).animate(
                              { animStart: t },
                              {
                                  duration: s.options.speed,
                                  easing: s.options.easing,
                                  step: function (t) {
                                      (t = Math.ceil(t)), !1 === s.options.vertical ? (i[s.animType] = "translate(" + t + "px, 0px)") : (i[s.animType] = "translate(0px," + t + "px)"), s.$slideTrack.css(i);
                                  },
                                  complete: function () {
                                      e && e.call();
                                  },
                              }
                          ))
                        : (s.applyTransition(),
                          (t = Math.ceil(t)),
                          !1 === s.options.vertical ? (i[s.animType] = "translate3d(" + t + "px, 0px, 0px)") : (i[s.animType] = "translate3d(0px," + t + "px, 0px)"),
                          s.$slideTrack.css(i),
                          e &&
                              setTimeout(function () {
                                  s.disableTransition(), e.call();
                              }, s.options.speed));
            }),
            (r.prototype.getNavTarget = function () {
                var t = this,
                    e = t.options.asNavFor;
                return e && null !== e && (e = c(e).not(t.$slider)), e;
            }),
            (r.prototype.asNavFor = function (e) {
                var t,
                    i = this.getNavTarget();
                null !== i &&
                    "object" == typeof i &&
                    i.each(function () {
                        var t = c(this).slick("getSlick");
                        t.unslicked || t.slideHandler(e, !0);
                    });
            }),
            (r.prototype.applyTransition = function (t) {
                var e = this,
                    i = {};
                !1 === e.options.fade ? (i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase) : (i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase),
                    !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (r.prototype.autoPlay = function () {
                var t = this;
                t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed));
            }),
            (r.prototype.autoPlayClear = function () {
                var t = this;
                t.autoPlayTimer && clearInterval(t.autoPlayTimer);
            }),
            (r.prototype.autoPlayIterator = function () {
                var t = this,
                    e = t.currentSlide + t.options.slidesToScroll;
                t.paused ||
                    t.interrupted ||
                    t.focussed ||
                    (!1 === t.options.infinite &&
                        (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? (t.direction = 0) : 0 === t.direction && ((e = t.currentSlide - t.options.slidesToScroll), t.currentSlide - 1 == 0 && (t.direction = 1))),
                    t.slideHandler(e));
            }),
            (r.prototype.buildArrows = function () {
                var t = this;
                !0 === t.options.arrows &&
                    ((t.$prevArrow = c(t.options.prevArrow).addClass("slick-arrow")),
                    (t.$nextArrow = c(t.options.nextArrow).addClass("slick-arrow")),
                    t.slideCount > t.options.slidesToShow
                        ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
                          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
                          !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                        : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (r.prototype.buildDots = function () {
                var t,
                    e,
                    i = this;
                if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                    for (i.$slider.addClass("slick-dotted"), e = c("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) e.append(c("<li />").append(i.options.customPaging.call(this, i, t)));
                    (i.$dots = e.appendTo(i.options.appendDots)), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
                }
            }),
            (r.prototype.buildOut = function () {
                var t = this;
                (t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (t.slideCount = t.$slides.length),
                    t.$slides.each(function (t, e) {
                        c(e)
                            .attr("data-slick-index", t)
                            .data("originalStyling", c(e).attr("style") || "");
                    }),
                    t.$slider.addClass("slick-slider"),
                    (t.$slideTrack = 0 === t.slideCount ? c('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
                    t.$slideTrack.css("opacity", 0),
                    (!0 === t.options.centerMode || !0 === t.options.swipeToSlide) && (t.options.slidesToScroll = 1),
                    c("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
                    t.setupInfinite(),
                    t.buildArrows(),
                    t.buildDots(),
                    t.updateDots(),
                    t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                    !0 === t.options.draggable && t.$list.addClass("draggable");
            }),
            (r.prototype.buildRows = function () {
                var t,
                    e,
                    i,
                    s,
                    n,
                    a,
                    o,
                    r = this;
                if (((s = document.createDocumentFragment()), (a = r.$slider.children()), 1 < r.options.rows)) {
                    for (o = r.options.slidesPerRow * r.options.rows, n = Math.ceil(a.length / o), t = 0; t < n; t++) {
                        var l = document.createElement("div");
                        for (e = 0; e < r.options.rows; e++) {
                            var d = document.createElement("div");
                            for (i = 0; i < r.options.slidesPerRow; i++) {
                                var c = t * o + (e * r.options.slidesPerRow + i);
                                a.get(c) && d.appendChild(a.get(c));
                            }
                            l.appendChild(d);
                        }
                        s.appendChild(l);
                    }
                    r.$slider.empty().append(s),
                        r.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / r.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (r.prototype.checkResponsive = function (t, e) {
                var i,
                    s,
                    n,
                    a = this,
                    o = !1,
                    r = a.$slider.width(),
                    l = window.innerWidth || c(window).width();
                if (("window" === a.respondTo ? (n = l) : "slider" === a.respondTo ? (n = r) : "min" === a.respondTo && (n = Math.min(l, r)), a.options.responsive && a.options.responsive.length && null !== a.options.responsive)) {
                    for (i in ((s = null), a.breakpoints)) a.breakpoints.hasOwnProperty(i) && (!1 === a.originalSettings.mobileFirst ? n < a.breakpoints[i] && (s = a.breakpoints[i]) : n > a.breakpoints[i] && (s = a.breakpoints[i]));
                    null !== s
                        ? null !== a.activeBreakpoint
                            ? (s !== a.activeBreakpoint || e) &&
                              ((a.activeBreakpoint = s),
                              "unslick" === a.breakpointSettings[s] ? a.unslick(s) : ((a.options = c.extend({}, a.originalSettings, a.breakpointSettings[s])), !0 === t && (a.currentSlide = a.options.initialSlide), a.refresh(t)),
                              (o = s))
                            : ((a.activeBreakpoint = s),
                              "unslick" === a.breakpointSettings[s] ? a.unslick(s) : ((a.options = c.extend({}, a.originalSettings, a.breakpointSettings[s])), !0 === t && (a.currentSlide = a.options.initialSlide), a.refresh(t)),
                              (o = s))
                        : null !== a.activeBreakpoint && ((a.activeBreakpoint = null), (a.options = a.originalSettings), !0 === t && (a.currentSlide = a.options.initialSlide), a.refresh(t), (o = s)),
                        t || !1 === o || a.$slider.trigger("breakpoint", [a, o]);
                }
            }),
            (r.prototype.changeSlide = function (t, e) {
                var i,
                    s,
                    n,
                    a = this,
                    o = c(t.currentTarget);
                switch ((o.is("a") && t.preventDefault(), o.is("li") || (o = o.closest("li")), (i = (n = a.slideCount % a.options.slidesToScroll != 0) ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll), t.data.message)) {
                    case "previous":
                        (s = 0 === i ? a.options.slidesToScroll : a.options.slidesToShow - i), a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - s, !1, e);
                        break;
                    case "next":
                        (s = 0 === i ? a.options.slidesToScroll : i), a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + s, !1, e);
                        break;
                    case "index":
                        var r = 0 === t.data.index ? 0 : t.data.index || o.index() * a.options.slidesToScroll;
                        a.slideHandler(a.checkNavigable(r), !1, e), o.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (r.prototype.checkNavigable = function (t) {
                var e, i, s;
                if (((i = 0), t > (e = this.getNavigableIndexes())[e.length - 1])) t = e[e.length - 1];
                else
                    for (var n in e) {
                        if (t < e[n]) {
                            t = i;
                            break;
                        }
                        i = e[n];
                    }
                return t;
            }),
            (r.prototype.cleanUpEvents = function () {
                var t = this;
                t.options.dots && null !== t.$dots && c("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", c.proxy(t.interrupt, t, !0)).off("mouseleave.slick", c.proxy(t.interrupt, t, !1)),
                    t.$slider.off("focus.slick blur.slick"),
                    !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)),
                    t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
                    t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
                    t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
                    t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
                    t.$list.off("click.slick", t.clickHandler),
                    c(document).off(t.visibilityChange, t.visibility),
                    t.cleanUpSlideEvents(),
                    !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler),
                    !0 === t.options.focusOnSelect && c(t.$slideTrack).children().off("click.slick", t.selectHandler),
                    c(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
                    c(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
                    c("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
                    c(window).off("load.slick.slick-" + t.instanceUid, t.setPosition),
                    c(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition);
            }),
            (r.prototype.cleanUpSlideEvents = function () {
                var t = this;
                t.$list.off("mouseenter.slick", c.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", c.proxy(t.interrupt, t, !1));
            }),
            (r.prototype.cleanUpRows = function () {
                var t,
                    e = this;
                1 < e.options.rows && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t));
            }),
            (r.prototype.clickHandler = function (t) {
                var e;
                !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
            }),
            (r.prototype.destroy = function (t) {
                var e = this;
                e.autoPlayClear(),
                    (e.touchObject = {}),
                    e.cleanUpEvents(),
                    c(".slick-cloned", e.$slider).detach(),
                    e.$dots && e.$dots.remove(),
                    e.$prevArrow &&
                        e.$prevArrow.length &&
                        (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
                    e.$nextArrow &&
                        e.$nextArrow.length &&
                        (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
                    e.$slides &&
                        (e.$slides
                            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                            .removeAttr("aria-hidden")
                            .removeAttr("data-slick-index")
                            .each(function () {
                                c(this).attr("style", c(this).data("originalStyling"));
                            }),
                        e.$slideTrack.children(this.options.slide).detach(),
                        e.$slideTrack.detach(),
                        e.$list.detach(),
                        e.$slider.append(e.$slides)),
                    e.cleanUpRows(),
                    e.$slider.removeClass("slick-slider"),
                    e.$slider.removeClass("slick-initialized"),
                    e.$slider.removeClass("slick-dotted"),
                    (e.unslicked = !0),
                    t || e.$slider.trigger("destroy", [e]);
            }),
            (r.prototype.disableTransition = function (t) {
                var e = this,
                    i = {};
                (i[e.transitionType] = ""), !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
            }),
            (r.prototype.fadeSlide = function (t, e) {
                var i = this;
                !1 === i.cssTransitions
                    ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }), i.$slides.eq(t).animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
                    : (i.applyTransition(t),
                      i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
                      e &&
                          setTimeout(function () {
                              i.disableTransition(t), e.call();
                          }, i.options.speed));
            }),
            (r.prototype.fadeSlideOut = function (t) {
                var e = this;
                !1 === e.cssTransitions ? e.$slides.eq(t).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
            }),
            (r.prototype.filterSlides = r.prototype.slickFilter = function (t) {
                var e = this;
                null !== t && ((e.$slidesCache = e.$slides), e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit());
            }),
            (r.prototype.focusHandler = function () {
                var i = this;
                i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (t) {
                    t.stopImmediatePropagation();
                    var e = c(this);
                    setTimeout(function () {
                        i.options.pauseOnFocus && ((i.focussed = e.is(":focus")), i.autoPlay());
                    }, 0);
                });
            }),
            (r.prototype.getCurrent = r.prototype.slickCurrentSlide = function () {
                var t;
                return this.currentSlide;
            }),
            (r.prototype.getDotCount = function () {
                var t = this,
                    e = 0,
                    i = 0,
                    s = 0;
                if (!0 === t.options.infinite) for (; e < t.slideCount; ) ++s, (e = i + t.options.slidesToScroll), (i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                else if (!0 === t.options.centerMode) s = t.slideCount;
                else if (t.options.asNavFor) for (; e < t.slideCount; ) ++s, (e = i + t.options.slidesToScroll), (i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                else s = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
                return s - 1;
            }),
            (r.prototype.getLeft = function (t) {
                var e,
                    i,
                    s,
                    n = this,
                    a = 0;
                return (
                    (n.slideOffset = 0),
                    (i = n.$slides.first().outerHeight(!0)),
                    !0 === n.options.infinite
                        ? (n.slideCount > n.options.slidesToShow && ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1), (a = i * n.options.slidesToShow * -1)),
                          n.slideCount % n.options.slidesToScroll != 0 &&
                              t + n.options.slidesToScroll > n.slideCount &&
                              n.slideCount > n.options.slidesToShow &&
                              (a =
                                  t > n.slideCount
                                      ? ((n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1), (n.options.slidesToShow - (t - n.slideCount)) * i * -1)
                                      : ((n.slideOffset = (n.slideCount % n.options.slidesToScroll) * n.slideWidth * -1), (n.slideCount % n.options.slidesToScroll) * i * -1)))
                        : t + n.options.slidesToShow > n.slideCount && ((n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth), (a = (t + n.options.slidesToShow - n.slideCount) * i)),
                    n.slideCount <= n.options.slidesToShow && (a = n.slideOffset = 0),
                    !0 === n.options.centerMode && !0 === n.options.infinite
                        ? (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth)
                        : !0 === n.options.centerMode && ((n.slideOffset = 0), (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
                    (e = !1 === n.options.vertical ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + a),
                    !0 === n.options.variableWidth &&
                        ((s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow)),
                        (e = !0 === n.options.rtl ? (s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0) : s[0] ? -1 * s[0].offsetLeft : 0),
                        !0 === n.options.centerMode &&
                            ((s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1)),
                            (e = !0 === n.options.rtl ? (s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0) : s[0] ? -1 * s[0].offsetLeft : 0),
                            (e += (n.$list.width() - s.outerWidth()) / 2))),
                    e
                );
            }),
            (r.prototype.getOption = r.prototype.slickGetOption = function (t) {
                var e;
                return this.options[t];
            }),
            (r.prototype.getNavigableIndexes = function () {
                var t,
                    e = this,
                    i = 0,
                    s = 0,
                    n = [];
                for (t = !1 === e.options.infinite ? e.slideCount : ((i = -1 * e.options.slidesToScroll), (s = -1 * e.options.slidesToScroll), 2 * e.slideCount); i < t; )
                    n.push(i), (i = s + e.options.slidesToScroll), (s += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                return n;
            }),
            (r.prototype.getSlick = function () {
                return this;
            }),
            (r.prototype.getSlideCount = function () {
                var t,
                    i,
                    s,
                    n = this;
                return (
                    (s = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0),
                    !0 === n.options.swipeToSlide
                        ? (n.$slideTrack.find(".slick-slide").each(function (t, e) {
                              return e.offsetLeft - s + c(e).outerWidth() / 2 > -1 * n.swipeLeft ? ((i = e), !1) : void 0;
                          }),
                          (t = Math.abs(c(i).attr("data-slick-index") - n.currentSlide) || 1))
                        : n.options.slidesToScroll
                );
            }),
            (r.prototype.goTo = r.prototype.slickGoTo = function (t, e) {
                var i;
                this.changeSlide({ data: { message: "index", index: parseInt(t) } }, e);
            }),
            (r.prototype.init = function (t) {
                var e = this;
                c(e.$slider).hasClass("slick-initialized") ||
                    (c(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()),
                    t && e.$slider.trigger("init", [e]),
                    !0 === e.options.accessibility && e.initADA(),
                    e.options.autoplay && ((e.paused = !1), e.autoPlay());
            }),
            (r.prototype.initADA = function () {
                var e = this;
                e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                    e.$slideTrack.attr("role", "listbox"),
                    e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
                        c(this).attr({ role: "option", "aria-describedby": "slick-slide" + e.instanceUid + t });
                    }),
                    null !== e.$dots &&
                        e.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (t) {
                                c(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + e.instanceUid + t, id: "slick-slide" + e.instanceUid + t });
                            })
                            .first()
                            .attr("aria-selected", "true")
                            .end()
                            .find("button")
                            .attr("role", "button")
                            .end()
                            .closest("div")
                            .attr("role", "toolbar"),
                    e.activateADA();
            }),
            (r.prototype.initArrowEvents = function () {
                var t = this;
                !0 === t.options.arrows &&
                    t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, t.changeSlide));
            }),
            (r.prototype.initDotEvents = function () {
                var t = this;
                !0 === t.options.dots && t.slideCount > t.options.slidesToShow && c("li", t.$dots).on("click.slick", { message: "index" }, t.changeSlide),
                    !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && c("li", t.$dots).on("mouseenter.slick", c.proxy(t.interrupt, t, !0)).on("mouseleave.slick", c.proxy(t.interrupt, t, !1));
            }),
            (r.prototype.initSlideEvents = function () {
                var t = this;
                t.options.pauseOnHover && (t.$list.on("mouseenter.slick", c.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", c.proxy(t.interrupt, t, !1)));
            }),
            (r.prototype.initializeEvents = function () {
                var t = this;
                t.initArrowEvents(),
                    t.initDotEvents(),
                    t.initSlideEvents(),
                    t.$list.on("touchstart.slick mousedown.slick", { action: "start" }, t.swipeHandler),
                    t.$list.on("touchmove.slick mousemove.slick", { action: "move" }, t.swipeHandler),
                    t.$list.on("touchend.slick mouseup.slick", { action: "end" }, t.swipeHandler),
                    t.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, t.swipeHandler),
                    t.$list.on("click.slick", t.clickHandler),
                    c(document).on(t.visibilityChange, c.proxy(t.visibility, t)),
                    !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler),
                    !0 === t.options.focusOnSelect && c(t.$slideTrack).children().on("click.slick", t.selectHandler),
                    c(window).on("orientationchange.slick.slick-" + t.instanceUid, c.proxy(t.orientationChange, t)),
                    c(window).on("resize.slick.slick-" + t.instanceUid, c.proxy(t.resize, t)),
                    c("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
                    c(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
                    c(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition);
            }),
            (r.prototype.initUI = function () {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show();
            }),
            (r.prototype.keyHandler = function (t) {
                var e = this;
                t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === t.keyCode && !0 === e.options.accessibility
                        ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } })
                        : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }));
            }),
            (r.prototype.lazyLoad = function () {
                function t(t) {
                    c("img[data-lazy]", t).each(function () {
                        var t = c(this),
                            e = c(this).attr("data-lazy"),
                            i = document.createElement("img");
                        (i.onload = function () {
                            t.animate({ opacity: 0 }, 100, function () {
                                t.attr("src", e).animate({ opacity: 1 }, 200, function () {
                                    t.removeAttr("data-lazy").removeClass("slick-loading");
                                }),
                                    a.$slider.trigger("lazyLoaded", [a, t, e]);
                            });
                        }),
                            (i.onerror = function () {
                                t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, t, e]);
                            }),
                            (i.src = e);
                    });
                }
                var e,
                    i,
                    s,
                    n,
                    a = this;
                !0 === a.options.centerMode
                    ? (n =
                          !0 === a.options.infinite
                              ? (s = a.currentSlide + (a.options.slidesToShow / 2 + 1)) + a.options.slidesToShow + 2
                              : ((s = Math.max(0, a.currentSlide - (a.options.slidesToShow / 2 + 1))), a.options.slidesToShow / 2 + 1 + 2 + a.currentSlide))
                    : ((s = a.options.infinite ? a.options.slidesToShow + a.currentSlide : a.currentSlide), (n = Math.ceil(s + a.options.slidesToShow)), !0 === a.options.fade && (0 < s && s--, n <= a.slideCount && n++)),
                    t((e = a.$slider.find(".slick-slide").slice(s, n))),
                    a.slideCount <= a.options.slidesToShow
                        ? t((i = a.$slider.find(".slick-slide")))
                        : a.currentSlide >= a.slideCount - a.options.slidesToShow
                        ? t((i = a.$slider.find(".slick-cloned").slice(0, a.options.slidesToShow)))
                        : 0 === a.currentSlide && t((i = a.$slider.find(".slick-cloned").slice(-1 * a.options.slidesToShow)));
            }),
            (r.prototype.loadSlider = function () {
                var t = this;
                t.setPosition(), t.$slideTrack.css({ opacity: 1 }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
            }),
            (r.prototype.next = r.prototype.slickNext = function () {
                var t;
                this.changeSlide({ data: { message: "next" } });
            }),
            (r.prototype.orientationChange = function () {
                var t = this;
                t.checkResponsive(), t.setPosition();
            }),
            (r.prototype.pause = r.prototype.slickPause = function () {
                var t = this;
                t.autoPlayClear(), (t.paused = !0);
            }),
            (r.prototype.play = r.prototype.slickPlay = function () {
                var t = this;
                t.autoPlay(), (t.options.autoplay = !0), (t.paused = !1), (t.focussed = !1), (t.interrupted = !1);
            }),
            (r.prototype.postSlide = function (t) {
                var e = this;
                e.unslicked || (e.$slider.trigger("afterChange", [e, t]), (e.animating = !1), e.setPosition(), (e.swipeLeft = null), e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && e.initADA());
            }),
            (r.prototype.prev = r.prototype.slickPrev = function () {
                var t;
                this.changeSlide({ data: { message: "previous" } });
            }),
            (r.prototype.preventDefault = function (t) {
                t.preventDefault();
            }),
            (r.prototype.progressiveLazyLoad = function (t) {
                t = t || 1;
                var e,
                    i,
                    s,
                    n = this,
                    a = c("img[data-lazy]", n.$slider);
                a.length
                    ? ((e = a.first()),
                      (i = e.attr("data-lazy")),
                      ((s = document.createElement("img")).onload = function () {
                          e.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, e, i]), n.progressiveLazyLoad();
                      }),
                      (s.onerror = function () {
                          t < 3
                              ? setTimeout(function () {
                                    n.progressiveLazyLoad(t + 1);
                                }, 500)
                              : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, i]), n.progressiveLazyLoad());
                      }),
                      (s.src = i))
                    : n.$slider.trigger("allImagesLoaded", [n]);
            }),
            (r.prototype.refresh = function (t) {
                var e,
                    i,
                    s = this;
                (i = s.slideCount - s.options.slidesToShow),
                    !s.options.infinite && s.currentSlide > i && (s.currentSlide = i),
                    s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                    (e = s.currentSlide),
                    s.destroy(!0),
                    c.extend(s, s.initials, { currentSlide: e }),
                    s.init(),
                    t || s.changeSlide({ data: { message: "index", index: e } }, !1);
            }),
            (r.prototype.registerBreakpoints = function () {
                var t,
                    e,
                    i,
                    s = this,
                    n = s.options.responsive || null;
                if ("array" === c.type(n) && n.length) {
                    for (t in ((s.respondTo = s.options.respondTo || "window"), n))
                        if (((i = s.breakpoints.length - 1), (e = n[t].breakpoint), n.hasOwnProperty(t))) {
                            for (; 0 <= i; ) s.breakpoints[i] && s.breakpoints[i] === e && s.breakpoints.splice(i, 1), i--;
                            s.breakpoints.push(e), (s.breakpointSettings[e] = n[t].settings);
                        }
                    s.breakpoints.sort(function (t, e) {
                        return s.options.mobileFirst ? t - e : e - t;
                    });
                }
            }),
            (r.prototype.reinit = function () {
                var t = this;
                (t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide")),
                    (t.slideCount = t.$slides.length),
                    t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
                    t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
                    t.registerBreakpoints(),
                    t.setProps(),
                    t.setupInfinite(),
                    t.buildArrows(),
                    t.updateArrows(),
                    t.initArrowEvents(),
                    t.buildDots(),
                    t.updateDots(),
                    t.initDotEvents(),
                    t.cleanUpSlideEvents(),
                    t.initSlideEvents(),
                    t.checkResponsive(!1, !0),
                    !0 === t.options.focusOnSelect && c(t.$slideTrack).children().on("click.slick", t.selectHandler),
                    t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                    t.setPosition(),
                    t.focusHandler(),
                    (t.paused = !t.options.autoplay),
                    t.autoPlay(),
                    t.$slider.trigger("reInit", [t]);
            }),
            (r.prototype.resize = function () {
                var t = this;
                c(window).width() !== t.windowWidth &&
                    (clearTimeout(t.windowDelay),
                    (t.windowDelay = window.setTimeout(function () {
                        (t.windowWidth = c(window).width()), t.checkResponsive(), t.unslicked || t.setPosition();
                    }, 50)));
            }),
            (r.prototype.removeSlide = r.prototype.slickRemove = function (t, e, i) {
                var s = this;
                return (
                    (t = "boolean" == typeof t ? (!0 === (e = t) ? 0 : s.slideCount - 1) : !0 === e ? --t : t),
                    !(s.slideCount < 1 || t < 0 || t > s.slideCount - 1) &&
                        (s.unload(),
                        !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(),
                        (s.$slides = s.$slideTrack.children(this.options.slide)),
                        s.$slideTrack.children(this.options.slide).detach(),
                        s.$slideTrack.append(s.$slides),
                        (s.$slidesCache = s.$slides),
                        void s.reinit())
                );
            }),
            (r.prototype.setCSS = function (t) {
                var e,
                    i,
                    s = this,
                    n = {};
                !0 === s.options.rtl && (t = -t),
                    (e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px"),
                    (n[s.positionProp] = t),
                    !1 === s.transformsEnabled || (!(n = {}) === s.cssTransitions ? (n[s.animType] = "translate(" + e + ", " + i + ")") : (n[s.animType] = "translate3d(" + e + ", " + i + ", 0px)")),
                    s.$slideTrack.css(n);
            }),
            (r.prototype.setDimensions = function () {
                var t = this;
                !1 === t.options.vertical
                    ? !0 === t.options.centerMode && t.$list.css({ padding: "0px " + t.options.centerPadding })
                    : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({ padding: t.options.centerPadding + " 0px" })),
                    (t.listWidth = t.$list.width()),
                    (t.listHeight = t.$list.height()),
                    !1 === t.options.vertical && !1 === t.options.variableWidth
                        ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length)))
                        : !0 === t.options.variableWidth
                        ? t.$slideTrack.width(5e3 * t.slideCount)
                        : ((t.slideWidth = Math.ceil(t.listWidth)), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
                var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
            }),
            (r.prototype.setFade = function () {
                var i,
                    s = this;
                s.$slides.each(function (t, e) {
                    (i = s.slideWidth * t * -1),
                        !0 === s.options.rtl ? c(e).css({ position: "relative", right: i, top: 0, zIndex: s.options.zIndex - 2, opacity: 0 }) : c(e).css({ position: "relative", left: i, top: 0, zIndex: s.options.zIndex - 2, opacity: 0 });
                }),
                    s.$slides.eq(s.currentSlide).css({ zIndex: s.options.zIndex - 1, opacity: 1 });
            }),
            (r.prototype.setHeight = function () {
                var t = this;
                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css("height", e);
                }
            }),
            (r.prototype.setOption = r.prototype.slickSetOption = function (t, e, i) {
                var s,
                    n,
                    a,
                    o,
                    r,
                    l = this,
                    d = !1;
                if (
                    ("object" === c.type(t) ? ((a = t), (d = e), (r = "multiple")) : "string" === c.type(t) && ((o = e), (d = i), "responsive" === (a = t) && "array" === c.type(e) ? (r = "responsive") : void 0 !== e && (r = "single")),
                    "single" === r)
                )
                    l.options[a] = o;
                else if ("multiple" === r)
                    c.each(a, function (t, e) {
                        l.options[t] = e;
                    });
                else if ("responsive" === r)
                    for (n in o)
                        if ("array" !== c.type(l.options.responsive)) l.options.responsive = [o[n]];
                        else {
                            for (s = l.options.responsive.length - 1; 0 <= s; ) l.options.responsive[s].breakpoint === o[n].breakpoint && l.options.responsive.splice(s, 1), s--;
                            l.options.responsive.push(o[n]);
                        }
                d && (l.unload(), l.reinit());
            }),
            (r.prototype.setPosition = function () {
                var t = this;
                t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t]);
            }),
            (r.prototype.setProps = function () {
                var t = this,
                    e = document.body.style;
                (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
                    "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"),
                    (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && !0 === t.options.useCSS && (t.cssTransitions = !0),
                    t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : (t.options.zIndex = t.defaults.zIndex)),
                    void 0 !== e.OTransform && ((t.animType = "OTransform"), (t.transformType = "-o-transform"), (t.transitionType = "OTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.MozTransform &&
                        ((t.animType = "MozTransform"), (t.transformType = "-moz-transform"), (t.transitionType = "MozTransition"), void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
                    void 0 !== e.webkitTransform &&
                        ((t.animType = "webkitTransform"), (t.transformType = "-webkit-transform"), (t.transitionType = "webkitTransition"), void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                    void 0 !== e.msTransform && ((t.animType = "msTransform"), (t.transformType = "-ms-transform"), (t.transitionType = "msTransition"), void 0 === e.msTransform && (t.animType = !1)),
                    void 0 !== e.transform && !1 !== t.animType && ((t.animType = "transform"), (t.transformType = "transform"), (t.transitionType = "transition")),
                    (t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType);
            }),
            (r.prototype.setSlideClasses = function (t) {
                var e,
                    i,
                    s,
                    n,
                    a = this;
                (i = a.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")),
                    a.$slides.eq(t).addClass("slick-current"),
                    !0 === a.options.centerMode
                        ? ((e = Math.floor(a.options.slidesToShow / 2)),
                          !0 === a.options.infinite &&
                              (e <= t && t <= a.slideCount - 1 - e
                                  ? a.$slides
                                        .slice(t - e, t + e + 1)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")
                                  : ((s = a.options.slidesToShow + t),
                                    i
                                        .slice(s - e + 1, s + e + 2)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")),
                              0 === t ? i.eq(i.length - 1 - a.options.slidesToShow).addClass("slick-center") : t === a.slideCount - 1 && i.eq(a.options.slidesToShow).addClass("slick-center")),
                          a.$slides.eq(t).addClass("slick-center"))
                        : 0 <= t && t <= a.slideCount - a.options.slidesToShow
                        ? a.$slides
                              .slice(t, t + a.options.slidesToShow)
                              .addClass("slick-active")
                              .attr("aria-hidden", "false")
                        : i.length <= a.options.slidesToShow
                        ? i.addClass("slick-active").attr("aria-hidden", "false")
                        : ((n = a.slideCount % a.options.slidesToShow),
                          (s = !0 === a.options.infinite ? a.options.slidesToShow + t : t),
                          a.options.slidesToShow == a.options.slidesToScroll && a.slideCount - t < a.options.slidesToShow
                              ? i
                                    .slice(s - (a.options.slidesToShow - n), s + n)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : i
                                    .slice(s, s + a.options.slidesToShow)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")),
                    "ondemand" === a.options.lazyLoad && a.lazyLoad();
            }),
            (r.prototype.setupInfinite = function () {
                var t,
                    e,
                    i,
                    s = this;
                if ((!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && ((e = null), s.slideCount > s.options.slidesToShow))) {
                    for (i = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, t = s.slideCount; t > s.slideCount - i; t -= 1)
                        (e = t - 1),
                            c(s.$slides[e])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", e - s.slideCount)
                                .prependTo(s.$slideTrack)
                                .addClass("slick-cloned");
                    for (t = 0; t < i; t += 1)
                        (e = t),
                            c(s.$slides[e])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", e + s.slideCount)
                                .appendTo(s.$slideTrack)
                                .addClass("slick-cloned");
                    s.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            c(this).attr("id", "");
                        });
                }
            }),
            (r.prototype.interrupt = function (t) {
                var e = this;
                t || e.autoPlay(), (e.interrupted = t);
            }),
            (r.prototype.selectHandler = function (t) {
                var e = this,
                    i = c(t.target).is(".slick-slide") ? c(t.target) : c(t.target).parents(".slick-slide"),
                    s = parseInt(i.attr("data-slick-index"));
                return s || (s = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(s), void e.asNavFor(s)) : void e.slideHandler(s);
            }),
            (r.prototype.slideHandler = function (t, e, i) {
                var s,
                    n,
                    a,
                    o,
                    r,
                    l = null,
                    d = this;
                return (
                    (e = e || !1),
                    (!0 === d.animating && !0 === d.options.waitForAnimate) || (!0 === d.options.fade && d.currentSlide === t) || d.slideCount <= d.options.slidesToShow
                        ? void 0
                        : (!1 === e && d.asNavFor(t),
                          (s = t),
                          (l = d.getLeft(s)),
                          (o = d.getLeft(d.currentSlide)),
                          (d.currentLeft = null === d.swipeLeft ? o : d.swipeLeft),
                          !1 === d.options.infinite && !1 === d.options.centerMode && (t < 0 || t > d.getDotCount() * d.options.slidesToScroll)
                              ? void (
                                    !1 === d.options.fade &&
                                    ((s = d.currentSlide),
                                    !0 !== i
                                        ? d.animateSlide(o, function () {
                                              d.postSlide(s);
                                          })
                                        : d.postSlide(s))
                                )
                              : !1 === d.options.infinite && !0 === d.options.centerMode && (t < 0 || t > d.slideCount - d.options.slidesToScroll)
                              ? void (
                                    !1 === d.options.fade &&
                                    ((s = d.currentSlide),
                                    !0 !== i
                                        ? d.animateSlide(o, function () {
                                              d.postSlide(s);
                                          })
                                        : d.postSlide(s))
                                )
                              : (d.options.autoplay && clearInterval(d.autoPlayTimer),
                                (n =
                                    s < 0
                                        ? d.slideCount % d.options.slidesToScroll != 0
                                            ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                                            : d.slideCount + s
                                        : s >= d.slideCount
                                        ? d.slideCount % d.options.slidesToScroll != 0
                                            ? 0
                                            : s - d.slideCount
                                        : s),
                                (d.animating = !0),
                                d.$slider.trigger("beforeChange", [d, d.currentSlide, n]),
                                (a = d.currentSlide),
                                (d.currentSlide = n),
                                d.setSlideClasses(d.currentSlide),
                                d.options.asNavFor && (r = (r = d.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(d.currentSlide),
                                d.updateDots(),
                                d.updateArrows(),
                                !0 === d.options.fade
                                    ? (!0 !== i
                                          ? (d.fadeSlideOut(a),
                                            d.fadeSlide(n, function () {
                                                d.postSlide(n);
                                            }))
                                          : d.postSlide(n),
                                      void d.animateHeight())
                                    : void (!0 !== i
                                          ? d.animateSlide(l, function () {
                                                d.postSlide(n);
                                            })
                                          : d.postSlide(n))))
                );
            }),
            (r.prototype.startLoad = function () {
                var t = this;
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()),
                    !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                    t.$slider.addClass("slick-loading");
            }),
            (r.prototype.swipeDirection = function () {
                var t,
                    e,
                    i,
                    s,
                    n = this;
                return (
                    (t = n.touchObject.startX - n.touchObject.curX),
                    (e = n.touchObject.startY - n.touchObject.curY),
                    (i = Math.atan2(e, t)),
                    (s = Math.round((180 * i) / Math.PI)) < 0 && (s = 360 - Math.abs(s)),
                    s <= 45 && 0 <= s
                        ? !1 === n.options.rtl
                            ? "left"
                            : "right"
                        : s <= 360 && 315 <= s
                        ? !1 === n.options.rtl
                            ? "left"
                            : "right"
                        : 135 <= s && s <= 225
                        ? !1 === n.options.rtl
                            ? "right"
                            : "left"
                        : !0 === n.options.verticalSwiping
                        ? 35 <= s && s <= 135
                            ? "down"
                            : "up"
                        : "vertical"
                );
            }),
            (r.prototype.swipeEnd = function (t) {
                var e,
                    i,
                    s = this;
                if (((s.dragging = !1), (s.interrupted = !1), (s.shouldClick = !(10 < s.touchObject.swipeLength)), void 0 === s.touchObject.curX)) return !1;
                if ((!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe)) {
                    switch ((i = s.swipeDirection())) {
                        case "left":
                        case "down":
                            (e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount()), (s.currentDirection = 0);
                            break;
                        case "right":
                        case "up":
                            (e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount()), (s.currentDirection = 1);
                    }
                    "vertical" != i && (s.slideHandler(e), (s.touchObject = {}), s.$slider.trigger("swipe", [s, i]));
                } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), (s.touchObject = {}));
            }),
            (r.prototype.swipeHandler = function (t) {
                var e = this;
                if (!(!1 === e.options.swipe || ("ontouchend" in document && !1 === e.options.swipe) || (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))))
                    switch (
                        ((e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1),
                        (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
                        !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                        t.data.action)
                    ) {
                        case "start":
                            e.swipeStart(t);
                            break;
                        case "move":
                            e.swipeMove(t);
                            break;
                        case "end":
                            e.swipeEnd(t);
                    }
            }),
            (r.prototype.swipeMove = function (t) {
                var e,
                    i,
                    s,
                    n,
                    a,
                    o = this;
                return (
                    (a = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
                    !(!o.dragging || (a && 1 !== a.length)) &&
                        ((e = o.getLeft(o.currentSlide)),
                        (o.touchObject.curX = void 0 !== a ? a[0].pageX : t.clientX),
                        (o.touchObject.curY = void 0 !== a ? a[0].pageY : t.clientY),
                        (o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2)))),
                        !0 === o.options.verticalSwiping && (o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2)))),
                        "vertical" !== (i = o.swipeDirection())
                            ? (void 0 !== t.originalEvent && 4 < o.touchObject.swipeLength && t.preventDefault(),
                              (n = (!1 === o.options.rtl ? 1 : -1) * (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
                              !0 === o.options.verticalSwiping && (n = o.touchObject.curY > o.touchObject.startY ? 1 : -1),
                              (s = o.touchObject.swipeLength),
                              (o.touchObject.edgeHit = !1) === o.options.infinite &&
                                  ((0 === o.currentSlide && "right" === i) || (o.currentSlide >= o.getDotCount() && "left" === i)) &&
                                  ((s = o.touchObject.swipeLength * o.options.edgeFriction), (o.touchObject.edgeHit = !0)),
                              !1 === o.options.vertical ? (o.swipeLeft = e + s * n) : (o.swipeLeft = e + s * (o.$list.height() / o.listWidth) * n),
                              !0 === o.options.verticalSwiping && (o.swipeLeft = e + s * n),
                              !0 !== o.options.fade && !1 !== o.options.touchMove && (!0 === o.animating ? ((o.swipeLeft = null), !1) : void o.setCSS(o.swipeLeft)))
                            : void 0)
                );
            }),
            (r.prototype.swipeStart = function (t) {
                var e,
                    i = this;
                return (
                    (i.interrupted = !0),
                    1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow
                        ? !(i.touchObject = {})
                        : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]),
                          (i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX),
                          (i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY),
                          void (i.dragging = !0))
                );
            }),
            (r.prototype.unfilterSlides = r.prototype.slickUnfilter = function () {
                var t = this;
                null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit());
            }),
            (r.prototype.unload = function () {
                var t = this;
                c(".slick-cloned", t.$slider).remove(),
                    t.$dots && t.$dots.remove(),
                    t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
                    t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
                    t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }),
            (r.prototype.unslick = function (t) {
                var e = this;
                e.$slider.trigger("unslick", [e, t]), e.destroy();
            }),
            (r.prototype.updateArrows = function () {
                var t,
                    e = this;
                (t = Math.floor(e.options.slidesToShow / 2)),
                    !0 === e.options.arrows &&
                        e.slideCount > e.options.slidesToShow &&
                        !e.options.infinite &&
                        (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === e.currentSlide
                            ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode
                            ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : e.currentSlide >= e.slideCount - 1 &&
                              !0 === e.options.centerMode &&
                              (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (r.prototype.updateDots = function () {
                var t = this;
                null !== t.$dots &&
                    (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
                    t.$dots
                        .find("li")
                        .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
                        .addClass("slick-active")
                        .attr("aria-hidden", "false"));
            }),
            (r.prototype.visibility = function () {
                var t = this;
                t.options.autoplay && (document[t.hidden] ? (t.interrupted = !0) : (t.interrupted = !1));
            }),
            (c.fn.slick = function (t) {
                var e,
                    i,
                    s = this,
                    n = t,
                    a = Array.prototype.slice.call(arguments, 1),
                    o = s.length;
                for (e = 0; e < o; e++) if (("object" == typeof n || void 0 === n ? (s[e].slick = new r(s[e], n)) : (i = s[e].slick[n].apply(s[e].slick, a)), void 0 !== i)) return i;
                return s;
            });
    }),
    void 0 === psLib)
)
    var psLib = {};
if (
    ((psLib.Chart = function (ctn) {
        var charts = $(".ps-chart", ctn),
            idx = 0;
        if (0 < charts.length && "undefined" == typeof Chart) return console.warn("Biblioteca Chart necessÃ¡ria para construir formulÃ¡rio"), !1;
        (window.graph = []),
            charts.each(function () {
                var t = $(this),
                    type = t.data("charttype"),
                    source = t.data("chartsource"),
                    download = void 0 !== t.data("chartdownload") && t.data("chartdownload"),
                    config = void 0 !== t.data("chartconfig") && t.data("chartconfig"),
                    w = t.outerWidth(),
                    h = void 0 !== t.data("chartheight") ? t.data("chartheight") : w < 150 ? w : w / 2,
                    d = new Date(),
                    id = "chart" + d.valueOf(),
                    bgColor = t.css("backgroundColor"),
                    ctt = '\t<canvas id="' + id + '" width="' + w + '" height="' + h + '"></canvas>',
                    param = { download: download, config: config, idx: idx };
                if (void 0 === type || void 0 === source) return console.warn("ParÃ¢metros do grÃ¡fico nÃ£o declarados corretamente"), !1;
                if (void 0 !== t.data("guideinitialized") && "null" != typeof t.data("guideinitialized")) {
                    if ("false" != t.data("guideinitialized")) return;
                    t.empty();
                }
                t.append(ctt);
                var canvas = $("#" + id).get(0);
                psLib.IsOldIE && (canvas = G_vmlCanvasManager.initElement(canvas));
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, w, h),
                    -1 < source.indexOf("remote:")
                        ? $.ajax({
                              url: source.replace("remote:", ""),
                              type: "POST",
                              dataType: "json",
                              indexValue: param,
                              beforeSend: function () {
                                  t.append('<span class="ps-ico-loading ps-ico-lg"></span>'), psLib.Loading(t);
                              },
                              success: function (e) {
                                  t.find(".ps-ico-loading").remove(), (e = psLib.ChartProcessColors(type, e, bgColor)), psLib.ChartBuilder(type, e, ctx, canvas, this.indexValue);
                              },
                          }).error(function () {
                              console.warn("Ocorreu um erro ao carregar os dados do grÃ¡fico"), t.find(".ps-ico-loading").remove(), psLib.NotifyShowHide("error:Ocorreu um erro ao processar o grÃ¡fico");
                          })
                        : (-1 < source.indexOf("function:") ? (data = eval("(window." + source.replace("function:", "") + ")")) : (data = eval("window." + source)),
                          (data = psLib.ChartProcessColors(type, data, bgColor)),
                          psLib.ChartBuilder(type, data, ctx, canvas, param)),
                    idx++,
                    t.data("guideinitialized", "true");
            });
    }),
    (psLib.ChartProcessColors = function (t, e, i) {
        var s = e;
        if ("line" == t || "bar" == t || "radar" == t)
            if (1 == s.datasets.length) {
                var n = void 0 !== s.datasets[0].baseColor ? psLib.ChartColorScheme(t, s.datasets[0].baseColor, i) : psLib.ChartColors(t, 1, i);
                $.extend(s.datasets[0], n);
            } else
                for (var a = 0, o = s.datasets.length; a < o; a++) {
                    var n = void 0 !== s.datasets[a].baseColor ? psLib.ChartColorScheme(t, s.datasets[a].baseColor, i) : psLib.ChartColors(t, a, i);
                    $.extend(s.datasets[a], n);
                }
        else
            for (var a = 0, o = s.length; a < o; a++) {
                var n = void 0 !== s[a].baseColor ? psLib.ChartColorScheme(t, s[a].baseColor, i) : psLib.ChartColors(t, a, i);
                $.extend(s[a], n);
            }
        return s;
    }),
    (psLib.ChartColors = function (t, e, i) {
        var s = {};
        return (
            (colors = {
                line: ["220,220,220", "0,164,216", "27,70,94", "35,131,163"],
                radar: ["220,220,220", "0,164,216", "27,70,94", "35,131,163"],
                bar: ["220,220,220", "0,164,216", "27,70,94", "35,131,163"],
                polarArea: ["0,164,216", "34,126,156", "0,70,92", "34,51,56", "25,93,115", "0,108,145", "0,194,255"],
                pie: ["0,164,216", "34,126,156", "0,108,145", "0,70,92", "34,51,56", "25,93,115", "0,194,255"],
                doughnut: ["0,164,216", "34,126,156", "0,70,92", "34,51,56", "25,93,115", "0,108,145", "0,194,255"],
            }),
            void 0 === colors[t][e] && (e %= colors[t].length),
            (s = psLib.ChartColorScheme(t, colors[t][e], i))
        );
    }),
    (psLib.ChartColorScheme = function (t, e, i) {
        var s = {};
        return (
            -1 < e.indexOf("#") && (e = psLib.ConvertHexToRGB(e)),
            (s =
                "line" == t || "radar" == t
                    ? { fillColor: "rgba(" + e + ",0.2)", strokeColor: "rgba(" + e + ",1)", pointColor: "rgba(" + e + ",1)", pointStrokeColor: i, pointHighlightFill: i, pointHighlightStroke: "rgba(" + e + ",1)" }
                    : "bar" == t
                    ? { fillColor: "rgba(" + e + ",0.5)", strokeColor: "rgba(" + e + ",0.8)", highlightFill: "rgba(" + e + ",0.75)", highlightStroke: "rgba(" + e + ",1)" }
                    : { color: "rgba(" + e + ",1)", highlight: "rgba(" + e + ",0.7)" })
        );
    }),
    (psLib.ChartBuilder = function (type, data, ctx, canvas, param) {
        var opt = { animation: !1, scaleGridLineWidth: 1, tooltipFontFamily: '"open_sans", Arial, Sans-serif', tooltipCornerRadius: 2, tooltipFillColor: "rgba(0,0,0,.5)" },
            idx = param.idx;
        switch (
            (("pie" != type && "doughnut" != type) || ((opt.showTooltips = !1), (opt.tooltipCaretSize = 3), data.length <= 7 ? (opt.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%=value%>") : (opt.tooltipTemplate = "<%=value%>")),
            ("line" != type && "bar" != type && "radar" != type) || (opt.multiTooltipTemplate = "<%=datasetLabel%> : <%= value %>"),
            param.config && ((param.config = eval("window." + param.config)), $.extend(opt, param.config)),
            type)
        ) {
            case "line":
                window.graph[idx] = new Chart(ctx).Line(data, opt);
                break;
            case "bar":
                window.graph[idx] = new Chart(ctx).Bar(data, opt);
                break;
            case "radar":
                window.graph[idx] = new Chart(ctx).Radar(data, opt);
                break;
            case "polarArea":
                window.graph[idx] = new Chart(ctx).PolarArea(data, opt);
                break;
            case "doughnut":
                (window.graph[idx] = new Chart(ctx).Doughnut(data, opt)), window.graph[idx].showTooltip(window.graph[idx].segments), psLib.ChartLegend(canvas, idx);
                break;
            case "pie":
                (window.graph[idx] = new Chart(ctx).Pie(data, opt)), window.graph[idx].showTooltip(window.graph[idx].segments), psLib.ChartLegend(canvas, idx);
        }
        param.download && psLib.ChartImg(canvas, idx);
    }),
    (psLib.ChartLegend = function (t, i) {
        var e = document.createElement("div");
        (e.innerHTML = window.graph[i].generateLegend()),
            Chart.helpers.each(e.firstChild.childNodes, function (t, e) {
                Chart.helpers.addEvent(t, "mouseover", function () {
                    var t = window.graph[i].segments[e];
                    t.save(), (t.fillColor = t.highlightColor), window.graph[i].showTooltip([t]), t.restore();
                });
            }),
            Chart.helpers.addEvent(e.firstChild, "mouseout", function () {
                window.graph[i].showTooltip(window.graph[i].segments);
            }),
            $(t).parent().append(e.firstChild);
    }),
    (psLib.ChartImg = function (t, e) {
        var i = window.graph[e].toBase64Image(),
            s;
        $(t)
            .parent()
            .addClass("ps-chart-downloadPad")
            .append('<a href="' + i + '" class="ps-chart-download" target="_blank" title="Download"><span class="ps-ico ps-ico-download"></span></a> ');
    }),
    function () {
        "use strict";
        var t = this,
            e = t.Chart,
            o = function (t) {
                (this.canvas = t.canvas), (this.ctx = t);
                var e = function (t, e) {
                        return t["offset" + e] ? t["offset" + e] : document.defaultView.getComputedStyle(t).getPropertyValue(e);
                    },
                    i = (this.width = e(t.canvas, "Width")),
                    s = (this.height = e(t.canvas, "Height"));
                (t.canvas.width = i), (t.canvas.height = s);
                var i = (this.width = t.canvas.width),
                    s = (this.height = t.canvas.height);
                return (this.aspectRatio = this.width / this.height), h.retinaScale(this), this;
            };
        (o.defaults = {
            global: {
                animation: !0,
                animationSteps: 60,
                animationEasing: "easeOutQuart",
                showScale: !0,
                scaleOverride: !1,
                scaleSteps: null,
                scaleStepWidth: null,
                scaleStartValue: null,
                scaleLineColor: "rgba(0,0,0,.1)",
                scaleLineWidth: 1,
                scaleShowLabels: !0,
                scaleLabel: "<%=value%>",
                scaleIntegersOnly: !0,
                scaleBeginAtZero: !1,
                scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                scaleFontSize: 12,
                scaleFontStyle: "normal",
                scaleFontColor: "#666",
                responsive: !1,
                maintainAspectRatio: !0,
                showTooltips: !0,
                customTooltips: !1,
                tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
                tooltipFillColor: "rgba(0,0,0,0.8)",
                tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                tooltipFontSize: 14,
                tooltipFontStyle: "normal",
                tooltipFontColor: "#fff",
                tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                tooltipTitleFontSize: 14,
                tooltipTitleFontStyle: "bold",
                tooltipTitleFontColor: "#fff",
                tooltipYPadding: 6,
                tooltipXPadding: 6,
                tooltipCaretSize: 8,
                tooltipCornerRadius: 6,
                tooltipXOffset: 10,
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
                multiTooltipTemplate: "<%= value %>",
                multiTooltipKeyBackground: "#fff",
                onAnimationProgress: function () {},
                onAnimationComplete: function () {},
            },
        }),
            (o.types = {});
        var h = (o.helpers = {}),
            u = (h.each = function (t, e, i) {
                var s = Array.prototype.slice.call(arguments, 3);
                if (t)
                    if (t.length === +t.length) {
                        var n;
                        for (n = 0; n < t.length; n++) e.apply(i, [t[n], n].concat(s));
                    } else for (var a in t) e.apply(i, [t[a], a].concat(s));
            }),
            a = (h.clone = function (i) {
                var s = {};
                return (
                    u(i, function (t, e) {
                        i.hasOwnProperty(e) && (s[e] = t);
                    }),
                    s
                );
            }),
            r = (h.extend = function (s) {
                return (
                    u(Array.prototype.slice.call(arguments, 1), function (i) {
                        u(i, function (t, e) {
                            i.hasOwnProperty(e) && (s[e] = t);
                        });
                    }),
                    s
                );
            }),
            l = (h.merge = function () {
                var t = Array.prototype.slice.call(arguments, 0);
                return t.unshift({}), r.apply(null, t);
            }),
            p = (h.indexOf = function (t, e) {
                if (Array.prototype.indexOf) return t.indexOf(e);
                for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
                return -1;
            }),
            n =
                ((h.where = function (t, e) {
                    var i = [];
                    return (
                        h.each(t, function (t) {
                            e(t) && i.push(t);
                        }),
                        i
                    );
                }),
                (h.findNextWhere = function (t, e, i) {
                    i || (i = -1);
                    for (var s = i + 1; s < t.length; s++) {
                        var n = t[s];
                        if (e(n)) return n;
                    }
                }),
                (h.findPreviousWhere = function (t, e, i) {
                    i || (i = t.length);
                    for (var s = i - 1; 0 <= s; s--) {
                        var n = t[s];
                        if (e(n)) return n;
                    }
                }),
                (h.inherits = function (t) {
                    var e = this,
                        i =
                            t && t.hasOwnProperty("constructor")
                                ? t.constructor
                                : function () {
                                      return e.apply(this, arguments);
                                  },
                        s = function () {
                            this.constructor = i;
                        };
                    return (s.prototype = e.prototype), (i.prototype = new s()), (i.extend = n), t && r(i.prototype, t), (i.__super__ = e.prototype), i;
                })),
            s = (h.noop = function () {}),
            d = (h.uid =
                ((E = 0),
                function () {
                    return "chart-" + E++;
                })),
            c = (h.warn = function (t) {
                window.console && "function" == typeof window.console.warn && console.warn(t);
            }),
            i = (h.amd = "function" == typeof define && define.amd),
            g = (h.isNumber = function (t) {
                return !isNaN(parseFloat(t)) && isFinite(t);
            }),
            v = (h.max = function (t) {
                return Math.max.apply(Math, t);
            }),
            b = (h.min = function (t) {
                return Math.min.apply(Math, t);
            }),
            f =
                ((h.cap = function (t, e, i) {
                    if (g(e)) {
                        if (e < t) return e;
                    } else if (g(i) && t < i) return i;
                    return t;
                }),
                (h.getDecimalPlaces = function (t) {
                    return t % 1 != 0 && g(t) ? t.toString().split(".")[1].length : 0;
                })),
            m = (h.radians = function (t) {
                return t * (Math.PI / 180);
            }),
            w =
                ((h.getAngleFromPoint = function (t, e) {
                    var i = e.x - t.x,
                        s = e.y - t.y,
                        n = Math.sqrt(i * i + s * s),
                        a = 2 * Math.PI + Math.atan2(s, i);
                    return i < 0 && s < 0 && (a += 2 * Math.PI), { angle: a, distance: n };
                }),
                (h.aliasPixel = function (t) {
                    return t % 2 == 0 ? 0 : 0.5;
                })),
            y =
                ((h.splineCurve = function (t, e, i, s) {
                    var n = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)),
                        a = Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2)),
                        o = (s * n) / (n + a),
                        r = (s * a) / (n + a);
                    return { inner: { x: e.x - o * (i.x - t.x), y: e.y - o * (i.y - t.y) }, outer: { x: e.x + r * (i.x - t.x), y: e.y + r * (i.y - t.y) } };
                }),
                (h.calculateOrderOfMagnitude = function (t) {
                    return Math.floor(Math.log(t) / Math.LN10);
                })),
            k =
                ((h.calculateScaleRange = function (t, e, i, s, n) {
                    var a = 2,
                        o = Math.floor(e / (1.5 * i)),
                        r = o <= 2,
                        l = v(t),
                        d = b(t);
                    l === d && ((l += 0.5), 0.5 <= d && !s ? (d -= 0.5) : (l += 0.5));
                    for (
                        var c = Math.abs(l - d),
                            h = y(c),
                            u = Math.ceil(l / (1 * Math.pow(10, h))) * Math.pow(10, h),
                            p = s ? 0 : Math.floor(d / (1 * Math.pow(10, h))) * Math.pow(10, h),
                            f = u - p,
                            g = Math.pow(10, h),
                            m = Math.round(f / g);
                        (o < m || 2 * m < o) && !r;

                    )
                        if (o < m) (g *= 2), (m = Math.round(f / g)) % 1 != 0 && (r = !0);
                        else if (n && 0 <= h) {
                            if ((g / 2) % 1 != 0) break;
                            (g /= 2), (m = Math.round(f / g));
                        } else (g /= 2), (m = Math.round(f / g));
                    return r && (g = f / (m = 2)), { steps: m, stepValue: g, min: p, max: p + m * g };
                }),
                (h.template = function (t, e) {
                    function i(t, e) {
                        var i = /\W/.test(t)
                            ? new Function(
                                  "obj",
                                  "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" +
                                      t
                                          .replace(/[\r\t\n]/g, " ")
                                          .split("<%")
                                          .join("\t")
                                          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                                          .replace(/\t=(.*?)%>/g, "',$1,'")
                                          .split("\t")
                                          .join("');")
                                          .split("%>")
                                          .join("p.push('")
                                          .split("\r")
                                          .join("\\'") +
                                      "');}return p.join('');"
                              )
                            : (s[t] = s[t]);
                        return e ? i(e) : i;
                    }
                    if (t instanceof Function) return t(e);
                    var s = {};
                    return i(t, e);
                })),
            _ =
                ((h.generateLabels = function (i, t, s, n) {
                    var a = new Array(t);
                    return (
                        labelTemplateString &&
                            u(a, function (t, e) {
                                a[e] = k(i, { value: s + n * (e + 1) });
                            }),
                        a
                    );
                }),
                (h.easingEffects = {
                    linear: function (t) {
                        return t;
                    },
                    easeInQuad: function (t) {
                        return t * t;
                    },
                    easeOutQuad: function (t) {
                        return -1 * t * (t - 2);
                    },
                    easeInOutQuad: function (t) {
                        return (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
                    },
                    easeInCubic: function (t) {
                        return t * t * t;
                    },
                    easeOutCubic: function (t) {
                        return 1 * ((t = t / 1 - 1) * t * t + 1);
                    },
                    easeInOutCubic: function (t) {
                        return (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
                    },
                    easeInQuart: function (t) {
                        return t * t * t * t;
                    },
                    easeOutQuart: function (t) {
                        return -1 * ((t = t / 1 - 1) * t * t * t - 1);
                    },
                    easeInOutQuart: function (t) {
                        return (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
                    },
                    easeInQuint: function (t) {
                        return 1 * (t /= 1) * t * t * t * t;
                    },
                    easeOutQuint: function (t) {
                        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
                    },
                    easeInOutQuint: function (t) {
                        return (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
                    },
                    easeInSine: function (t) {
                        return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
                    },
                    easeOutSine: function (t) {
                        return 1 * Math.sin((t / 1) * (Math.PI / 2));
                    },
                    easeInOutSine: function (t) {
                        return -0.5 * (Math.cos((Math.PI * t) / 1) - 1);
                    },
                    easeInExpo: function (t) {
                        return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
                    },
                    easeOutExpo: function (t) {
                        return 1 === t ? 1 : 1 * (1 - Math.pow(2, (-10 * t) / 1));
                    },
                    easeInOutExpo: function (t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * --t));
                    },
                    easeInCirc: function (t) {
                        return 1 <= t ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
                    },
                    easeOutCirc: function (t) {
                        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
                    },
                    easeInOutCirc: function (t) {
                        return (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                    },
                    easeInElastic: function (t) {
                        var e = 1.70158,
                            i = 0,
                            s = 1;
                        return 0 === t
                            ? 0
                            : 1 == (t /= 1)
                            ? 1
                            : (i || (i = 0.3), (e = s < Math.abs(1) ? ((s = 1), i / 4) : (i / (2 * Math.PI)) * Math.asin(1 / s)), -s * Math.pow(2, 10 * (t -= 1)) * Math.sin((2 * (1 * t - e) * Math.PI) / i));
                    },
                    easeOutElastic: function (t) {
                        var e = 1.70158,
                            i = 0,
                            s = 1;
                        return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (i || (i = 0.3), (e = s < Math.abs(1) ? ((s = 1), i / 4) : (i / (2 * Math.PI)) * Math.asin(1 / s)), s * Math.pow(2, -10 * t) * Math.sin((2 * (1 * t - e) * Math.PI) / i) + 1);
                    },
                    easeInOutElastic: function (t) {
                        var e = 1.70158,
                            i = 0,
                            s = 1;
                        return 0 === t
                            ? 0
                            : 2 == (t /= 0.5)
                            ? 1
                            : (i || (i = 0.3 * 1.5),
                              (e = s < Math.abs(1) ? ((s = 1), i / 4) : (i / (2 * Math.PI)) * Math.asin(1 / s)),
                              t < 1 ? -0.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin((2 * (1 * t - e) * Math.PI) / i) : s * Math.pow(2, -10 * (t -= 1)) * Math.sin((2 * (1 * t - e) * Math.PI) / i) * 0.5 + 1);
                    },
                    easeInBack: function (t) {
                        var e = 1.70158;
                        return 1 * (t /= 1) * t * ((e + 1) * t - e);
                    },
                    easeOutBack: function (t) {
                        var e = 1.70158;
                        return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1);
                    },
                    easeInOutBack: function (t) {
                        var e = 1.70158;
                        return (t /= 0.5) < 1 ? 0.5 * t * t * ((1 + (e *= 1.525)) * t - e) : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
                    },
                    easeInBounce: function (t) {
                        return 1 - _.easeOutBounce(1 - t);
                    },
                    easeOutBounce: function (t) {
                        return (t /= 1) < 1 / 2.75
                            ? 7.5625 * t * t
                            : t < 2 / 2.75
                            ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                            : t < 2.5 / 2.75
                            ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                            : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
                    },
                    easeInOutBounce: function (t) {
                        return t < 0.5 ? 0.5 * _.easeInBounce(2 * t) : 0.5 * _.easeOutBounce(2 * t - 1) + 0.5;
                    },
                })),
            C = (h.requestAnimFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (t) {
                    return window.setTimeout(t, 1e3 / 60);
                }),
            x = (h.cancelAnimFrame =
                window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                function (t) {
                    return window.clearTimeout(t, 1e3 / 60);
                }),
            S =
                ((h.animationLoop = function (i, s, t, n, a, o) {
                    var r = 0,
                        l = _[t] || _.linear,
                        d = function () {
                            var t = ++r / s,
                                e = l(t);
                            i.call(o, e, t, r), n.call(o, e, t), r < s ? (o.animationFrame = C(d)) : a.apply(o);
                        };
                    C(d);
                }),
                (h.getRelativePosition = function (t) {
                    var e,
                        i,
                        s = t.originalEvent || t,
                        n,
                        a = (t.currentTarget || t.srcElement).getBoundingClientRect();
                    return (i = s.touches ? ((e = s.touches[0].clientX - a.left), s.touches[0].clientY - a.top) : ((e = s.clientX - a.left), s.clientY - a.top)), { x: e, y: i };
                }),
                (h.addEvent = function (t, e, i) {
                    t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : (t["on" + e] = i);
                })),
            T = (h.removeEvent = function (t, e, i) {
                t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : (t["on" + e] = s);
            }),
            D =
                ((h.bindEvents = function (e, t, i) {
                    e.events || (e.events = {}),
                        u(t, function (t) {
                            (e.events[t] = function () {
                                i.apply(e, arguments);
                            }),
                                S(e.chart.canvas, t, e.events[t]);
                        });
                }),
                (h.unbindEvents = function (i, t) {
                    u(t, function (t, e) {
                        T(i.chart.canvas, e, t);
                    });
                })),
            M = (h.getMaximumWidth = function (t) {
                var e;
                return t.parentNode.clientWidth;
            }),
            $ = (h.getMaximumHeight = function (t) {
                var e;
                return t.parentNode.clientHeight;
            }),
            L =
                ((h.getMaximumSize = h.getMaximumWidth),
                (h.retinaScale = function (t) {
                    var e = t.ctx,
                        i = t.canvas.width,
                        s = t.canvas.height;
                    window.devicePixelRatio &&
                        ((e.canvas.style.width = i + "px"),
                        (e.canvas.style.height = s + "px"),
                        (e.canvas.height = s * window.devicePixelRatio),
                        (e.canvas.width = i * window.devicePixelRatio),
                        e.scale(window.devicePixelRatio, window.devicePixelRatio));
                })),
            I = (h.clear = function (t) {
                t.ctx.clearRect(0, 0, t.width, t.height);
            }),
            P = (h.fontString = function (t, e, i) {
                return e + " " + t + "px " + i;
            }),
            F = (h.longestText = function (i, t, e) {
                i.font = t;
                var s = 0;
                return (
                    u(e, function (t) {
                        var e = i.measureText(t).width;
                        s = s < e ? e : s;
                    }),
                    s
                );
            }),
            A = (h.drawRoundedRectangle = function (t, e, i, s, n, a) {
                t.beginPath(),
                    t.moveTo(e + a, i),
                    t.lineTo(e + s - a, i),
                    t.quadraticCurveTo(e + s, i, e + s, i + a),
                    t.lineTo(e + s, i + n - a),
                    t.quadraticCurveTo(e + s, i + n, e + s - a, i + n),
                    t.lineTo(e + a, i + n),
                    t.quadraticCurveTo(e, i + n, e, i + n - a),
                    t.lineTo(e, i + a),
                    t.quadraticCurveTo(e, i, e + a, i),
                    t.closePath();
            }),
            E,
            z;
        (o.instances = {}),
            (o.Type = function (t, e, i) {
                (this.options = e), (this.chart = i), (this.id = d()), (o.instances[this.id] = this), e.responsive && this.resize(), this.initialize.call(this, t);
            }),
            r(o.Type.prototype, {
                initialize: function () {
                    return this;
                },
                clear: function () {
                    return I(this.chart), this;
                },
                stop: function () {
                    return x(this.animationFrame), this;
                },
                resize: function (t) {
                    this.stop();
                    var e = this.chart.canvas,
                        i = M(this.chart.canvas),
                        s = this.options.maintainAspectRatio ? i / this.chart.aspectRatio : $(this.chart.canvas);
                    return (e.width = this.chart.width = i), (e.height = this.chart.height = s), L(this.chart), "function" == typeof t && t.apply(this, Array.prototype.slice.call(arguments, 1)), this;
                },
                reflow: s,
                render: function (t) {
                    return (
                        t && this.reflow(),
                        this.options.animation && !t
                            ? h.animationLoop(this.draw, this.options.animationSteps, this.options.animationEasing, this.options.onAnimationProgress, this.options.onAnimationComplete, this)
                            : (this.draw(), this.options.onAnimationComplete.call(this)),
                        this
                    );
                },
                generateLegend: function () {
                    return k(this.options.legendTemplate, this);
                },
                destroy: function () {
                    this.clear(), D(this, this.events);
                    var t = this.chart.canvas;
                    (t.width = this.chart.width),
                        (t.height = this.chart.height),
                        t.style.removeProperty ? (t.style.removeProperty("width"), t.style.removeProperty("height")) : (t.style.removeAttribute("width"), t.style.removeAttribute("height")),
                        delete o.instances[this.id];
                },
                showTooltip: function (t, e) {
                    var i;
                    if (
                        (void 0 === this.activeElements && (this.activeElements = []),
                        function (t) {
                            var i = !1;
                            return t.length !== this.activeElements.length
                                ? (i = !0)
                                : (u(
                                      t,
                                      function (t, e) {
                                          t !== this.activeElements[e] && (i = !0);
                                      },
                                      this
                                  ),
                                  i);
                        }.call(this, t) || e)
                    ) {
                        if (((this.activeElements = t), this.draw(), this.options.customTooltips && this.options.customTooltips(!1), 0 < t.length))
                            if (this.datasets && 1 < this.datasets.length) {
                                for (var s, l, n = this.datasets.length - 1; 0 <= n && ((s = this.datasets[n].points || this.datasets[n].bars || this.datasets[n].segments), -1 === (l = p(s, t[0]))); n--);
                                var d = [],
                                    c = [],
                                    a = function () {
                                        var e,
                                            t,
                                            i,
                                            s,
                                            n,
                                            a = [],
                                            o = [],
                                            r = [];
                                        return (
                                            h.each(this.datasets, function (t) {
                                                (e = t.points || t.bars || t.segments)[l] && e[l].hasValue() && a.push(e[l]);
                                            }),
                                            h.each(
                                                a,
                                                function (t) {
                                                    o.push(t.x), r.push(t.y), d.push(h.template(this.options.multiTooltipTemplate, t)), c.push({ fill: t._saved.fillColor || t.fillColor, stroke: t._saved.strokeColor || t.strokeColor });
                                                },
                                                this
                                            ),
                                            (n = b(r)),
                                            (i = v(r)),
                                            (s = b(o)),
                                            (t = v(o)),
                                            { x: s > this.chart.width / 2 ? s : t, y: (n + i) / 2 }
                                        );
                                    }.call(this, l);
                                new o.MultiTooltip({
                                    x: a.x,
                                    y: a.y,
                                    xPadding: this.options.tooltipXPadding,
                                    yPadding: this.options.tooltipYPadding,
                                    xOffset: this.options.tooltipXOffset,
                                    fillColor: this.options.tooltipFillColor,
                                    textColor: this.options.tooltipFontColor,
                                    fontFamily: this.options.tooltipFontFamily,
                                    fontStyle: this.options.tooltipFontStyle,
                                    fontSize: this.options.tooltipFontSize,
                                    titleTextColor: this.options.tooltipTitleFontColor,
                                    titleFontFamily: this.options.tooltipTitleFontFamily,
                                    titleFontStyle: this.options.tooltipTitleFontStyle,
                                    titleFontSize: this.options.tooltipTitleFontSize,
                                    cornerRadius: this.options.tooltipCornerRadius,
                                    labels: d,
                                    legendColors: c,
                                    legendColorBackground: this.options.multiTooltipKeyBackground,
                                    title: t[0].label,
                                    chart: this.chart,
                                    ctx: this.chart.ctx,
                                    custom: this.options.customTooltips,
                                }).draw();
                            } else
                                u(
                                    t,
                                    function (t) {
                                        var e = t.tooltipPosition();
                                        new o.Tooltip({
                                            x: Math.round(e.x),
                                            y: Math.round(e.y),
                                            xPadding: this.options.tooltipXPadding,
                                            yPadding: this.options.tooltipYPadding,
                                            fillColor: this.options.tooltipFillColor,
                                            textColor: this.options.tooltipFontColor,
                                            fontFamily: this.options.tooltipFontFamily,
                                            fontStyle: this.options.tooltipFontStyle,
                                            fontSize: this.options.tooltipFontSize,
                                            caretHeight: this.options.tooltipCaretSize,
                                            cornerRadius: this.options.tooltipCornerRadius,
                                            text: k(this.options.tooltipTemplate, t),
                                            chart: this.chart,
                                            custom: this.options.customTooltips,
                                        }).draw();
                                    },
                                    this
                                );
                        return this;
                    }
                },
                toBase64Image: function () {
                    return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
                },
            }),
            (o.Type.extend = function (t) {
                var e = this,
                    s = function () {
                        return e.apply(this, arguments);
                    };
                if (((s.prototype = a(e.prototype)), r(s.prototype, t), (s.extend = o.Type.extend), t.name || e.prototype.name)) {
                    var n = t.name || e.prototype.name,
                        i = o.defaults[e.prototype.name] ? a(o.defaults[e.prototype.name]) : {};
                    (o.defaults[n] = r(i, t.defaults)),
                        (o.types[n] = s),
                        (o.prototype[n] = function (t, e) {
                            var i = l(o.defaults.global, o.defaults[n], e || {});
                            return new s(t, i, this);
                        });
                } else c("Name not provided for this chart, so it hasn't been registered");
                return e;
            }),
            (o.Element = function (t) {
                r(this, t), this.initialize.apply(this, arguments), this.save();
            }),
            r(o.Element.prototype, {
                initialize: function () {},
                restore: function (t) {
                    return (
                        t
                            ? u(
                                  t,
                                  function (t) {
                                      this[t] = this._saved[t];
                                  },
                                  this
                              )
                            : r(this, this._saved),
                        this
                    );
                },
                save: function () {
                    return (this._saved = a(this)), delete this._saved._saved, this;
                },
                update: function (t) {
                    return (
                        u(
                            t,
                            function (t, e) {
                                (this._saved[e] = this[e]), (this[e] = t);
                            },
                            this
                        ),
                        this
                    );
                },
                transition: function (t, i) {
                    return (
                        u(
                            t,
                            function (t, e) {
                                this[e] = (t - this._saved[e]) * i + this._saved[e];
                            },
                            this
                        ),
                        this
                    );
                },
                tooltipPosition: function () {
                    return { x: this.x, y: this.y };
                },
                hasValue: function () {
                    return g(this.value);
                },
            }),
            (o.Element.extend = n),
            (o.Point = o.Element.extend({
                display: !0,
                inRange: function (t, e) {
                    var i = this.hitDetectionRadius + this.radius;
                    return Math.pow(t - this.x, 2) + Math.pow(e - this.y, 2) < Math.pow(i, 2);
                },
                draw: function () {
                    if (this.display) {
                        var t = this.ctx;
                        t.beginPath(), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), t.closePath(), (t.strokeStyle = this.strokeColor), (t.lineWidth = this.strokeWidth), (t.fillStyle = this.fillColor), t.fill(), t.stroke();
                    }
                },
            })),
            (o.Arc = o.Element.extend({
                inRange: function (t, e) {
                    var i = h.getAngleFromPoint(this, { x: t, y: e }),
                        s = i.angle >= this.startAngle && i.angle <= this.endAngle,
                        n = i.distance >= this.innerRadius && i.distance <= this.outerRadius;
                    return s && n;
                },
                tooltipPosition: function () {
                    var t = this.startAngle + (this.endAngle - this.startAngle) / 2,
                        e = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
                    return { x: this.x + Math.cos(t) * e, y: this.y + Math.sin(t) * e };
                },
                draw: function (t) {
                    var e = this.ctx;
                    e.beginPath(),
                        e.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle),
                        e.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, !0),
                        e.closePath(),
                        (e.strokeStyle = this.strokeColor),
                        (e.lineWidth = this.strokeWidth),
                        (e.fillStyle = this.fillColor),
                        e.fill(),
                        (e.lineJoin = "bevel"),
                        this.showStroke && e.stroke();
                },
            })),
            (o.Rectangle = o.Element.extend({
                draw: function () {
                    var t = this.ctx,
                        e = this.width / 2,
                        i = this.x - e,
                        s = this.x + e,
                        n = this.base - (this.base - this.y),
                        a = this.strokeWidth / 2;
                    this.showStroke && ((i += a), (s -= a), (n += a)),
                        t.beginPath(),
                        (t.fillStyle = this.fillColor),
                        (t.strokeStyle = this.strokeColor),
                        (t.lineWidth = this.strokeWidth),
                        t.moveTo(i, this.base),
                        t.lineTo(i, n),
                        t.lineTo(s, n),
                        t.lineTo(s, this.base),
                        t.fill(),
                        this.showStroke && t.stroke();
                },
                height: function () {
                    return this.base - this.y;
                },
                inRange: function (t, e) {
                    return t >= this.x - this.width / 2 && t <= this.x + this.width / 2 && e >= this.y && e <= this.base;
                },
            })),
            (o.Tooltip = o.Element.extend({
                draw: function () {
                    var t = this.chart.ctx;
                    (t.font = P(this.fontSize, this.fontStyle, this.fontFamily)), (this.xAlign = "center"), (this.yAlign = "above");
                    var e = (this.caretPadding = 2),
                        i = t.measureText(this.text).width + 2 * this.xPadding,
                        s = this.fontSize + 2 * this.yPadding,
                        n = s + this.caretHeight + e;
                    this.x + i / 2 > this.chart.width ? (this.xAlign = "left") : this.x - i / 2 < 0 && (this.xAlign = "right"), this.y - n < 0 && (this.yAlign = "below");
                    var a = this.x - i / 2,
                        o = this.y - n;
                    if (((t.fillStyle = this.fillColor), this.custom)) this.custom(this);
                    else {
                        switch (this.yAlign) {
                            case "above":
                                t.beginPath(),
                                    t.moveTo(this.x, this.y - e),
                                    t.lineTo(this.x + this.caretHeight, this.y - (e + this.caretHeight)),
                                    t.lineTo(this.x - this.caretHeight, this.y - (e + this.caretHeight)),
                                    t.closePath(),
                                    t.fill();
                                break;
                            case "below":
                                (o = this.y + e + this.caretHeight),
                                    t.beginPath(),
                                    t.moveTo(this.x, this.y + e),
                                    t.lineTo(this.x + this.caretHeight, this.y + e + this.caretHeight),
                                    t.lineTo(this.x - this.caretHeight, this.y + e + this.caretHeight),
                                    t.closePath(),
                                    t.fill();
                        }
                        switch (this.xAlign) {
                            case "left":
                                a = this.x - i + (this.cornerRadius + this.caretHeight);
                                break;
                            case "right":
                                a = this.x - (this.cornerRadius + this.caretHeight);
                        }
                        A(t, a, o, i, s, this.cornerRadius), t.fill(), (t.fillStyle = this.textColor), (t.textAlign = "center"), (t.textBaseline = "middle"), t.fillText(this.text, a + i / 2, o + s / 2);
                    }
                },
            })),
            (o.MultiTooltip = o.Element.extend({
                initialize: function () {
                    (this.font = P(this.fontSize, this.fontStyle, this.fontFamily)),
                        (this.titleFont = P(this.titleFontSize, this.titleFontStyle, this.titleFontFamily)),
                        (this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + 1.5 * this.titleFontSize),
                        (this.ctx.font = this.titleFont);
                    var t = this.ctx.measureText(this.title).width,
                        e = F(this.ctx, this.font, this.labels) + this.fontSize + 3,
                        i = v([e, t]);
                    this.width = i + 2 * this.xPadding;
                    var s = this.height / 2;
                    this.y - s < 0 ? (this.y = s) : this.y + s > this.chart.height && (this.y = this.chart.height - s), this.x > this.chart.width / 2 ? (this.x -= this.xOffset + this.width) : (this.x += this.xOffset);
                },
                getLineHeight: function (t) {
                    var e = this.y - this.height / 2 + this.yPadding,
                        i = t - 1;
                    return 0 === t ? e + this.titleFontSize / 2 : e + (1.5 * this.fontSize * i + this.fontSize / 2) + 1.5 * this.titleFontSize;
                },
                draw: function () {
                    if (this.custom) this.custom(this);
                    else {
                        A(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                        var i = this.ctx;
                        (i.fillStyle = this.fillColor),
                            i.fill(),
                            i.closePath(),
                            (i.textAlign = "left"),
                            (i.textBaseline = "middle"),
                            (i.fillStyle = this.titleTextColor),
                            (i.font = this.titleFont),
                            i.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)),
                            (i.font = this.font),
                            h.each(
                                this.labels,
                                function (t, e) {
                                    (i.fillStyle = this.textColor),
                                        i.fillText(t, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(e + 1)),
                                        (i.fillStyle = this.legendColorBackground),
                                        i.fillRect(this.x + this.xPadding, this.getLineHeight(e + 1) - this.fontSize / 2, this.fontSize, this.fontSize),
                                        (i.fillStyle = this.legendColors[e].fill),
                                        i.fillRect(this.x + this.xPadding, this.getLineHeight(e + 1) - this.fontSize / 2, this.fontSize, this.fontSize);
                                },
                                this
                            );
                    }
                },
            })),
            (o.Scale = o.Element.extend({
                initialize: function () {
                    this.fit();
                },
                buildYLabels: function () {
                    this.yLabels = [];
                    for (var t = f(this.stepValue), e = 0; e <= this.steps; e++) this.yLabels.push(k(this.templateString, { value: (this.min + e * this.stepValue).toFixed(t) }));
                    this.yLabelWidth = this.display && this.showLabels ? F(this.ctx, this.font, this.yLabels) : 0;
                },
                addXLabel: function (t) {
                    this.xLabels.push(t), this.valuesCount++, this.fit();
                },
                removeXLabel: function () {
                    this.xLabels.shift(), this.valuesCount--, this.fit();
                },
                fit: function () {
                    (this.startPoint = this.display ? this.fontSize : 0), (this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height), (this.startPoint += this.padding), (this.endPoint -= this.padding);
                    var t,
                        e = this.endPoint - this.startPoint;
                    for (this.calculateYRange(e), this.buildYLabels(), this.calculateXLabelRotation(); e > this.endPoint - this.startPoint; )
                        (e = this.endPoint - this.startPoint), (t = this.yLabelWidth), this.calculateYRange(e), this.buildYLabels(), t < this.yLabelWidth && this.calculateXLabelRotation();
                },
                calculateXLabelRotation: function () {
                    this.ctx.font = this.font;
                    var t,
                        e,
                        i = this.ctx.measureText(this.xLabels[0]).width,
                        s = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
                    if (((this.xScalePaddingRight = s / 2 + 3), (this.xScalePaddingLeft = i / 2 > this.yLabelWidth + 10 ? i / 2 : this.yLabelWidth + 10), (this.xLabelRotation = 0), this.display)) {
                        var n,
                            a = F(this.ctx, this.font, this.xLabels);
                        this.xLabelWidth = a;
                        for (var o = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; (this.xLabelWidth > o && 0 === this.xLabelRotation) || (this.xLabelWidth > o && this.xLabelRotation <= 90 && 0 < this.xLabelRotation); )
                            (e = (n = Math.cos(m(this.xLabelRotation))) * s),
                                (t = n * i) + this.fontSize / 2 > this.yLabelWidth + 8 && (this.xScalePaddingLeft = t + this.fontSize / 2),
                                (this.xScalePaddingRight = this.fontSize / 2),
                                this.xLabelRotation++,
                                (this.xLabelWidth = n * a);
                        0 < this.xLabelRotation && (this.endPoint -= Math.sin(m(this.xLabelRotation)) * a + 3);
                    } else (this.xLabelWidth = 0), (this.xScalePaddingRight = this.padding), (this.xScalePaddingLeft = this.padding);
                },
                calculateYRange: s,
                drawingArea: function () {
                    return this.startPoint - this.endPoint;
                },
                calculateY: function (t) {
                    var e = this.drawingArea() / (this.min - this.max);
                    return this.endPoint - e * (t - this.min);
                },
                calculateX: function (t) {
                    var e,
                        i = (this.xLabelRotation, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)) / Math.max(this.valuesCount - (this.offsetGridLines ? 0 : 1), 1),
                        s = i * t + this.xScalePaddingLeft;
                    return this.offsetGridLines && (s += i / 2), Math.round(s);
                },
                update: function (t) {
                    h.extend(this, t), this.fit();
                },
                draw: function () {
                    var o = this.ctx,
                        a = (this.endPoint - this.startPoint) / this.steps,
                        r = Math.round(this.xScalePaddingLeft);
                    this.display &&
                        ((o.fillStyle = this.textColor),
                        (o.font = this.font),
                        u(
                            this.yLabels,
                            function (t, e) {
                                var i = this.endPoint - a * e,
                                    s = Math.round(i),
                                    n = this.showHorizontalLines;
                                (o.textAlign = "right"),
                                    (o.textBaseline = "middle"),
                                    this.showLabels && o.fillText(t, r - 10, i),
                                    0 !== e || n || (n = !0),
                                    n && o.beginPath(),
                                    (o.strokeStyle = 0 < e ? ((o.lineWidth = this.gridLineWidth), this.gridLineColor) : ((o.lineWidth = this.lineWidth), this.lineColor)),
                                    (s += h.aliasPixel(o.lineWidth)),
                                    n && (o.moveTo(r, s), o.lineTo(this.width, s), o.stroke(), o.closePath()),
                                    (o.lineWidth = this.lineWidth),
                                    (o.strokeStyle = this.lineColor),
                                    o.beginPath(),
                                    o.moveTo(r - 5, s),
                                    o.lineTo(r, s),
                                    o.stroke(),
                                    o.closePath();
                            },
                            this
                        ),
                        u(
                            this.xLabels,
                            function (t, e) {
                                var i = this.calculateX(e) + w(this.lineWidth),
                                    s = this.calculateX(e - (this.offsetGridLines ? 0.5 : 0)) + w(this.lineWidth),
                                    n = 0 < this.xLabelRotation,
                                    a = this.showVerticalLines;
                                0 !== e || a || (a = !0),
                                    a && o.beginPath(),
                                    (o.strokeStyle = 0 < e ? ((o.lineWidth = this.gridLineWidth), this.gridLineColor) : ((o.lineWidth = this.lineWidth), this.lineColor)),
                                    a && (o.moveTo(s, this.endPoint), o.lineTo(s, this.startPoint - 3), o.stroke(), o.closePath()),
                                    (o.lineWidth = this.lineWidth),
                                    (o.strokeStyle = this.lineColor),
                                    o.beginPath(),
                                    o.moveTo(s, this.endPoint),
                                    o.lineTo(s, this.endPoint + 5),
                                    o.stroke(),
                                    o.closePath(),
                                    o.save(),
                                    o.translate(i, n ? this.endPoint + 12 : this.endPoint + 8),
                                    o.rotate(-1 * m(this.xLabelRotation)),
                                    (o.font = this.font),
                                    (o.textAlign = n ? "right" : "center"),
                                    (o.textBaseline = n ? "middle" : "top"),
                                    o.fillText(t, 0, 0),
                                    o.restore();
                            },
                            this
                        ));
                },
            })),
            (o.RadialScale = o.Element.extend({
                initialize: function () {
                    (this.size = b([this.height, this.width])), (this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2);
                },
                calculateCenterOffset: function (t) {
                    var e = this.drawingArea / (this.max - this.min);
                    return (t - this.min) * e;
                },
                update: function () {
                    this.lineArc ? (this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2) : this.setScaleSize(), this.buildYLabels();
                },
                buildYLabels: function () {
                    this.yLabels = [];
                    for (var t = f(this.stepValue), e = 0; e <= this.steps; e++) this.yLabels.push(k(this.templateString, { value: (this.min + e * this.stepValue).toFixed(t) }));
                },
                getCircumference: function () {
                    return (2 * Math.PI) / this.valuesCount;
                },
                setScaleSize: function () {
                    var t,
                        e,
                        i,
                        s,
                        n,
                        a,
                        o,
                        r,
                        l,
                        d,
                        c,
                        h,
                        u = b([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]),
                        p = this.width,
                        f = 0;
                    for (this.ctx.font = P(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), e = 0; e < this.valuesCount; e++)
                        (t = this.getPointPosition(e, u)),
                            (i = this.ctx.measureText(k(this.templateString, { value: this.labels[e] })).width + 5),
                            0 === e || e === this.valuesCount / 2
                                ? ((s = i / 2), t.x + s > p && ((p = t.x + s), (n = e)), t.x - s < f && ((f = t.x - s), (o = e)))
                                : e < this.valuesCount / 2
                                ? t.x + i > p && ((p = t.x + i), (n = e))
                                : e > this.valuesCount / 2 && t.x - i < f && ((f = t.x - i), (o = e));
                    (l = f),
                        (d = Math.ceil(p - this.width)),
                        (a = this.getIndexAngle(n)),
                        (r = this.getIndexAngle(o)),
                        (c = d / Math.sin(a + Math.PI / 2)),
                        (h = l / Math.sin(r + Math.PI / 2)),
                        (c = g(c) ? c : 0),
                        (h = g(h) ? h : 0),
                        (this.drawingArea = u - (h + c) / 2),
                        this.setCenterPoint(h, c);
                },
                setCenterPoint: function (t, e) {
                    var i = this.width - e - this.drawingArea,
                        s = t + this.drawingArea;
                    (this.xCenter = (s + i) / 2), (this.yCenter = this.height / 2);
                },
                getIndexAngle: function (t) {
                    var e;
                    return t * ((2 * Math.PI) / this.valuesCount) - Math.PI / 2;
                },
                getPointPosition: function (t, e) {
                    var i = this.getIndexAngle(t);
                    return { x: Math.cos(i) * e + this.xCenter, y: Math.sin(i) * e + this.yCenter };
                },
                draw: function () {
                    if (this.display) {
                        var r = this.ctx;
                        if (
                            (u(
                                this.yLabels,
                                function (t, e) {
                                    if (0 < e) {
                                        var i,
                                            s = e * (this.drawingArea / this.steps),
                                            n = this.yCenter - s;
                                        if (0 < this.lineWidth)
                                            if (((r.strokeStyle = this.lineColor), (r.lineWidth = this.lineWidth), this.lineArc)) r.beginPath(), r.arc(this.xCenter, this.yCenter, s, 0, 2 * Math.PI), r.closePath(), r.stroke();
                                            else {
                                                r.beginPath();
                                                for (var a = 0; a < this.valuesCount; a++) (i = this.getPointPosition(a, this.calculateCenterOffset(this.min + e * this.stepValue))), 0 === a ? r.moveTo(i.x, i.y) : r.lineTo(i.x, i.y);
                                                r.closePath(), r.stroke();
                                            }
                                        if (this.showLabels) {
                                            if (((r.font = P(this.fontSize, this.fontStyle, this.fontFamily)), this.showLabelBackdrop)) {
                                                var o = r.measureText(t).width;
                                                (r.fillStyle = this.backdropColor),
                                                    r.fillRect(this.xCenter - o / 2 - this.backdropPaddingX, n - this.fontSize / 2 - this.backdropPaddingY, o + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY);
                                            }
                                            (r.textAlign = "center"), (r.textBaseline = "middle"), (r.fillStyle = this.fontColor), r.fillText(t, this.xCenter, n);
                                        }
                                    }
                                },
                                this
                            ),
                            !this.lineArc)
                        ) {
                            (r.lineWidth = this.angleLineWidth), (r.strokeStyle = this.angleLineColor);
                            for (var t = this.valuesCount - 1; 0 <= t; t--) {
                                if (0 < this.angleLineWidth) {
                                    var e = this.getPointPosition(t, this.calculateCenterOffset(this.max));
                                    r.beginPath(), r.moveTo(this.xCenter, this.yCenter), r.lineTo(e.x, e.y), r.stroke(), r.closePath();
                                }
                                var i = this.getPointPosition(t, this.calculateCenterOffset(this.max) + 5);
                                (r.font = P(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily)), (r.fillStyle = this.pointLabelFontColor);
                                var s = this.labels.length,
                                    n = this.labels.length / 2,
                                    a = n / 2,
                                    o = t < a || s - a < t,
                                    l = t === a || t === s - a;
                                (r.textAlign = 0 === t ? "center" : t === n ? "center" : t < n ? "left" : "right"), (r.textBaseline = l ? "middle" : o ? "bottom" : "top"), r.fillText(this.labels[t], i.x, i.y);
                            }
                        }
                    }
                },
            })),
            h.addEvent(window, "resize", function () {
                clearTimeout(z),
                    (z = setTimeout(function () {
                        u(o.instances, function (t) {
                            t.options.responsive && t.resize(t.render, !0);
                        });
                    }, 50));
            }),
            i
                ? define(function () {
                      return o;
                  })
                : "object" == typeof module && module.exports && (module.exports = o),
            ((t.Chart = o).noConflict = function () {
                return (t.Chart = e), o;
            });
    }.call(this),
    function () {
        "use strict";
        var t,
            e = this.Chart,
            r = e.helpers,
            i = {
                scaleBeginAtZero: !0,
                scaleShowGridLines: !0,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: !0,
                scaleShowVerticalLines: !0,
                barShowStroke: !0,
                barStrokeWidth: 2,
                barValueSpacing: 5,
                barDatasetSpacing: 1,
                legendTemplate:
                    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
            };
        e.Type.extend({
            name: "Bar",
            defaults: i,
            initialize: function (n) {
                var o = this.options;
                (this.ScaleClass = e.Scale.extend({
                    offsetGridLines: !0,
                    calculateBarX: function (t, e, i) {
                        var s = this.calculateBaseWidth(),
                            n = this.calculateX(i) - s / 2,
                            a = this.calculateBarWidth(t);
                        return n + a * e + e * o.barDatasetSpacing + a / 2;
                    },
                    calculateBaseWidth: function () {
                        return this.calculateX(1) - this.calculateX(0) - 2 * o.barValueSpacing;
                    },
                    calculateBarWidth: function (t) {
                        var e;
                        return (this.calculateBaseWidth() - (t - 1) * o.barDatasetSpacing) / t;
                    },
                })),
                    (this.datasets = []),
                    this.options.showTooltips &&
                        r.bindEvents(this, this.options.tooltipEvents, function (t) {
                            var e = "mouseout" !== t.type ? this.getBarsAtEvent(t) : [];
                            this.eachBars(function (t) {
                                t.restore(["fillColor", "strokeColor"]);
                            }),
                                r.each(e, function (t) {
                                    (t.fillColor = t.highlightFill), (t.strokeColor = t.highlightStroke);
                                }),
                                this.showTooltip(e);
                        }),
                    (this.BarClass = e.Rectangle.extend({ strokeWidth: this.options.barStrokeWidth, showStroke: this.options.barShowStroke, ctx: this.chart.ctx })),
                    r.each(
                        n.datasets,
                        function (i) {
                            var s = { label: i.label || null, fillColor: i.fillColor, strokeColor: i.strokeColor, bars: [] };
                            this.datasets.push(s),
                                r.each(
                                    i.data,
                                    function (t, e) {
                                        s.bars.push(
                                            new this.BarClass({
                                                value: t,
                                                label: n.labels[e],
                                                datasetLabel: i.label,
                                                strokeColor: i.strokeColor,
                                                fillColor: i.fillColor,
                                                highlightFill: i.highlightFill || i.fillColor,
                                                highlightStroke: i.highlightStroke || i.strokeColor,
                                            })
                                        );
                                    },
                                    this
                                );
                        },
                        this
                    ),
                    this.buildScale(n.labels),
                    (this.BarClass.prototype.base = this.scale.endPoint),
                    this.eachBars(function (t, e, i) {
                        r.extend(t, { width: this.scale.calculateBarWidth(this.datasets.length), x: this.scale.calculateBarX(this.datasets.length, i, e), y: this.scale.endPoint }), t.save();
                    }, this),
                    this.render();
            },
            update: function () {
                this.scale.update(),
                    r.each(this.activeElements, function (t) {
                        t.restore(["fillColor", "strokeColor"]);
                    }),
                    this.eachBars(function (t) {
                        t.save();
                    }),
                    this.render();
            },
            eachBars: function (i) {
                r.each(
                    this.datasets,
                    function (t, e) {
                        r.each(t.bars, i, this, e);
                    },
                    this
                );
            },
            getBarsAtEvent: function (t) {
                for (
                    var e,
                        i = [],
                        s = r.getRelativePosition(t),
                        n = function (t) {
                            i.push(t.bars[e]);
                        },
                        a = 0;
                    a < this.datasets.length;
                    a++
                )
                    for (e = 0; e < this.datasets[a].bars.length; e++) if (this.datasets[a].bars[e].inRange(s.x, s.y)) return r.each(this.datasets, n), i;
                return i;
            },
            buildScale: function (t) {
                var i = this,
                    s = function () {
                        var e = [];
                        return (
                            i.eachBars(function (t) {
                                e.push(t.value);
                            }),
                            e
                        );
                    },
                    e = {
                        templateString: this.options.scaleLabel,
                        height: this.chart.height,
                        width: this.chart.width,
                        ctx: this.chart.ctx,
                        textColor: this.options.scaleFontColor,
                        fontSize: this.options.scaleFontSize,
                        fontStyle: this.options.scaleFontStyle,
                        fontFamily: this.options.scaleFontFamily,
                        valuesCount: t.length,
                        beginAtZero: this.options.scaleBeginAtZero,
                        integersOnly: this.options.scaleIntegersOnly,
                        calculateYRange: function (t) {
                            var e = r.calculateScaleRange(s(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                            r.extend(this, e);
                        },
                        xLabels: t,
                        font: r.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                        lineWidth: this.options.scaleLineWidth,
                        lineColor: this.options.scaleLineColor,
                        showHorizontalLines: this.options.scaleShowHorizontalLines,
                        showVerticalLines: this.options.scaleShowVerticalLines,
                        gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                        gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                        padding: this.options.showScale ? 0 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                        showLabels: this.options.scaleShowLabels,
                        display: this.options.showScale,
                    };
                this.options.scaleOverride &&
                    r.extend(e, {
                        calculateYRange: r.noop,
                        steps: this.options.scaleSteps,
                        stepValue: this.options.scaleStepWidth,
                        min: this.options.scaleStartValue,
                        max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth,
                    }),
                    (this.scale = new this.ScaleClass(e));
            },
            addData: function (t, i) {
                r.each(
                    t,
                    function (t, e) {
                        this.datasets[e].bars.push(
                            new this.BarClass({
                                value: t,
                                label: i,
                                x: this.scale.calculateBarX(this.datasets.length, e, this.scale.valuesCount + 1),
                                y: this.scale.endPoint,
                                width: this.scale.calculateBarWidth(this.datasets.length),
                                base: this.scale.endPoint,
                                strokeColor: this.datasets[e].strokeColor,
                                fillColor: this.datasets[e].fillColor,
                            })
                        );
                    },
                    this
                ),
                    this.scale.addXLabel(i),
                    this.update();
            },
            removeData: function () {
                this.scale.removeXLabel(),
                    r.each(
                        this.datasets,
                        function (t) {
                            t.bars.shift();
                        },
                        this
                    ),
                    this.update();
            },
            reflow: function () {
                r.extend(this.BarClass.prototype, { y: this.scale.endPoint, base: this.scale.endPoint });
                var t = r.extend({ height: this.chart.height, width: this.chart.width });
                this.scale.update(t);
            },
            draw: function (t) {
                var s = t || 1;
                this.clear(),
                    this.chart.ctx,
                    this.scale.draw(s),
                    r.each(
                        this.datasets,
                        function (t, i) {
                            r.each(
                                t.bars,
                                function (t, e) {
                                    t.hasValue() &&
                                        ((t.base = this.scale.endPoint),
                                        t.transition({ x: this.scale.calculateBarX(this.datasets.length, i, e), y: this.scale.calculateY(t.value), width: this.scale.calculateBarWidth(this.datasets.length) }, s).draw());
                                },
                                this
                            );
                        },
                        this
                    );
            },
        });
    }.call(this),
    function () {
        "use strict";
        var t,
            e = this.Chart,
            s = e.helpers,
            i = {
                segmentShowStroke: !0,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 2,
                percentageInnerCutout: 50,
                animationSteps: 100,
                animationEasing: "easeOutBounce",
                animateRotate: !0,
                animateScale: !1,
                legendTemplate:
                    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
            };
        e.Type.extend({
            name: "Doughnut",
            defaults: i,
            initialize: function (t) {
                (this.segments = []),
                    (this.outerRadius = (s.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2),
                    (this.SegmentArc = e.Arc.extend({ ctx: this.chart.ctx, x: this.chart.width / 2, y: this.chart.height / 2 })),
                    this.options.showTooltips &&
                        s.bindEvents(this, this.options.tooltipEvents, function (t) {
                            var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                            s.each(this.segments, function (t) {
                                t.restore(["fillColor"]);
                            }),
                                s.each(e, function (t) {
                                    t.fillColor = t.highlightColor;
                                }),
                                this.showTooltip(e);
                        }),
                    this.calculateTotal(t),
                    s.each(
                        t,
                        function (t, e) {
                            this.addData(t, e, !0);
                        },
                        this
                    ),
                    this.render();
            },
            getSegmentsAtEvent: function (t) {
                var e = [],
                    i = s.getRelativePosition(t);
                return (
                    s.each(
                        this.segments,
                        function (t) {
                            t.inRange(i.x, i.y) && e.push(t);
                        },
                        this
                    ),
                    e
                );
            },
            addData: function (t, e, i) {
                var s = e || this.segments.length;
                this.segments.splice(
                    s,
                    0,
                    new this.SegmentArc({
                        value: t.value,
                        outerRadius: this.options.animateScale ? 0 : this.outerRadius,
                        innerRadius: this.options.animateScale ? 0 : (this.outerRadius / 100) * this.options.percentageInnerCutout,
                        fillColor: t.color,
                        highlightColor: t.highlight || t.color,
                        showStroke: this.options.segmentShowStroke,
                        strokeWidth: this.options.segmentStrokeWidth,
                        strokeColor: this.options.segmentStrokeColor,
                        startAngle: 1.5 * Math.PI,
                        circumference: this.options.animateRotate ? 0 : this.calculateCircumference(t.value),
                        label: t.label,
                    })
                ),
                    i || (this.reflow(), this.update());
            },
            calculateCircumference: function (t) {
                return 2 * Math.PI * (Math.abs(t) / this.total);
            },
            calculateTotal: function (t) {
                (this.total = 0),
                    s.each(
                        t,
                        function (t) {
                            this.total += Math.abs(t.value);
                        },
                        this
                    );
            },
            update: function () {
                this.calculateTotal(this.segments),
                    s.each(this.activeElements, function (t) {
                        t.restore(["fillColor"]);
                    }),
                    s.each(this.segments, function (t) {
                        t.save();
                    }),
                    this.render();
            },
            removeData: function (t) {
                var e = s.isNumber(t) ? t : this.segments.length - 1;
                this.segments.splice(e, 1), this.reflow(), this.update();
            },
            reflow: function () {
                s.extend(this.SegmentArc.prototype, { x: this.chart.width / 2, y: this.chart.height / 2 }),
                    (this.outerRadius = (s.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2),
                    s.each(
                        this.segments,
                        function (t) {
                            t.update({ outerRadius: this.outerRadius, innerRadius: (this.outerRadius / 100) * this.options.percentageInnerCutout });
                        },
                        this
                    );
            },
            draw: function (t) {
                var i = t || 1;
                this.clear(),
                    s.each(
                        this.segments,
                        function (t, e) {
                            t.transition({ circumference: this.calculateCircumference(t.value), outerRadius: this.outerRadius, innerRadius: (this.outerRadius / 100) * this.options.percentageInnerCutout }, i),
                                (t.endAngle = t.startAngle + t.circumference),
                                t.draw(),
                                0 === e && (t.startAngle = 1.5 * Math.PI),
                                e < this.segments.length - 1 && (this.segments[e + 1].startAngle = t.endAngle);
                        },
                        this
                    );
            },
        }),
            e.types.Doughnut.extend({ name: "Pie", defaults: s.merge(i, { percentageInnerCutout: 0 }) });
    }.call(this),
    function () {
        "use strict";
        var t,
            a = this.Chart,
            l = a.helpers,
            e = {
                scaleShowGridLines: !0,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: !0,
                scaleShowVerticalLines: !0,
                bezierCurve: !0,
                bezierCurveTension: 0.4,
                pointDot: !0,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: !0,
                datasetStrokeWidth: 2,
                datasetFill: !0,
                legendTemplate:
                    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
            };
        a.Type.extend({
            name: "Line",
            defaults: e,
            initialize: function (n) {
                (this.PointClass = a.Point.extend({
                    strokeWidth: this.options.pointDotStrokeWidth,
                    radius: this.options.pointDotRadius,
                    display: this.options.pointDot,
                    hitDetectionRadius: this.options.pointHitDetectionRadius,
                    ctx: this.chart.ctx,
                    inRange: function (t) {
                        return Math.pow(t - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2);
                    },
                })),
                    (this.datasets = []),
                    this.options.showTooltips &&
                        l.bindEvents(this, this.options.tooltipEvents, function (t) {
                            var e = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                            this.eachPoints(function (t) {
                                t.restore(["fillColor", "strokeColor"]);
                            }),
                                l.each(e, function (t) {
                                    (t.fillColor = t.highlightFill), (t.strokeColor = t.highlightStroke);
                                }),
                                this.showTooltip(e);
                        }),
                    l.each(
                        n.datasets,
                        function (i) {
                            var s = { label: i.label || null, fillColor: i.fillColor, strokeColor: i.strokeColor, pointColor: i.pointColor, pointStrokeColor: i.pointStrokeColor, points: [] };
                            this.datasets.push(s),
                                l.each(
                                    i.data,
                                    function (t, e) {
                                        s.points.push(
                                            new this.PointClass({
                                                value: t,
                                                label: n.labels[e],
                                                datasetLabel: i.label,
                                                strokeColor: i.pointStrokeColor,
                                                fillColor: i.pointColor,
                                                highlightFill: i.pointHighlightFill || i.pointColor,
                                                highlightStroke: i.pointHighlightStroke || i.pointStrokeColor,
                                            })
                                        );
                                    },
                                    this
                                ),
                                this.buildScale(n.labels),
                                this.eachPoints(function (t, e) {
                                    l.extend(t, { x: this.scale.calculateX(e), y: this.scale.endPoint }), t.save();
                                }, this);
                        },
                        this
                    ),
                    this.render();
            },
            update: function () {
                this.scale.update(),
                    l.each(this.activeElements, function (t) {
                        t.restore(["fillColor", "strokeColor"]);
                    }),
                    this.eachPoints(function (t) {
                        t.save();
                    }),
                    this.render();
            },
            eachPoints: function (e) {
                l.each(
                    this.datasets,
                    function (t) {
                        l.each(t.points, e, this);
                    },
                    this
                );
            },
            getPointsAtEvent: function (t) {
                var e = [],
                    i = l.getRelativePosition(t);
                return (
                    l.each(
                        this.datasets,
                        function (t) {
                            l.each(t.points, function (t) {
                                t.inRange(i.x, i.y) && e.push(t);
                            });
                        },
                        this
                    ),
                    e
                );
            },
            buildScale: function (t) {
                var i = this,
                    s = function () {
                        var e = [];
                        return (
                            i.eachPoints(function (t) {
                                e.push(t.value);
                            }),
                            e
                        );
                    },
                    e = {
                        templateString: this.options.scaleLabel,
                        height: this.chart.height,
                        width: this.chart.width,
                        ctx: this.chart.ctx,
                        textColor: this.options.scaleFontColor,
                        fontSize: this.options.scaleFontSize,
                        fontStyle: this.options.scaleFontStyle,
                        fontFamily: this.options.scaleFontFamily,
                        valuesCount: t.length,
                        beginAtZero: this.options.scaleBeginAtZero,
                        integersOnly: this.options.scaleIntegersOnly,
                        calculateYRange: function (t) {
                            var e = l.calculateScaleRange(s(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                            l.extend(this, e);
                        },
                        xLabels: t,
                        font: l.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                        lineWidth: this.options.scaleLineWidth,
                        lineColor: this.options.scaleLineColor,
                        showHorizontalLines: this.options.scaleShowHorizontalLines,
                        showVerticalLines: this.options.scaleShowVerticalLines,
                        gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                        gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                        padding: this.options.showScale ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                        showLabels: this.options.scaleShowLabels,
                        display: this.options.showScale,
                    };
                this.options.scaleOverride &&
                    l.extend(e, {
                        calculateYRange: l.noop,
                        steps: this.options.scaleSteps,
                        stepValue: this.options.scaleStepWidth,
                        min: this.options.scaleStartValue,
                        max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth,
                    }),
                    (this.scale = new a.Scale(e));
            },
            addData: function (t, i) {
                l.each(
                    t,
                    function (t, e) {
                        this.datasets[e].points.push(
                            new this.PointClass({ value: t, label: i, x: this.scale.calculateX(this.scale.valuesCount + 1), y: this.scale.endPoint, strokeColor: this.datasets[e].pointStrokeColor, fillColor: this.datasets[e].pointColor })
                        );
                    },
                    this
                ),
                    this.scale.addXLabel(i),
                    this.update();
            },
            removeData: function () {
                this.scale.removeXLabel(),
                    l.each(
                        this.datasets,
                        function (t) {
                            t.points.shift();
                        },
                        this
                    ),
                    this.update();
            },
            reflow: function () {
                var t = l.extend({ height: this.chart.height, width: this.chart.width });
                this.scale.update(t);
            },
            draw: function (t) {
                var i = t || 1;
                this.clear();
                var n = this.chart.ctx,
                    a = function (t) {
                        return null !== t.value;
                    },
                    o = function (t, e, i) {
                        return l.findNextWhere(e, a, i) || t;
                    },
                    r = function (t, e, i) {
                        return l.findPreviousWhere(e, a, i) || t;
                    };
                this.scale.draw(i),
                    l.each(
                        this.datasets,
                        function (t) {
                            var s = l.where(t.points, a);
                            l.each(
                                t.points,
                                function (t, e) {
                                    t.hasValue() && t.transition({ y: this.scale.calculateY(t.value), x: this.scale.calculateX(e) }, i);
                                },
                                this
                            ),
                                this.options.bezierCurve &&
                                    l.each(
                                        s,
                                        function (t, e) {
                                            var i = 0 < e && e < s.length - 1 ? this.options.bezierCurveTension : 0;
                                            (t.controlPoints = l.splineCurve(r(t, s, e), t, o(t, s, e), i)),
                                                t.controlPoints.outer.y > this.scale.endPoint
                                                    ? (t.controlPoints.outer.y = this.scale.endPoint)
                                                    : t.controlPoints.outer.y < this.scale.startPoint && (t.controlPoints.outer.y = this.scale.startPoint),
                                                t.controlPoints.inner.y > this.scale.endPoint
                                                    ? (t.controlPoints.inner.y = this.scale.endPoint)
                                                    : t.controlPoints.inner.y < this.scale.startPoint && (t.controlPoints.inner.y = this.scale.startPoint);
                                        },
                                        this
                                    ),
                                (n.lineWidth = this.options.datasetStrokeWidth),
                                (n.strokeStyle = t.strokeColor),
                                n.beginPath(),
                                l.each(
                                    s,
                                    function (t, e) {
                                        if (0 === e) n.moveTo(t.x, t.y);
                                        else if (this.options.bezierCurve) {
                                            var i = r(t, s, e);
                                            n.bezierCurveTo(i.controlPoints.outer.x, i.controlPoints.outer.y, t.controlPoints.inner.x, t.controlPoints.inner.y, t.x, t.y);
                                        } else n.lineTo(t.x, t.y);
                                    },
                                    this
                                ),
                                n.stroke(),
                                this.options.datasetFill && 0 < s.length && (n.lineTo(s[s.length - 1].x, this.scale.endPoint), n.lineTo(s[0].x, this.scale.endPoint), (n.fillStyle = t.fillColor), n.closePath(), n.fill()),
                                l.each(s, function (t) {
                                    t.draw();
                                });
                        },
                        this
                    );
            },
        });
    }.call(this),
    function () {
        "use strict";
        var t,
            e = this.Chart,
            s = e.helpers,
            i = {
                scaleShowLabelBackdrop: !0,
                scaleBackdropColor: "rgba(255,255,255,0.75)",
                scaleBeginAtZero: !0,
                scaleBackdropPaddingY: 2,
                scaleBackdropPaddingX: 2,
                scaleShowLine: !0,
                segmentShowStroke: !0,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 2,
                animationSteps: 100,
                animationEasing: "easeOutBounce",
                animateRotate: !0,
                animateScale: !1,
                legendTemplate:
                    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
            };
        e.Type.extend({
            name: "PolarArea",
            defaults: i,
            initialize: function (t) {
                (this.segments = []),
                    (this.SegmentArc = e.Arc.extend({
                        showStroke: this.options.segmentShowStroke,
                        strokeWidth: this.options.segmentStrokeWidth,
                        strokeColor: this.options.segmentStrokeColor,
                        ctx: this.chart.ctx,
                        innerRadius: 0,
                        x: this.chart.width / 2,
                        y: this.chart.height / 2,
                    })),
                    (this.scale = new e.RadialScale({
                        display: this.options.showScale,
                        fontStyle: this.options.scaleFontStyle,
                        fontSize: this.options.scaleFontSize,
                        fontFamily: this.options.scaleFontFamily,
                        fontColor: this.options.scaleFontColor,
                        showLabels: this.options.scaleShowLabels,
                        showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                        backdropColor: this.options.scaleBackdropColor,
                        backdropPaddingY: this.options.scaleBackdropPaddingY,
                        backdropPaddingX: this.options.scaleBackdropPaddingX,
                        lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                        lineColor: this.options.scaleLineColor,
                        lineArc: !0,
                        width: this.chart.width,
                        height: this.chart.height,
                        xCenter: this.chart.width / 2,
                        yCenter: this.chart.height / 2,
                        ctx: this.chart.ctx,
                        templateString: this.options.scaleLabel,
                        valuesCount: t.length,
                    })),
                    this.updateScaleRange(t),
                    this.scale.update(),
                    s.each(
                        t,
                        function (t, e) {
                            this.addData(t, e, !0);
                        },
                        this
                    ),
                    this.options.showTooltips &&
                        s.bindEvents(this, this.options.tooltipEvents, function (t) {
                            var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                            s.each(this.segments, function (t) {
                                t.restore(["fillColor"]);
                            }),
                                s.each(e, function (t) {
                                    t.fillColor = t.highlightColor;
                                }),
                                this.showTooltip(e);
                        }),
                    this.render();
            },
            getSegmentsAtEvent: function (t) {
                var e = [],
                    i = s.getRelativePosition(t);
                return (
                    s.each(
                        this.segments,
                        function (t) {
                            t.inRange(i.x, i.y) && e.push(t);
                        },
                        this
                    ),
                    e
                );
            },
            addData: function (t, e, i) {
                var s = e || this.segments.length;
                this.segments.splice(
                    s,
                    0,
                    new this.SegmentArc({
                        fillColor: t.color,
                        highlightColor: t.highlight || t.color,
                        label: t.label,
                        value: t.value,
                        outerRadius: this.options.animateScale ? 0 : this.scale.calculateCenterOffset(t.value),
                        circumference: this.options.animateRotate ? 0 : this.scale.getCircumference(),
                        startAngle: 1.5 * Math.PI,
                    })
                ),
                    i || (this.reflow(), this.update());
            },
            removeData: function (t) {
                var e = s.isNumber(t) ? t : this.segments.length - 1;
                this.segments.splice(e, 1), this.reflow(), this.update();
            },
            calculateTotal: function (t) {
                (this.total = 0),
                    s.each(
                        t,
                        function (t) {
                            this.total += t.value;
                        },
                        this
                    ),
                    (this.scale.valuesCount = this.segments.length);
            },
            updateScaleRange: function (t) {
                var e = [];
                s.each(t, function (t) {
                    e.push(t.value);
                });
                var i = this.options.scaleOverride
                    ? { steps: this.options.scaleSteps, stepValue: this.options.scaleStepWidth, min: this.options.scaleStartValue, max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth }
                    : s.calculateScaleRange(e, s.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
                s.extend(this.scale, i, { size: s.min([this.chart.width, this.chart.height]), xCenter: this.chart.width / 2, yCenter: this.chart.height / 2 });
            },
            update: function () {
                this.calculateTotal(this.segments),
                    s.each(this.segments, function (t) {
                        t.save();
                    }),
                    this.reflow(),
                    this.render();
            },
            reflow: function () {
                s.extend(this.SegmentArc.prototype, { x: this.chart.width / 2, y: this.chart.height / 2 }),
                    this.updateScaleRange(this.segments),
                    this.scale.update(),
                    s.extend(this.scale, { xCenter: this.chart.width / 2, yCenter: this.chart.height / 2 }),
                    s.each(
                        this.segments,
                        function (t) {
                            t.update({ outerRadius: this.scale.calculateCenterOffset(t.value) });
                        },
                        this
                    );
            },
            draw: function (t) {
                var i = t || 1;
                this.clear(),
                    s.each(
                        this.segments,
                        function (t, e) {
                            t.transition({ circumference: this.scale.getCircumference(), outerRadius: this.scale.calculateCenterOffset(t.value) }, i),
                                (t.endAngle = t.startAngle + t.circumference),
                                0 === e && (t.startAngle = 1.5 * Math.PI),
                                e < this.segments.length - 1 && (this.segments[e + 1].startAngle = t.endAngle),
                                t.draw();
                        },
                        this
                    ),
                    this.scale.draw();
            },
        });
    }.call(this),
    function () {
        "use strict";
        var t,
            e = this.Chart,
            o = e.helpers;
        e.Type.extend({
            name: "Radar",
            defaults: {
                scaleShowLine: !0,
                angleShowLineOut: !0,
                scaleShowLabels: !1,
                scaleBeginAtZero: !0,
                angleLineColor: "rgba(0,0,0,.1)",
                angleLineWidth: 1,
                pointLabelFontFamily: "'Arial'",
                pointLabelFontStyle: "normal",
                pointLabelFontSize: 10,
                pointLabelFontColor: "#666",
                pointDot: !0,
                pointDotRadius: 3,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: !0,
                datasetStrokeWidth: 2,
                datasetFill: !0,
                legendTemplate:
                    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
            },
            initialize: function (a) {
                (this.PointClass = e.Point.extend({
                    strokeWidth: this.options.pointDotStrokeWidth,
                    radius: this.options.pointDotRadius,
                    display: this.options.pointDot,
                    hitDetectionRadius: this.options.pointHitDetectionRadius,
                    ctx: this.chart.ctx,
                })),
                    (this.datasets = []),
                    this.buildScale(a),
                    this.options.showTooltips &&
                        o.bindEvents(this, this.options.tooltipEvents, function (t) {
                            var e = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                            this.eachPoints(function (t) {
                                t.restore(["fillColor", "strokeColor"]);
                            }),
                                o.each(e, function (t) {
                                    (t.fillColor = t.highlightFill), (t.strokeColor = t.highlightStroke);
                                }),
                                this.showTooltip(e);
                        }),
                    o.each(
                        a.datasets,
                        function (s) {
                            var n = { label: s.label || null, fillColor: s.fillColor, strokeColor: s.strokeColor, pointColor: s.pointColor, pointStrokeColor: s.pointStrokeColor, points: [] };
                            this.datasets.push(n),
                                o.each(
                                    s.data,
                                    function (t, e) {
                                        var i;
                                        this.scale.animation || (i = this.scale.getPointPosition(e, this.scale.calculateCenterOffset(t))),
                                            n.points.push(
                                                new this.PointClass({
                                                    value: t,
                                                    label: a.labels[e],
                                                    datasetLabel: s.label,
                                                    x: this.options.animation ? this.scale.xCenter : i.x,
                                                    y: this.options.animation ? this.scale.yCenter : i.y,
                                                    strokeColor: s.pointStrokeColor,
                                                    fillColor: s.pointColor,
                                                    highlightFill: s.pointHighlightFill || s.pointColor,
                                                    highlightStroke: s.pointHighlightStroke || s.pointStrokeColor,
                                                })
                                            );
                                    },
                                    this
                                );
                        },
                        this
                    ),
                    this.render();
            },
            eachPoints: function (e) {
                o.each(
                    this.datasets,
                    function (t) {
                        o.each(t.points, e, this);
                    },
                    this
                );
            },
            getPointsAtEvent: function (t) {
                var e = o.getRelativePosition(t),
                    i = o.getAngleFromPoint({ x: this.scale.xCenter, y: this.scale.yCenter }, e),
                    s = (2 * Math.PI) / this.scale.valuesCount,
                    n = Math.round((i.angle - 1.5 * Math.PI) / s),
                    a = [];
                return (
                    (n >= this.scale.valuesCount || n < 0) && (n = 0),
                    i.distance <= this.scale.drawingArea &&
                        o.each(this.datasets, function (t) {
                            a.push(t.points[n]);
                        }),
                    a
                );
            },
            buildScale: function (t) {
                (this.scale = new e.RadialScale({
                    display: this.options.showScale,
                    fontStyle: this.options.scaleFontStyle,
                    fontSize: this.options.scaleFontSize,
                    fontFamily: this.options.scaleFontFamily,
                    fontColor: this.options.scaleFontColor,
                    showLabels: this.options.scaleShowLabels,
                    showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                    backdropColor: this.options.scaleBackdropColor,
                    backdropPaddingY: this.options.scaleBackdropPaddingY,
                    backdropPaddingX: this.options.scaleBackdropPaddingX,
                    lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                    lineColor: this.options.scaleLineColor,
                    angleLineColor: this.options.angleLineColor,
                    angleLineWidth: this.options.angleShowLineOut ? this.options.angleLineWidth : 0,
                    pointLabelFontColor: this.options.pointLabelFontColor,
                    pointLabelFontSize: this.options.pointLabelFontSize,
                    pointLabelFontFamily: this.options.pointLabelFontFamily,
                    pointLabelFontStyle: this.options.pointLabelFontStyle,
                    height: this.chart.height,
                    width: this.chart.width,
                    xCenter: this.chart.width / 2,
                    yCenter: this.chart.height / 2,
                    ctx: this.chart.ctx,
                    templateString: this.options.scaleLabel,
                    labels: t.labels,
                    valuesCount: t.datasets[0].data.length,
                })),
                    this.scale.setScaleSize(),
                    this.updateScaleRange(t.datasets),
                    this.scale.buildYLabels();
            },
            updateScaleRange: function (t) {
                var e =
                        ((s = []),
                        o.each(t, function (t) {
                            t.data
                                ? (s = s.concat(t.data))
                                : o.each(t.points, function (t) {
                                      s.push(t.value);
                                  });
                        }),
                        s),
                    i = this.options.scaleOverride
                        ? { steps: this.options.scaleSteps, stepValue: this.options.scaleStepWidth, min: this.options.scaleStartValue, max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth }
                        : o.calculateScaleRange(e, o.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly),
                    s;
                o.extend(this.scale, i);
            },
            addData: function (t, s) {
                this.scale.valuesCount++,
                    o.each(
                        t,
                        function (t, e) {
                            var i = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(t));
                            this.datasets[e].points.push(new this.PointClass({ value: t, label: s, x: i.x, y: i.y, strokeColor: this.datasets[e].pointStrokeColor, fillColor: this.datasets[e].pointColor }));
                        },
                        this
                    ),
                    this.scale.labels.push(s),
                    this.reflow(),
                    this.update();
            },
            removeData: function () {
                this.scale.valuesCount--,
                    this.scale.labels.shift(),
                    o.each(
                        this.datasets,
                        function (t) {
                            t.points.shift();
                        },
                        this
                    ),
                    this.reflow(),
                    this.update();
            },
            update: function () {
                this.eachPoints(function (t) {
                    t.save();
                }),
                    this.reflow(),
                    this.render();
            },
            reflow: function () {
                o.extend(this.scale, { width: this.chart.width, height: this.chart.height, size: o.min([this.chart.width, this.chart.height]), xCenter: this.chart.width / 2, yCenter: this.chart.height / 2 }),
                    this.updateScaleRange(this.datasets),
                    this.scale.setScaleSize(),
                    this.scale.buildYLabels();
            },
            draw: function (t) {
                var i = t || 1,
                    s = this.chart.ctx;
                this.clear(),
                    this.scale.draw(),
                    o.each(
                        this.datasets,
                        function (t) {
                            o.each(
                                t.points,
                                function (t, e) {
                                    t.hasValue() && t.transition(this.scale.getPointPosition(e, this.scale.calculateCenterOffset(t.value)), i);
                                },
                                this
                            ),
                                (s.lineWidth = this.options.datasetStrokeWidth),
                                (s.strokeStyle = t.strokeColor),
                                s.beginPath(),
                                o.each(
                                    t.points,
                                    function (t, e) {
                                        0 === e ? s.moveTo(t.x, t.y) : s.lineTo(t.x, t.y);
                                    },
                                    this
                                ),
                                s.closePath(),
                                s.stroke(),
                                (s.fillStyle = t.fillColor),
                                s.fill(),
                                o.each(t.points, function (t) {
                                    t.hasValue() && t.draw();
                                });
                        },
                        this
                    );
            },
        });
    }.call(this),
    void 0 === psLib)
)
    var psLib = {};
if (
    ((psLib.DataGrid = function (t) {
        $(".ps-datagrid", t).each(function () {
            var t = $(this),
                e = $(".ps-datagrid").index(this);
            if (void 0 !== t.data("guideinitialized") && "null" != typeof t.data("guideinitialized")) {
                if ("false" != t.data("guideinitialized")) return;
                t.next().remove();
            }
            psLib.DataGridInit(this, e), t.data("guideinitialized", "true");
        });
    }),
    (psLib.DataGridInit = function (t, e) {
        var i = void 0 !== (t = $(t)).data("datagridid") ? t.data("datagridid") : "ps-datagrid-" + e,
            s = {};
        void 0 !== t.data("width") && (s.width = t.data("width")),
            void 0 !== t.data("height") && (s.height = t.data("height")),
            void 0 !== t.data("heading") && (s.heading = t.data("heading")),
            void 0 !== t.data("filtering") && (s.filtering = t.data("filtering")),
            void 0 !== t.data("inserting") && (s.inserting = t.data("inserting")),
            void 0 !== t.data("editing") && (s.editing = t.data("editing")),
            void 0 !== t.data("selecting") && (s.selecting = t.data("selecting")),
            void 0 !== t.data("sorting") && (s.sorting = t.data("sorting")),
            void 0 !== t.data("paging") && (s.paging = t.data("paging")),
            void 0 !== t.data("nodatacontent") && (s.noDataContent = t.data("nodatacontent")),
            void 0 !== t.data("pagesize") && (s.pageSize = t.data("pagesize")),
            void 0 !== t.data("pagerformat") && (s.pagerFormat = t.data("pagerformat")),
            void 0 !== t.data("pageprevtext") && (s.pagePrevText = t.data("pageprevtext")),
            void 0 !== t.data("pagenexttext") && (s.pageNextText = t.data("pagenexttext")),
            void 0 !== t.data("pagefirsttext") && (s.pageFirstText = t.data("pagefirsttext")),
            void 0 !== t.data("rowrenderer") && (s.rowRenderer = t.data("rowrenderer")),
            void 0 !== t.data("headerrowrenderer") && (s.headerRowRenderer = t.data("headerrowrenderer")),
            void 0 !== t.data("loadmessage") && (s.loadMessage = t.data("loadmessage")),
            void 0 !== t.data("pagebuttoncount") && (s.pageButtonCount = t.data("pagebuttoncount")),
            void 0 !== t.data("autoload") && (s.autoload = t.data("autoload")),
            (s = psLib.DataGridDefaults(s)),
            t.find("thead th, thead td").each(function () {
                s.fields.push(psLib.DataGridColumnDefaults(this));
            }),
            (s.controller = window[psLib.DataGridDB(t, s, e)]);
        var n = '<div id="' + i + '"></div>';
        t.hide().after(n),
            window.setTimeout(function () {
                (s.data = s.controller.data),
                    $("#" + i).jsGrid(s),
                    s.filtering &&
                        $("input", "#" + i).on("keyup", function () {
                            $("#ps-datagrid-" + e).jsGrid("search");
                        });
            }, 100);
    }),
    (psLib.DataGridDefaults = function (config) {
        var rtn = {
            width: "100%",
            height: "auto",
            heading: !0,
            filtering: !1,
            inserting: !1,
            editing: !1,
            selecting: !1,
            sorting: !0,
            paging: !0,
            noDataContent: "Nenhum item disponÃ­vel.",
            pageSize: 20,
            loadMessage: "Aguarde",
            pagerFormat: "Total {itemCount} | P&aacute;gina {pageIndex} de {pageCount} || {first} {prev} {pages} {next} {last}",
            pagePrevText: "&#171;",
            pageNextText: "&#187;",
            pageFirstText: psLib.IsMobile ? "" : "primeira",
            pageLastText: psLib.IsMobile ? "" : "Ãºltima",
            pageButtonCount: psLib.IsMobile ? 2 : 7,
            rowRenderer: null,
            headerRowRenderer: null,
            fields: [],
            autoload: !0,
            onRefreshed: function (t) {
                psLib.DataGridPager(t), psLib.DataGridHighlightSort(t);
            },
        };
        return (
            void 0 !== config.rowRenderer && (config.rowRenderer = eval("(" + config.rowRenderer + ")")),
            void 0 !== config.headerRowRenderer && (config.headerRowRenderer = eval("(" + config.headerRowRenderer + "(value,item))")),
            $.extend(rtn, config),
            rtn
        );
    }),
    (psLib.DataGridColumnDefaults = function (obj) {
        var rtn = { type: "text", name: "", title: "", align: "left", width: "auto", css: "", headercss: "", filtercss: "", insertcss: "", editcss: "", filtering: !0, inserting: !1, editing: !1, sorting: !0, sorter: "string" },
            t = $(obj),
            d = t.data();
        return (
            (rtn.title = t.text()),
            void 0 !== d.type && (rtn.type = d.type),
            void 0 !== d.name ? (rtn.name = d.name) : (rtn.name = psLib.StrToIdString(rtn.title)),
            void 0 !== d.align && (rtn.align = d.align),
            void 0 !== d.width && (rtn.width = d.width),
            void 0 !== d.filtering && (rtn.filtering = d.filtering),
            void 0 !== d.inserting && (rtn.inserting = d.inserting),
            void 0 !== d.editing && (rtn.editing = d.editing),
            void 0 !== d.sorting && (rtn.sorting = d.sorting),
            void 0 !== d.sorter &&
                (-1 < d.sorter.indexOf("()")
                    ? (rtn.sorter = eval("(" + d.sorter + ")"))
                    : "date" == d.sorter
                    ? (rtn.sorter = psLib.DataGridDateSort)
                    : "templateSort" == d.sorter
                    ? (rtn.sorter = psLib.DataGridTemplateSort)
                    : (rtn.sorter = d.sorter)),
            void 0 !== t.attr("class") && ((rtn.css = t.attr("class")), (rtn.headercss = t.attr("class")), "left" != rtn.align && (rtn.headercss += " jsgrid-align-" + rtn.align)),
            "select" == rtn.type && void 0 !== d.items && ((rtn.items = eval(d.items)), (rtn.valueField = d.valuefield), (rtn.textField = d.textfield)),
            void 0 !== d.itemtemplate && (rtn.itemTemplate = eval("(" + d.itemtemplate + ")")),
            (rtn.filterTemplate = psLib.DataGridFilterTemplate),
            rtn
        );
    }),
    (psLib.DataGridDataFill = function (i, t) {
        var s = {},
            n = 0;
        return (
            $(t)
                .find("th,td")
                .each(function () {
                    var t = i[n].name,
                        e = i[n].type;
                    (s[t] = $(this).text()), "select" == e && (s[t] = parseInt(s[t])), n++;
                }),
            s
        );
    }),
    (psLib.DataGridDB = function (t, d, e) {
        var i = { data: [] },
            o = t.find("tbody"),
            r = o.data("source");
        return (
            void 0 === r
                ? ((i.loadData = function (l) {
                      var t = [];
                      return (t = $.grep(this.data, function (t) {
                          for (var e = !0, i = 0, s = d.fields.length; i < s; i++) {
                              var n = d.fields[i].name,
                                  a = d.fields[i].type;
                              if (void 0 !== l[n] && "" != l[n])
                                  if ("text" == a) {
                                      var o = t[n],
                                          r = l[n];
                                      (o = o.toLowerCase()), (r = r.toLowerCase()), -1 == o.indexOf(r) && (e = !1);
                                  } else t[n] != l[n] && (e = !1);
                          }
                          return e;
                      }));
                  }),
                  t.find("tbody tr").each(function () {
                      i.data.push(psLib.DataGridDataFill(d.fields, this));
                  }))
                : (i.loadData = function (t) {
                      var e = void 0 !== o.data("method") ? o.data("method") : "POST",
                          i = void 0 !== o.data("type") ? o.data("type") : "json",
                          s = void 0 !== o.data("callback") && o.data("callback"),
                          n = void 0 !== o.data("defaultparam") ? o.data("defaultparam") : "";
                      n += $.param(t);
                      var a = { type: e, url: r, data: n, dataType: i };
                      return "jsonp" == i && s && (a.jsonp = s), $.ajax(a);
                  }),
            (window["ps_datagrid_" + e] = i),
            "ps_datagrid_" + e
        );
    }),
    (psLib.DataGridDateSort = function (t, e) {
        (t = t.split("/")), (e = e.split("/"));
        for (var i = 0, s = 3; i < 3; i++) (t[i] = parseInt(t[i])), (e[i] = parseInt(e[i])), 1 == i && (t[i]--, e[i]--);
        var n, a;
        return new Date(t[2], t[1], t[0]) - new Date(e[2], e[1], e[0]);
    }),
    (psLib.DataGridTemplateSort = function (t, e, i, s, n) {
        var a = t,
            o = e;
        return (
            "function" == typeof n.itemTemplate && void 0 === n.items
                ? ((a = $(n.itemTemplate(a, i)).text()), (o = $(n.itemTemplate(o, s)).text()))
                : void 0 !== n.items && 0 < n.items.length && ((a = psLib.DataGridItemReplacer(a, n.items, n.valueField, n.textField)), (o = psLib.DataGridItemReplacer(o, n.items, n.valueField, n.textField))),
            a.localeCompare(o)
        );
    }),
    (psLib.DataGridItemReplacer = function (t, e, i, s) {
        for (var n = t, a = 0, o = e.length; a < o; a++)
            if (n == e[a][i]) {
                n = e[a][s];
                break;
            }
        return n;
    }),
    (psLib.DataGridPager = function (t) {
        var e = $(t.grid._body).next(),
            i = e.find(".jsgrid-pager").html(),
            n = e.find(".jsgrid-pager"),
            a = e.find(".ps-datagrid-footer"),
            s = "",
            o = t;
        if ((n.hide(), void 0 !== i)) {
            (i = i.split("||")), 0 == a.length && (e.append('<div class="ps-datagrid-footer"></div>'), (a = e.find(".ps-datagrid-footer")));
            var r = $("<div>" + i[1] + "</div>").find("span"),
                l = r.slice(1, -1),
                d = r.first(),
                c = r.last();
            (i[1] = ""),
                l.each(function () {
                    var t = $(this).attr("class"),
                        e = $(this).text();
                    i[1] +=
                        "Â»" == e
                            ? '<a href="javascript:;" class="ps-btn ' + t + ' pageNextText"><span class="ps-hide">' + e + '</span><span class="ps-ico ps-ico-xsm ps-ico-arrow-right"></span></a>'
                            : "Â«" == e
                            ? '<a href="javascript:;" class="ps-btn ' + t + ' pagePrevText"><span class="ps-hide">' + e + '</span><span class="ps-ico ps-ico-xsm ps-ico-arrow-left"></span></a>'
                            : '<a href="javascript:;" class="ps-btn ' + t + '">' + e + "</a>";
                }),
                (i[2] = ""),
                $(d).each(function () {
                    var t = $(this).attr("class"),
                        e = $(this).text();
                    i[2] += '<a href="javascript:;" class="ps-btn ' + t + ' pageFirstText"><span class="ps-ico ps-ico-xsm ps-ico-arrow-left"></span><span class="ps-ico ps-ico-xsm ps-ico-arrow-left"></span>' + e + "</a>";
                }),
                (i[3] = ""),
                $(c).each(function () {
                    var t = $(this).attr("class"),
                        e = $(this).text();
                    i[3] += '<a href="javascript:;" class="ps-btn ' + t + ' pageLastText">' + e + '<span class="ps-ico ps-ico-xsm ps-ico-arrow-right"></span><span class="ps-ico ps-ico-xsm ps-ico-arrow-right"></span></a>';
                }),
                (s =
                    '\t\t\t<div class="ps-row">\t\t\t\t<div class="ps-hide ps-sm-show ps-sm-mod4 ps-datagrid-info">' +
                    i[0] +
                    '</div>\t\t\t\t<div class="ps-mod8 ps-sm-mod8 ps-noGutter ps-sm-noGutter ps-datagrid-pages">\t\t\t\t\t<div class="ps-mod1 ps-md-mod2 ps-md-lspan4" style="position: relative">\t\t\t\t\t\t<span>&nbsp;</span>\t\t\t\t\t\t<div class="ps-btn-group" style="float: none; position: absolute; top:0;">\t\t\t\t\t\t\t' +
                    i[2] +
                    '\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="ps-mod6 ps-md-mod4">\t\t\t\t\t\t<div class="ps-btn-group" style="float: none; margin: 0 auto;">\t\t\t\t\t\t\t' +
                    i[1] +
                    '\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="ps-mod1 ps-md-mod2" style="position: relative;">\t\t\t\t\t\t<span>&nbsp;</span>\t\t\t\t\t\t<div class="ps-btn-group" style="position: absolute; top:0; right:0;">\t\t\t\t\t\t\t' +
                    i[3] +
                    "\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>"),
                a.html(s),
                a.find(".jsgrid-pager-nav-button, .jsgrid-pager-page").on("click", function () {
                    var t = $(this).text(),
                        e = $(this).is(".jsgrid-pager-page") ? n.find(".jsgrid-pager-page a") : n.find(".jsgrid-pager-nav-button a"),
                        i = o;
                    if ("..." == t) var s = $(".jsgrid-pager-nav-button", a).index($(this));
                    e.each(function () {
                        $(this).text() == t && ("..." == t ? $(".jsgrid-pager-nav-button", n).index($(this).parent()) == s && ($(this).trigger("click"), psLib.DataGridPager(i)) : $(this).trigger("click"));
                    });
                });
        }
    }),
    (psLib.DataGridHighlightSort = function (t) {
        var e = $(t.grid._header).find("tr:eq(0)"),
            i = $(t.grid._body).find("tr"),
            s = e.find(".jsgrid-header-sort"),
            n = $("th", e).index(s);
        -1 < n && i.find("td:eq(" + n + ")").addClass("ps-datagrid-sorted");
    }),
    (psLib.DataGridFilterTemplate = function () {
        var t = "",
            e = this._grid;
        if (1 == this.filtering) {
            if ("select" == this.type) {
                for (var i = [], s = [], n = 0, a = e.data.length; n < a; n++) i.push(e.data[n][this.name]);
                for (var n = 0, a = i.length; n < a; n++) -1 == $.inArray(i[n], s) && s.push(i[n]);
                t += '<div class="ps-frm-select">\t\t\t\t\t\t<select>\t\t\t\t\t\t\t<option value="">Filtrar</option>';
                for (var n = 0, a = s.length; n < a; n++)
                    if (this.items) {
                        for (var o = "", r = 0, l = this.items.length; r < l; r++)
                            if (this.items[r][this.valueField] == s[n]) {
                                o = this.items[r][this.textField];
                                break;
                            }
                        t += '<option value="' + s[n] + '">' + o + "</option>";
                    } else t += '<option value="' + s[n] + '">' + s[n] + "</option>";
                t += "\t</select>\t\t\t\t\t</div>";
            } else
                "text" == this.type
                    ? (t += '<div><input type="text" class="ps-frm-entry" placeholder="Filtrar ' + this.title + '" value="" /></div>')
                    : "number" == this.type && (t += '<div><input type="tel" class="ps-frm-entry" placeholder="Filtrar ' + this.title + '" value="" /></div>');
            (t = $(t)),
                (this.filterControl = t.find("input,select")),
                t.find("input").on("keyup", function (t) {
                    t.preventDefault(), e.search();
                }),
                t.find("select").on("change", function (t) {
                    t.preventDefault(), e.search();
                });
        } else t += '<div><input type="text" class="ps-frm-entry" value="Filtro indisponÃ­vel" value="" disabled /></div>';
        return t;
    }),
    (function (i, r, o) {
        function l(t, e) {
            var i = r(t);
            i.data(d, this), (this._container = i), (this.data = []), (this.fields = []), (this._editingRow = null), (this._sortField = null), (this._sortOrder = s), (this._firstDisplayingPage = 1), this._init(e), this.render();
        }
        var t,
            d = "JSGrid",
            c = "JSGridItem",
            n = "JSGridEditRow",
            s = "asc",
            e = "desc",
            a = "{first}",
            h = "{pages}",
            u = "{prev}",
            p = "{next}",
            f = "{last}",
            g = "{pageIndex}",
            m = "{pageCount}",
            v = "{itemCount}",
            b = "javascript:void(0);",
            w = function (t, e) {
                return r.isFunction(t) ? t.apply(e, r.makeArray(arguments).slice(2)) : t;
            },
            y = { loadData: r.noop, insertItem: r.noop, updateItem: r.noop, deleteItem: r.noop },
            k;
        (l.prototype = {
            width: "auto",
            height: "auto",
            updateOnResize: !0,
            rowClass: r.noop,
            rowRenderer: null,
            rowClick: function (t) {
                this.editing && this.editItem(r(t.event.target).closest("tr"));
            },
            rowDoubleClick: r.noop,
            noDataContent: "Not found",
            noDataRowClass: "jsgrid-nodata-row",
            heading: !0,
            headerRowRenderer: null,
            headerRowClass: "jsgrid-header-row",
            filtering: !1,
            filterRowRenderer: null,
            filterRowClass: "jsgrid-filter-row",
            inserting: !1,
            insertRowRenderer: null,
            insertRowClass: "jsgrid-insert-row",
            editing: !1,
            editRowRenderer: null,
            editRowClass: "jsgrid-edit-row",
            confirmDeleting: !0,
            deleteConfirm: "Are you sure?",
            selecting: !0,
            selectedRowClass: "jsgrid-selected-row",
            oddRowClass: "jsgrid-row",
            evenRowClass: "jsgrid-alt-row",
            sorting: !1,
            sortableClass: "jsgrid-header-sortable",
            sortAscClass: "jsgrid-header-sort jsgrid-header-sort-asc",
            sortDescClass: "jsgrid-header-sort jsgrid-header-sort-desc",
            paging: !1,
            pagerContainer: null,
            pageIndex: 1,
            pageSize: 20,
            pageButtonCount: 15,
            pagerFormat: "Pages: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} of {pageCount}",
            pagePrevText: "Prev",
            pageNextText: "Next",
            pageFirstText: "First",
            pageLastText: "Last",
            pageNavigatorNextText: "...",
            pageNavigatorPrevText: "...",
            pagerContainerClass: "jsgrid-pager-container",
            pagerClass: "jsgrid-pager",
            pagerNavButtonClass: "jsgrid-pager-nav-button",
            pagerNavButtonInactiveClass: "jsgrid-pager-nav-inactive-button",
            pageClass: "jsgrid-pager-page",
            currentPageClass: "jsgrid-pager-current-page",
            customLoading: !1,
            pageLoading: !1,
            autoload: !1,
            controller: y,
            loadIndication: !0,
            loadIndicationDelay: 500,
            loadMessage: "Please, wait...",
            loadShading: !0,
            invalidMessage: "Invalid data entered!",
            invalidNotify: function (t) {
                var e = r.map(t.errors, function (t) {
                    return t.message || null;
                });
                i.alert([this.invalidMessage].concat(e).join("\n"));
            },
            onRefreshing: r.noop,
            onRefreshed: r.noop,
            onItemDeleting: r.noop,
            onItemDeleted: r.noop,
            onItemInserting: r.noop,
            onItemInserted: r.noop,
            onItemEditing: r.noop,
            onItemUpdating: r.noop,
            onItemUpdated: r.noop,
            onItemInvalid: r.noop,
            onDataLoading: r.noop,
            onDataLoaded: r.noop,
            onOptionChanging: r.noop,
            onOptionChanged: r.noop,
            onError: r.noop,
            invalidClass: "jsgrid-invalid",
            containerClass: "jsgrid",
            tableClass: "jsgrid-table",
            gridHeaderClass: "jsgrid-grid-header",
            gridBodyClass: "jsgrid-grid-body",
            _init: function (t) {
                r.extend(this, t), this._initLoadStrategy(), this._initController(), this._initFields(), this._attachWindowLoadResize(), this._attachWindowResizeCallback();
            },
            loadStrategy: function () {
                return this.pageLoading ? new jsGrid.loadStrategies.PageLoadingStrategy(this) : new jsGrid.loadStrategies.DirectLoadingStrategy(this);
            },
            _initLoadStrategy: function () {
                this._loadStrategy = w(this.loadStrategy, this);
            },
            _initController: function () {
                this._controller = r.extend({}, y, w(this.controller, this));
            },
            loadIndicator: function (t) {
                return new jsGrid.LoadIndicator(t);
            },
            validation: function (t) {
                return jsGrid.Validation && new jsGrid.Validation(t);
            },
            _initFields: function () {
                var i = this;
                i.fields = r.map(i.fields, function (t) {
                    var e;
                    r.isPlainObject(t) && (t = new ((t.type && jsGrid.fields[t.type]) || jsGrid.Field)(t));
                    return (t._grid = i), t;
                });
            },
            _attachWindowLoadResize: function () {
                r(i).on("load", r.proxy(this._refreshSize, this));
            },
            _attachWindowResizeCallback: function () {
                this.updateOnResize && r(i).on("resize", r.proxy(this._refreshSize, this));
            },
            _detachWindowResizeCallback: function () {
                r(i).off("resize", this._refreshSize);
            },
            option: function (t, e) {
                var i, s;
                if (1 === arguments.length) return this[t];
                (i = { option: t, oldValue: this[t], newValue: e }),
                    this._callEventHandler(this.onOptionChanging, i),
                    this._handleOptionChange(i.option, i.newValue),
                    (s = { option: i.option, value: i.newValue }),
                    this._callEventHandler(this.onOptionChanged, s);
            },
            fieldOption: function (t, e, i) {
                if (((t = this._normalizeField(t)), 2 === arguments.length)) return t[e];
                (t[e] = i), this._renderGrid();
            },
            _handleOptionChange: function (t, e) {
                switch (((this[t] = e), t)) {
                    case "width":
                    case "height":
                        this._refreshSize();
                        break;
                    case "rowClass":
                    case "rowRenderer":
                    case "rowClick":
                    case "rowDoubleClick":
                    case "noDataText":
                    case "noDataRowClass":
                    case "noDataContent":
                    case "selecting":
                    case "selectedRowClass":
                    case "oddRowClass":
                    case "evenRowClass":
                        this._refreshContent();
                        break;
                    case "pageButtonCount":
                    case "pagerFormat":
                    case "pagePrevText":
                    case "pageNextText":
                    case "pageFirstText":
                    case "pageLastText":
                    case "pageNavigatorNextText":
                    case "pageNavigatorPrevText":
                    case "pagerClass":
                    case "pagerNavButtonClass":
                    case "pageClass":
                    case "currentPageClass":
                    case "pagerRenderer":
                        this._refreshPager();
                        break;
                    case "fields":
                        this._initFields(), this.render();
                        break;
                    case "data":
                    case "editing":
                    case "heading":
                    case "filtering":
                    case "inserting":
                    case "paging":
                        this.refresh();
                        break;
                    case "loadStrategy":
                    case "pageLoading":
                        this._initLoadStrategy(), this.search();
                        break;
                    case "pageIndex":
                        this.openPage(e);
                        break;
                    case "pageSize":
                        this.refresh(), this.search();
                        break;
                    case "editRowRenderer":
                    case "editRowClass":
                        this.cancelEdit();
                        break;
                    case "updateOnResize":
                        this._detachWindowResizeCallback(), this._attachWindowResizeCallback();
                        break;
                    case "invalidNotify":
                    case "invalidMessage":
                        break;
                    default:
                        this.render();
                }
            },
            destroy: function () {
                this._detachWindowResizeCallback(), this._clear(), this._container.removeData(d);
            },
            render: function () {
                return this._renderGrid(), this.autoload ? this.loadData() : r.Deferred().resolve().promise();
            },
            _renderGrid: function () {
                this._clear(),
                    this._container.addClass(this.containerClass).css("position", "relative").append(this._createHeader()).append(this._createBody()),
                    (this._pagerContainer = this._createPagerContainer()),
                    (this._loadIndicator = this._createLoadIndicator()),
                    (this._validation = this._createValidation()),
                    this.refresh();
            },
            _createLoadIndicator: function () {
                return w(this.loadIndicator, this, { message: this.loadMessage, shading: this.loadShading, container: this._container });
            },
            _createValidation: function () {
                return w(this.validation, this);
            },
            _clear: function () {
                this.cancelEdit(), clearTimeout(this._loadingTimer), this._pagerContainer && this._pagerContainer.empty(), this._container.empty().css({ position: "", width: "", height: "" });
            },
            _createHeader: function () {
                var t = (this._headerRow = this._createHeaderRow()),
                    e = (this._filterRow = this._createFilterRow()),
                    i = (this._insertRow = this._createInsertRow()),
                    s = (this._headerGrid = r("<table>").addClass(this.tableClass).append(t).append(e).append(i)),
                    n;
                return (this._header = r("<div>")
                    .addClass(this.gridHeaderClass)
                    .addClass(this._scrollBarWidth() ? "jsgrid-header-scrollbar" : "")
                    .append(s));
            },
            _createBody: function () {
                var t = (this._content = r("<tbody>")),
                    e = (this._bodyGrid = r("<table>").addClass(this.tableClass).append(t)),
                    i;
                return (this._body = r("<div>")
                    .addClass(this.gridBodyClass)
                    .append(e)
                    .on(
                        "scroll",
                        r.proxy(function (t) {
                            this._header.scrollLeft(t.target.scrollLeft);
                        }, this)
                    ));
            },
            _createPagerContainer: function () {
                var t = this.pagerContainer || r("<div>").appendTo(this._container);
                return r(t).addClass(this.pagerContainerClass);
            },
            _eachField: function (i) {
                var s = this;
                r.each(this.fields, function (t, e) {
                    e.visible && i.call(s, e, t);
                });
            },
            _createHeaderRow: function () {
                if (r.isFunction(this.headerRowRenderer)) return r(this.headerRowRenderer());
                var s = r("<tr>").addClass(this.headerRowClass);
                return (
                    this._eachField(function (t, e) {
                        var i = this._prepareCell("<th>", t, "headercss")
                            .append(t.headerTemplate ? t.headerTemplate() : "")
                            .appendTo(s);
                        this.sorting &&
                            t.sorting &&
                            i.addClass(this.sortableClass).on(
                                "click",
                                r.proxy(function () {
                                    this.sort(e);
                                }, this)
                            );
                    }),
                    s
                );
            },
            _prepareCell: function (t, e, i) {
                return r(t)
                    .css("width", e.width)
                    .addClass((i && e[i]) || e.css)
                    .addClass(e.align ? "jsgrid-align-" + e.align : "");
            },
            _createFilterRow: function () {
                if (r.isFunction(this.filterRowRenderer)) return r(this.filterRowRenderer());
                var e = r("<tr>").addClass(this.filterRowClass);
                return (
                    this._eachField(function (t) {
                        this._prepareCell("<td>", t, "filtercss")
                            .append(t.filterTemplate ? t.filterTemplate() : "")
                            .appendTo(e);
                    }),
                    e
                );
            },
            _createInsertRow: function () {
                if (r.isFunction(this.insertRowRenderer)) return r(this.insertRowRenderer());
                var e = r("<tr>").addClass(this.insertRowClass);
                return (
                    this._eachField(function (t) {
                        this._prepareCell("<td>", t, "insertcss")
                            .append(t.insertTemplate ? t.insertTemplate() : "")
                            .appendTo(e);
                    }),
                    e
                );
            },
            _callEventHandler: function (t, e) {
                return t.call(this, r.extend(e, { grid: this })), e;
            },
            reset: function () {
                this._resetSorting(), this._resetPager(), this.refresh();
            },
            _resetPager: function () {
                (this._firstDisplayingPage = 1), this._setPage(1);
            },
            _resetSorting: function () {
                (this._sortField = null), (this._sortOrder = s), this._clearSortingCss();
            },
            refresh: function () {
                this._callEventHandler(this.onRefreshing),
                    this.cancelEdit(),
                    this._refreshHeading(),
                    this._refreshFiltering(),
                    this._refreshInserting(),
                    this._refreshContent(),
                    this._refreshPager(),
                    this._refreshSize(),
                    this._callEventHandler(this.onRefreshed);
            },
            _refreshHeading: function () {
                this._headerRow.toggle(this.heading);
            },
            _refreshFiltering: function () {
                this._filterRow.toggle(this.filtering);
            },
            _refreshInserting: function () {
                this._insertRow.toggle(this.inserting);
            },
            _refreshContent: function () {
                var t = this._content;
                if ((t.empty(), !this.data.length)) return t.append(this._createNoDataRow()), this;
                for (var e = this._loadStrategy.firstDisplayIndex(), i = this._loadStrategy.lastDisplayIndex(), s = e; s < i; s++) {
                    var n = this.data[s];
                    t.append(this._createRow(n, s));
                }
            },
            _createNoDataRow: function () {
                var t = w(this.noDataContent, this),
                    e = 0;
                return (
                    this._eachField(function () {
                        e++;
                    }),
                    r("<tr>").addClass(this.noDataRowClass).append(r("<td>").attr("colspan", e).append(t))
                );
            },
            _createNoDataContent: function () {
                return r.isFunction(this.noDataRenderer) ? this.noDataRenderer() : this.noDataText;
            },
            _createRow: function (e, i) {
                var t;
                return (
                    r.isFunction(this.rowRenderer) ? (t = r(this.rowRenderer(e, i))) : ((t = r("<tr>")), this._renderCells(t, e)),
                    t
                        .addClass(this._getRowClasses(e, i))
                        .data(c, e)
                        .on(
                            "click",
                            r.proxy(function (t) {
                                this.rowClick({ item: e, itemIndex: i, event: t });
                            }, this)
                        )
                        .on(
                            "dblclick",
                            r.proxy(function (t) {
                                this.rowDoubleClick({ item: e, itemIndex: i, event: t });
                            }, this)
                        ),
                    this.selecting && this._attachRowHover(t),
                    t
                );
            },
            _getRowClasses: function (t, e) {
                var i = [];
                return i.push((e + 1) % 2 ? this.oddRowClass : this.evenRowClass), i.push(w(this.rowClass, this, t, e)), i.join(" ");
            },
            _attachRowHover: function (t) {
                var e = this.selectedRowClass;
                t.hover(
                    function () {
                        r(this).addClass(e);
                    },
                    function () {
                        r(this).removeClass(e);
                    }
                );
            },
            _renderCells: function (e, i) {
                return (
                    this._eachField(function (t) {
                        e.append(this._createCell(i, t));
                    }),
                    this
                );
            },
            _createCell: function (t, e) {
                var i,
                    s = this._getItemFieldValue(t, e);
                return (i = r.isFunction(e.cellRenderer) ? r(e.cellRenderer(s, t)) : r("<td>").append(e.itemTemplate ? e.itemTemplate(s, t) : s)), this._prepareCell(i, e);
            },
            _getItemFieldValue: function (t, e) {
                for (var i = e.name.split("."), s = t[i.shift()]; s && i.length; ) s = s[i.shift()];
                return s;
            },
            _setItemFieldValue: function (t, e, i) {
                for (var s = e.name.split("."), n = t, a = s[0]; n && s.length; ) n = (t = n)[(a = s.shift())];
                if (!n) for (; s.length; ) (t = t[a] = {}), (a = s.shift());
                t[a] = i;
            },
            sort: function (t, e) {
                return r.isPlainObject(t) && ((e = t.order), (t = t.field)), this._clearSortingCss(), this._setSortingParams(t, e), this._setSortingCss(), this._loadStrategy.sort();
            },
            _clearSortingCss: function () {
                this._headerRow.find("th").removeClass(this.sortAscClass).removeClass(this.sortDescClass);
            },
            _setSortingParams: function (t, e) {
                (t = this._normalizeField(t)), (e = e || (this._sortField === t ? this._reversedSortOrder(this._sortOrder) : s)), (this._sortField = t), (this._sortOrder = e);
            },
            _normalizeField: function (e) {
                return r.isNumeric(e)
                    ? this.fields[e]
                    : "string" == typeof e
                    ? r.grep(this.fields, function (t) {
                          return t.name === e;
                      })[0]
                    : e;
            },
            _reversedSortOrder: function (t) {
                return t === s ? e : s;
            },
            _setSortingCss: function () {
                var t = r.inArray(
                    this._sortField,
                    r.grep(this.fields, function (t) {
                        return t.visible;
                    })
                );
                this._headerRow
                    .find("th")
                    .eq(t)
                    .addClass(this._sortOrder === s ? this.sortAscClass : this.sortDescClass);
            },
            _sortData: function () {
                var i = this._sortFactor(),
                    s = this._sortField;
                if (s) {
                    var t = this;
                    this.data.sort(function (t, e) {
                        return i * s.sortingFunc(t[s.name], e[s.name], t, e, s);
                    });
                }
            },
            _sortFactor: function () {
                return this._sortOrder === s ? 1 : -1;
            },
            _itemsCount: function () {
                return this._loadStrategy.itemsCount();
            },
            _pagesCount: function () {
                var t = this._itemsCount(),
                    e = this.pageSize;
                return Math.floor(t / e) + (t % e ? 1 : 0);
            },
            _refreshPager: function () {
                var t = this._pagerContainer;
                t.empty(), this.paging && t.append(this._createPager());
                var e = this.paging && 1 < this._pagesCount();
                t.toggle(e);
            },
            _createPager: function () {
                var t;
                return (t = r.isFunction(this.pagerRenderer) ? r(this.pagerRenderer({ pageIndex: this.pageIndex, pageCount: this._pagesCount() })) : r("<div>").append(this._createPagerByFormat())).addClass(this.pagerClass), t;
            },
            _createPagerByFormat: function () {
                var i = this.pageIndex,
                    s = this._pagesCount(),
                    n = this._itemsCount(),
                    t = this.pagerFormat.split(" ");
                return r.map(
                    t,
                    r.proxy(function (t) {
                        var e = t;
                        return (
                            t === h
                                ? (e = this._createPages())
                                : t === a
                                ? (e = this._createPagerNavButton(this.pageFirstText, 1, 1 < i))
                                : t === u
                                ? (e = this._createPagerNavButton(this.pagePrevText, i - 1, 1 < i))
                                : t === p
                                ? (e = this._createPagerNavButton(this.pageNextText, i + 1, i < s))
                                : t === f
                                ? (e = this._createPagerNavButton(this.pageLastText, s, i < s))
                                : t === g
                                ? (e = i)
                                : t === m
                                ? (e = s)
                                : t === v && (e = n),
                            r.isArray(e) ? e.concat([" "]) : [e, " "]
                        );
                    }, this)
                );
            },
            _createPages: function () {
                var t = this._pagesCount(),
                    e = this.pageButtonCount,
                    i = this._firstDisplayingPage,
                    s = [];
                1 < i && s.push(this._createPagerPageNavButton(this.pageNavigatorPrevText, this.showPrevPages));
                for (var n = 0, a = i; n < e && a <= t; n++, a++) s.push(a === this.pageIndex ? this._createPagerCurrentPage() : this._createPagerPage(a));
                return i + e - 1 < t && s.push(this._createPagerPageNavButton(this.pageNavigatorNextText, this.showNextPages)), s;
            },
            _createPagerNavButton: function (t, e, i) {
                return this._createPagerButton(
                    t,
                    this.pagerNavButtonClass + (i ? "" : " " + this.pagerNavButtonInactiveClass),
                    i
                        ? function () {
                              this.openPage(e);
                          }
                        : r.noop
                );
            },
            _createPagerPageNavButton: function (t, e) {
                return this._createPagerButton(t, this.pagerNavButtonClass, e);
            },
            _createPagerPage: function (t) {
                return this._createPagerButton(t, this.pageClass, function () {
                    this.openPage(t);
                });
            },
            _createPagerButton: function (t, e, i) {
                var s = r("<a>").attr("href", b).html(t).on("click", r.proxy(i, this));
                return r("<span>").addClass(e).append(s);
            },
            _createPagerCurrentPage: function () {
                return r("<span>").addClass(this.pageClass).addClass(this.currentPageClass).text(this.pageIndex);
            },
            _refreshSize: function () {
                this._refreshHeight(), this._refreshWidth();
            },
            _refreshWidth: function () {
                var t = this._headerGrid,
                    e = this._bodyGrid,
                    i = this.width;
                "auto" === i && (t.width("auto"), (i = t.outerWidth())), t.width(""), e.width(""), this._container.width(i), (i = t.outerWidth()), e.width(i);
            },
            _scrollBarWidth: function () {
                if (k === o) {
                    var t = r("<div style='width:50px;height:50px;overflow:hidden;position:absolute;top:-10000px;left:-10000px;'></div>"),
                        e = r("<div style='height:100px;'></div>");
                    t.append(e).appendTo("body");
                    var i = e.innerWidth();
                    t.css("overflow-y", "auto");
                    var s = e.innerWidth();
                    t.remove(), (k = i - s);
                }
                return k;
            },
            _refreshHeight: function () {
                var t = this._container,
                    e = this._pagerContainer,
                    i = this.height,
                    s;
                t.height(i), "auto" !== i && ((i = t.height()), (s = this._header.outerHeight(!0)), e.parents(t).length && (s += e.outerHeight(!0)), this._body.outerHeight(i - s));
            },
            showPrevPages: function () {
                var t = this._firstDisplayingPage,
                    e = this.pageButtonCount;
                (this._firstDisplayingPage = e < t ? t - e : 1), this._refreshPager();
            },
            showNextPages: function () {
                var t = this._firstDisplayingPage,
                    e = this.pageButtonCount,
                    i = this._pagesCount();
                (this._firstDisplayingPage = i < t + 2 * e ? i - e + 1 : t + e), this._refreshPager();
            },
            openPage: function (t) {
                t < 1 || t > this._pagesCount() || (this._setPage(t), this._loadStrategy.openPage(t));
            },
            _setPage: function (t) {
                var e = this._firstDisplayingPage,
                    i = this.pageButtonCount;
                (this.pageIndex = t) < e && (this._firstDisplayingPage = t), e + i - 1 < t && (this._firstDisplayingPage = t - i + 1);
            },
            _controllerCall: function (t, e, i, s) {
                if (i) return r.Deferred().reject().promise();
                this._showLoading();
                var n = this._controller;
                if (!n || !n[t]) throw Error("controller has no method '" + t + "'");
                return r.when(n[t](e)).done(r.proxy(s, this)).fail(r.proxy(this._errorHandler, this)).always(r.proxy(this._hideLoading, this));
            },
            _errorHandler: function () {
                this._callEventHandler(this.onError, { args: r.makeArray(arguments) });
            },
            _showLoading: function () {
                this.loadIndication &&
                    (clearTimeout(this._loadingTimer),
                    (this._loadingTimer = setTimeout(
                        r.proxy(function () {
                            this._loadIndicator.show();
                        }, this),
                        this.loadIndicationDelay
                    )));
            },
            _hideLoading: function () {
                this.loadIndication && (clearTimeout(this._loadingTimer), this._loadIndicator.hide());
            },
            search: function (t) {
                return this._resetSorting(), this._resetPager(), this.loadData(t);
            },
            loadData: function (t) {
                (t = t || (this.filtering ? this.getFilter() : {})), r.extend(t, this._loadStrategy.loadParams(), this._sortingParams());
                var e = this._callEventHandler(this.onDataLoading, { filter: t });
                return this._controllerCall("loadData", t, e.cancel, function (t) {
                    t && (this._loadStrategy.finishLoad(t), this._callEventHandler(this.onDataLoaded, { data: t }));
                });
            },
            getFilter: function () {
                var e = {};
                return (
                    this._eachField(function (t) {
                        t.filtering && this._setItemFieldValue(e, t, t.filterValue());
                    }),
                    e
                );
            },
            _sortingParams: function () {
                return this.sorting && this._sortField ? { sortField: this._sortField.name, sortOrder: this._sortOrder } : {};
            },
            getSorting: function () {
                var t = this._sortingParams();
                return { field: t.sortField, order: t.sortOrder };
            },
            clearFilter: function () {
                var t = this._createFilterRow();
                return this._filterRow.replaceWith(t), (this._filterRow = t), this.search();
            },
            insertItem: function (t) {
                var e = t || this._getValidatedInsertItem();
                if (!e) return r.Deferred().reject().promise();
                var i = this._callEventHandler(this.onItemInserting, { item: e });
                return this._controllerCall("insertItem", e, i.cancel, function (t) {
                    (t = t || e), this._loadStrategy.finishInsert(t), this._callEventHandler(this.onItemInserted, { item: t });
                });
            },
            _getValidatedInsertItem: function () {
                var t = this._getInsertItem();
                return this._validateItem(t, this._insertRow) ? t : null;
            },
            _getInsertItem: function () {
                var e = {};
                return (
                    this._eachField(function (t) {
                        t.inserting && this._setItemFieldValue(e, t, t.insertValue());
                    }),
                    e
                );
            },
            _validateItem: function (s, n) {
                var a = [],
                    o = { item: s, itemIndex: this._rowIndex(n), row: n };
                if (
                    (this._eachField(function (e, t) {
                        if (e.validate) {
                            var i = this._validation.validate(r.extend({ value: this._getItemFieldValue(s, e), rules: e.validate }, o));
                            this._setCellValidity(n.children().eq(t), i),
                                i.length &&
                                    a.push.apply(
                                        a,
                                        r.map(i, function (t) {
                                            return { field: e, message: t };
                                        })
                                    );
                        }
                    }),
                    !a.length)
                )
                    return !0;
                var t = r.extend({ errors: a }, o);
                return this._callEventHandler(this.onItemInvalid, t), this.invalidNotify(t), !1;
            },
            _setCellValidity: function (t, e) {
                t.toggleClass(this.invalidClass, !!e.length).attr("title", e.join("\n"));
            },
            clearInsert: function () {
                var t = this._createInsertRow();
                this._insertRow.replaceWith(t), (this._insertRow = t), this.refresh();
            },
            editItem: function (t) {
                var e = this.rowByItem(t);
                e.length && this._editRow(e);
            },
            rowByItem: function (t) {
                return t.jquery || t.nodeType
                    ? r(t)
                    : this._content.find("tr").filter(function () {
                          return r.data(this, c) === t;
                      });
            },
            _editRow: function (t) {
                if (this.editing) {
                    var e = t.data(c),
                        i;
                    if (!this._callEventHandler(this.onItemEditing, { row: t, item: e, itemIndex: this._itemIndex(e) }).cancel) {
                        this._editingRow && this.cancelEdit();
                        var s = this._createEditRow(e);
                        (this._editingRow = t).hide(), s.insertBefore(t), t.data(n, s);
                    }
                }
            },
            _createEditRow: function (i) {
                if (r.isFunction(this.editRowRenderer)) return r(this.editRowRenderer(i, this._itemIndex(i)));
                var s = r("<tr>").addClass(this.editRowClass);
                return (
                    this._eachField(function (t) {
                        var e = this._getItemFieldValue(i, t);
                        this._prepareCell("<td>", t, "editcss")
                            .append(t.editTemplate ? t.editTemplate(e, i) : "")
                            .appendTo(s);
                    }),
                    s
                );
            },
            updateItem: function (t, e) {
                1 === arguments.length && (e = t);
                var i = t ? this.rowByItem(t) : this._editingRow;
                if ((e = e || this._getValidatedEditedItem())) return this._updateRow(i, e);
            },
            _getValidatedEditedItem: function () {
                var t = this._getEditedItem();
                return this._validateItem(t, this._getEditRow()) ? t : null;
            },
            _updateRow: function (i, t) {
                var s = i.data(c),
                    n = this._itemIndex(s),
                    a = r.extend(!0, {}, s);
                r.extend(!0, s, t);
                var e = this._callEventHandler(this.onItemUpdating, { row: i, item: s, itemIndex: n, previousItem: a });
                return this._controllerCall("updateItem", s, e.cancel, function (t) {
                    t = t || s;
                    var e = this._finishUpdate(i, t, n);
                    this._callEventHandler(this.onItemUpdated, { row: e, item: t, itemIndex: n, previousItem: a });
                });
            },
            _rowIndex: function (t) {
                return this._content.children().index(r(t));
            },
            _itemIndex: function (t) {
                return r.inArray(t, this.data);
            },
            _finishUpdate: function (t, e, i) {
                this.cancelEdit(), (this.data[i] = e);
                var s = this._createRow(e, i);
                return t.replaceWith(s), s;
            },
            _getEditedItem: function () {
                var e = {};
                return (
                    this._eachField(function (t) {
                        t.editing && this._setItemFieldValue(e, t, t.editValue());
                    }),
                    e
                );
            },
            cancelEdit: function () {
                this._editingRow && (this._getEditRow().remove(), this._editingRow.show(), (this._editingRow = null));
            },
            _getEditRow: function () {
                return this._editingRow.data(n);
            },
            deleteItem: function (t) {
                var e = this.rowByItem(t);
                if (e.length && (!this.confirmDeleting || i.confirm(w(this.deleteConfirm, this, e.data(c))))) return this._deleteRow(e);
            },
            _deleteRow: function (t) {
                var e = t.data(c),
                    i = this._itemIndex(e),
                    s = this._callEventHandler(this.onItemDeleting, { row: t, item: e, itemIndex: i });
                return this._controllerCall("deleteItem", e, s.cancel, function () {
                    this._loadStrategy.finishDelete(e, i), this._callEventHandler(this.onItemDeleted, { row: t, item: e, itemIndex: i });
                });
            },
        }),
            (r.fn.jsGrid = function (s) {
                var t,
                    n = r.makeArray(arguments).slice(1),
                    a = this;
                return (
                    this.each(function () {
                        var t = r(this),
                            e = t.data(d),
                            i;
                        if (e)
                            if ("string" == typeof s) {
                                if ((i = e[s].apply(e, n)) !== o && i !== e) return (a = i), !1;
                            } else e._detachWindowResizeCallback(), e._init(s), e.render();
                        else new l(t, s);
                    }),
                    a
                );
            });
        var _ = {},
            C = function (t, e) {
                var i;
                r.isPlainObject(t) ? (i = l.prototype) : ((i = _[t].prototype), (t = e || {})), r.extend(i, t);
            },
            x = {},
            S = function (t) {
                var e = r.isPlainObject(t) ? t : x[t];
                if (!e) throw Error("unknown locale " + t);
                T(jsGrid, e);
            },
            T = function (i, t) {
                r.each(t, function (t, e) {
                    r.isPlainObject(e) ? T(i[t] || i[t[0].toUpperCase() + t.slice(1)], e) : i.hasOwnProperty(t) ? (i[t] = e) : (i.prototype[t] = e);
                });
            };
        i.jsGrid = { Grid: l, fields: _, setDefaults: C, locales: x, locale: S };
    })(window, jQuery),
    (function (t, e, i) {
        function s(t) {
            this._init(t);
        }
        (s.prototype = {
            container: "body",
            message: "Loading...",
            shading: !0,
            zIndex: 1e3,
            shaderClass: "jsgrid-load-shader",
            loadPanelClass: "jsgrid-load-panel",
            _init: function (t) {
                e.extend(!0, this, t), this._initContainer(), this._initShader(), this._initLoadPanel();
            },
            _initContainer: function () {
                this._container = e(this.container);
            },
            _initShader: function () {
                this.shading && (this._shader = e("<div>").addClass(this.shaderClass).hide().css({ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: this.zIndex }).appendTo(this._container));
            },
            _initLoadPanel: function () {
                this._loadPanel = e("<div>").addClass(this.loadPanelClass).text(this.message).hide().css({ position: "absolute", top: "50%", left: "50%", zIndex: this.zIndex }).appendTo(this._container);
            },
            show: function () {
                var t = this._loadPanel.show(),
                    e = t.outerWidth(),
                    i = t.outerHeight();
                t.css({ marginTop: -i / 2, marginLeft: -e / 2 }), this._shader.show();
            },
            hide: function () {
                this._loadPanel.hide(), this._shader.hide();
            },
        }),
            (t.LoadIndicator = s);
    })(jsGrid, jQuery),
    (function (t, e, i) {
        function s(t) {
            this._grid = t;
        }
        function n(t) {
            (this._grid = t), (this._itemsCount = 0);
        }
        (s.prototype = {
            firstDisplayIndex: function () {
                var t = this._grid;
                return t.option("paging") ? (t.option("pageIndex") - 1) * t.option("pageSize") : 0;
            },
            lastDisplayIndex: function () {
                var t = this._grid,
                    e = t.option("data").length;
                return t.option("paging") ? Math.min(t.option("pageIndex") * t.option("pageSize"), e) : e;
            },
            itemsCount: function () {
                return this._grid.option("data").length;
            },
            openPage: function (t) {
                this._grid.refresh();
            },
            loadParams: function () {
                return {};
            },
            sort: function () {
                return this._grid._sortData(), this._grid.refresh(), e.Deferred().resolve().promise();
            },
            finishLoad: function (t) {
                this._grid.option("data", t);
            },
            finishInsert: function (t) {
                var e = this._grid;
                e.option("data").push(t), e.refresh();
            },
            finishDelete: function (t, e) {
                var i = this._grid;
                i.option("data").splice(e, 1), i.reset();
            },
        }),
            (n.prototype = {
                firstDisplayIndex: function () {
                    return 0;
                },
                lastDisplayIndex: function () {
                    return this._grid.option("data").length;
                },
                itemsCount: function () {
                    return this._itemsCount;
                },
                openPage: function (t) {
                    this._grid.loadData();
                },
                loadParams: function () {
                    var t = this._grid;
                    return { pageIndex: t.option("pageIndex"), pageSize: t.option("pageSize") };
                },
                sort: function () {
                    return this._grid.loadData();
                },
                finishLoad: function (t) {
                    (this._itemsCount = t.itemsCount), this._grid.option("data", t.data);
                },
                finishInsert: function (t) {
                    this._grid.search();
                },
                finishDelete: function (t, e) {
                    this._grid.search();
                },
            }),
            (t.loadStrategies = { DirectLoadingStrategy: s, PageLoadingStrategy: n });
    })(jsGrid, jQuery),
    (function (t, e, i) {
        var s = function (t) {
                return null != t;
            },
            n = {
                string: function (t, e) {
                    return s(t) || s(e) ? (s(t) ? (s(e) ? ("" + t).localeCompare("" + e) : 1) : -1) : 0;
                },
                number: function (t, e) {
                    return t - e;
                },
                date: function (t, e) {
                    return t - e;
                },
                numberAsString: function (t, e) {
                    return parseFloat(t) - parseFloat(e);
                },
            };
        t.sortStrategies = n;
    })(jsGrid, jQuery),
    (function (t, a, e) {
        function i(t) {
            this._init(t);
        }
        (i.prototype = {
            _init: function (t) {
                a.extend(!0, this, t);
            },
            validate: function (s) {
                var n = [];
                return (
                    a.each(this._normalizeRules(s.rules), function (t, e) {
                        if (!e.validator(s.value, s.item, e.param)) {
                            var i = a.isFunction(e.message) ? e.message(s.value, s.item) : e.message;
                            n.push(i);
                        }
                    }),
                    n
                );
            },
            _normalizeRules: function (t) {
                return (
                    a.isArray(t) || (t = [t]),
                    a.map(
                        t,
                        a.proxy(function (t) {
                            return this._normalizeRule(t);
                        }, this)
                    )
                );
            },
            _normalizeRule: function (t) {
                if (("string" == typeof t && (t = { validator: t }), a.isFunction(t) && (t = { validator: t }), !a.isPlainObject(t))) throw Error("wrong validation config specified");
                return (t = a.extend({}, t)), a.isFunction(t.validator) ? t : this._applyNamedValidator(t, t.validator);
            },
            _applyNamedValidator: function (t, e) {
                delete t.validator;
                var i = s[e];
                if (!i) throw Error('unknown validator "' + e + '"');
                return a.isFunction(i) && (i = { validator: i }), a.extend({}, i, t);
            },
        }),
            (t.Validation = i);
        var s = {
            required: {
                message: "Field is required",
                validator: function (t) {
                    return t !== e && null !== t && "" !== t;
                },
            },
            rangeLength: {
                message: "Field value length is out of the defined range",
                validator: function (t, e, i) {
                    return t.length >= i[0] && t.length <= i[1];
                },
            },
            minLength: {
                message: "Field value is too long",
                validator: function (t, e, i) {
                    return t.length >= i;
                },
            },
            maxLength: {
                message: "Field value is too short",
                validator: function (t, e, i) {
                    return t.length <= i;
                },
            },
            pattern: {
                message: "Field value is not matching the defined pattern",
                validator: function (t, e, i) {
                    return "string" == typeof i && (i = new RegExp("^(?:" + i + ")$")), i.test(t);
                },
            },
            range: {
                message: "Field value is out of the defined range",
                validator: function (t, e, i) {
                    return t >= i[0] && t <= i[1];
                },
            },
            min: {
                message: "Field value is too large",
                validator: function (t, e, i) {
                    return i <= t;
                },
            },
            max: {
                message: "Field value is too small",
                validator: function (t, e, i) {
                    return t <= i;
                },
            },
        };
        t.validators = s;
    })(jsGrid, jQuery),
    (function (e, i, t) {
        function s(t) {
            i.extend(!0, this, t), (this.sortingFunc = this._getSortingFunc());
        }
        (s.prototype = {
            name: "",
            title: null,
            css: "",
            align: "",
            width: 100,
            visible: !0,
            filtering: !0,
            inserting: !0,
            editing: !0,
            sorting: !0,
            sorter: "string",
            headerTemplate: function () {
                return this.title === t || null === this.title ? this.name : this.title;
            },
            itemTemplate: function (t, e) {
                return t;
            },
            filterTemplate: function () {
                return "";
            },
            insertTemplate: function () {
                return "";
            },
            editTemplate: function (t, e) {
                return (this._value = t), this.itemTemplate(t, e);
            },
            filterValue: function () {
                return "";
            },
            insertValue: function () {
                return "";
            },
            editValue: function () {
                return this._value;
            },
            _getSortingFunc: function () {
                var t = this.sorter;
                if (i.isFunction(t)) return t;
                if ("string" == typeof t) return e.sortStrategies[t];
                throw Error('wrong sorter for the field "' + this.name + '"!');
            },
        }),
            (e.Field = s);
    })(jsGrid, jQuery),
    (function (t, e, i) {
        function s(t) {
            n.call(this, t);
        }
        var n = t.Field;
        (s.prototype = new n({
            autosearch: !0,
            readOnly: !1,
            filterTemplate: function () {
                if (!this.filtering) return "";
                var e = this._grid,
                    t = (this.filterControl = this._createTextBox());
                return (
                    this.autosearch &&
                        t.on("keypress", function (t) {
                            13 === t.which && (e.search(), t.preventDefault());
                        }),
                    t
                );
            },
            insertTemplate: function () {
                return this.inserting ? (this.insertControl = this._createTextBox()) : "";
            },
            editTemplate: function (t) {
                if (!this.editing) return this.itemTemplate(t);
                var e = (this.editControl = this._createTextBox());
                return e.val(t), e;
            },
            filterValue: function () {
                return this.filterControl.val();
            },
            insertValue: function () {
                return this.insertControl.val();
            },
            editValue: function () {
                return this.editControl.val();
            },
            _createTextBox: function () {
                return e("<input>").attr("type", "text").prop("readonly", !!this.readOnly);
            },
        })),
            (t.fields.text = t.TextField = s);
    })(jsGrid, jQuery),
    (function (t, e, i) {
        function s(t) {
            n.call(this, t);
        }
        var n = t.TextField;
        (s.prototype = new n({
            sorter: "number",
            align: "right",
            readOnly: !1,
            filterValue: function () {
                return parseInt(this.filterControl.val() || 0, 10);
            },
            insertValue: function () {
                return parseInt(this.insertControl.val() || 0, 10);
            },
            editValue: function () {
                return parseInt(this.editControl.val() || 0, 10);
            },
            _createTextBox: function () {
                return e("<input>").attr("type", "number").prop("readonly", !!this.readOnly);
            },
        })),
            (t.fields.number = t.NumberField = s);
    })(jsGrid, jQuery),
    (function (t, e, i) {
        function s(t) {
            n.call(this, t);
        }
        var n = t.TextField;
        (s.prototype = new n({
            insertTemplate: function () {
                return this.inserting ? (this.insertControl = this._createTextArea()) : "";
            },
            editTemplate: function (t) {
                if (!this.editing) return this.itemTemplate(t);
                var e = (this.editControl = this._createTextArea());
                return e.val(t), e;
            },
            _createTextArea: function () {
                return e("<textarea>").prop("readonly", !!this.readOnly);
            },
        })),
            (t.fields.textarea = t.TextAreaField = s);
    })(jsGrid, jQuery),
    (function (t, d, o) {
        function e(t) {
            (this.items = []), (this.selectedIndex = -1), (this.valueField = ""), (this.textField = ""), t.valueField && t.items.length && (this.valueType = typeof t.items[0][t.valueField]), (this.sorter = this.valueType), i.call(this, t);
        }
        var i = t.NumberField;
        (e.prototype = new i({
            align: "center",
            valueType: "number",
            itemTemplate: function (i) {
                var t = this.items,
                    s = this.valueField,
                    e = this.textField,
                    n;
                n = s
                    ? d.grep(t, function (t, e) {
                          return t[s] === i;
                      })[0] || {}
                    : t[i];
                var a = e ? n[e] : n;
                return a === o || null === a ? "" : a;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";
                var e = this._grid,
                    t = (this.filterControl = this._createSelect());
                return (
                    this.autosearch &&
                        t.on("change", function (t) {
                            e.search();
                        }),
                    t
                );
            },
            insertTemplate: function () {
                return this.inserting ? (this.insertControl = this._createSelect()) : "";
            },
            editTemplate: function (t) {
                if (!this.editing) return this.itemTemplate(t);
                var e = (this.editControl = this._createSelect());
                return t !== o && e.val(t), e;
            },
            filterValue: function () {
                var t = this.filterControl.val();
                return "number" === this.valueType ? parseInt(t || 0, 10) : t;
            },
            insertValue: function () {
                var t = this.insertControl.val();
                return "number" === this.valueType ? parseInt(t || 0, 10) : t;
            },
            editValue: function () {
                var t = this.editControl.val();
                return "number" === this.valueType ? parseInt(t || 0, 10) : t;
            },
            _createSelect: function () {
                var a = d("<select>"),
                    o = this.valueField,
                    r = this.textField,
                    l = this.selectedIndex;
                return (
                    d.each(this.items, function (t, e) {
                        var i = o ? e[o] : t,
                            s = r ? e[r] : e,
                            n;
                        d("<option>")
                            .attr("value", i)
                            .text(s)
                            .appendTo(a)
                            .prop("selected", l === t);
                    }),
                    a.prop("disabled", !!this.readOnly),
                    a
                );
            },
        })),
            (t.fields.select = t.SelectField = e);
    })(jsGrid, jQuery),
    (function (t, i, e) {
        function s(t) {
            n.call(this, t);
        }
        var n = t.Field;
        (s.prototype = new n({
            sorter: "number",
            align: "center",
            autosearch: !0,
            itemTemplate: function (t) {
                return this._createCheckbox().prop({ checked: t, disabled: !0 });
            },
            filterTemplate: function () {
                if (!this.filtering) return "";
                var t = this._grid,
                    e = (this.filterControl = this._createCheckbox());
                return (
                    e.prop({ readOnly: !0, indeterminate: !0 }),
                    e.on("click", function () {
                        var t = i(this);
                        t.prop("readOnly") ? t.prop({ checked: !1, readOnly: !1 }) : t.prop("checked") || t.prop({ readOnly: !0, indeterminate: !0 });
                    }),
                    this.autosearch &&
                        e.on("click", function () {
                            t.search();
                        }),
                    e
                );
            },
            insertTemplate: function () {
                return this.inserting ? (this.insertControl = this._createCheckbox()) : "";
            },
            editTemplate: function (t) {
                if (!this.editing) return this.itemTemplate(t);
                var e = (this.editControl = this._createCheckbox());
                return e.prop("checked", t), e;
            },
            filterValue: function () {
                return this.filterControl.get(0).indeterminate ? e : this.filterControl.is(":checked");
            },
            insertValue: function () {
                return this.insertControl.is(":checked");
            },
            editValue: function () {
                return this.editControl.is(":checked");
            },
            _createCheckbox: function () {
                return i("<input>").attr("type", "checkbox");
            },
        })),
            (t.fields.checkbox = t.CheckboxField = s);
    })(jsGrid, jQuery),
    (function (t, o, e) {
        function i(t) {
            s.call(this, t), (this._configInitialized = !1);
        }
        var s = t.Field;
        (i.prototype = new s({
            css: "jsgrid-control-field",
            align: "center",
            width: 50,
            filtering: !1,
            inserting: !1,
            editing: !1,
            sorting: !1,
            buttonClass: "jsgrid-button",
            modeButtonClass: "jsgrid-mode-button",
            modeOnButtonClass: "jsgrid-mode-on-button",
            searchModeButtonClass: "jsgrid-search-mode-button",
            insertModeButtonClass: "jsgrid-insert-mode-button",
            editButtonClass: "jsgrid-edit-button",
            deleteButtonClass: "jsgrid-delete-button",
            searchButtonClass: "jsgrid-search-button",
            clearFilterButtonClass: "jsgrid-clear-filter-button",
            insertButtonClass: "jsgrid-insert-button",
            updateButtonClass: "jsgrid-update-button",
            cancelEditButtonClass: "jsgrid-cancel-edit-button",
            searchModeButtonTooltip: "Switch to searching",
            insertModeButtonTooltip: "Switch to inserting",
            editButtonTooltip: "Edit",
            deleteButtonTooltip: "Delete",
            searchButtonTooltip: "Search",
            clearFilterButtonTooltip: "Clear filter",
            insertButtonTooltip: "Insert",
            updateButtonTooltip: "Update",
            cancelEditButtonTooltip: "Cancel edit",
            editButton: !0,
            deleteButton: !0,
            clearFilterButton: !0,
            modeSwitchButton: !0,
            _initConfig: function () {
                (this._hasFiltering = this._grid.filtering), (this._hasInserting = this._grid.inserting), this._hasInserting && this.modeSwitchButton && (this._grid.inserting = !1), (this._configInitialized = !0);
            },
            headerTemplate: function () {
                this._configInitialized || this._initConfig();
                var t = this._hasFiltering,
                    e = this._hasInserting;
                return this.modeSwitchButton && (t || e) ? (t && !e ? this._createFilterSwitchButton() : e && !t ? this._createInsertSwitchButton() : this._createModeSwitchButton()) : "";
            },
            itemTemplate: function (t, e) {
                var i = o([]);
                return this.editButton && (i = i.add(this._createEditButton(e))), this.deleteButton && (i = i.add(this._createDeleteButton(e))), i;
            },
            filterTemplate: function () {
                var t = this._createSearchButton();
                return this.clearFilterButton ? t.add(this._createClearFilterButton()) : t;
            },
            insertTemplate: function () {
                return this._createInsertButton();
            },
            editTemplate: function () {
                return this._createUpdateButton().add(this._createCancelEditButton());
            },
            _createFilterSwitchButton: function () {
                return this._createOnOffSwitchButton("filtering", this.searchModeButtonClass, !0);
            },
            _createInsertSwitchButton: function () {
                return this._createOnOffSwitchButton("inserting", this.insertModeButtonClass, !1);
            },
            _createOnOffSwitchButton: function (e, t, i) {
                var s = i,
                    n = o.proxy(function () {
                        a.toggleClass(this.modeOnButtonClass, s);
                    }, this),
                    a = this._createGridButton(this.modeButtonClass + " " + t, "", function (t) {
                        (s = !s), t.option(e, s), n();
                    });
                return n(), a;
            },
            _createModeSwitchButton: function () {
                var e = !1,
                    i = o.proxy(function () {
                        t.attr("title", e ? this.searchModeButtonTooltip : this.insertModeButtonTooltip)
                            .toggleClass(this.insertModeButtonClass, !e)
                            .toggleClass(this.searchModeButtonClass, e);
                    }, this),
                    t = this._createGridButton(this.modeButtonClass, "", function (t) {
                        (e = !e), t.option("inserting", e), t.option("filtering", !e), i();
                    });
                return i(), t;
            },
            _createEditButton: function (i) {
                return this._createGridButton(this.editButtonClass, this.editButtonTooltip, function (t, e) {
                    t.editItem(i), e.stopPropagation();
                });
            },
            _createDeleteButton: function (i) {
                return this._createGridButton(this.deleteButtonClass, this.deleteButtonTooltip, function (t, e) {
                    t.deleteItem(i), e.stopPropagation();
                });
            },
            _createSearchButton: function () {
                return this._createGridButton(this.searchButtonClass, this.searchButtonTooltip, function (t) {
                    t.search();
                });
            },
            _createClearFilterButton: function () {
                return this._createGridButton(this.clearFilterButtonClass, this.clearFilterButtonTooltip, function (t) {
                    t.clearFilter();
                });
            },
            _createInsertButton: function () {
                return this._createGridButton(this.insertButtonClass, this.insertButtonTooltip, function (t) {
                    t.insertItem().done(function () {
                        t.clearInsert();
                    });
                });
            },
            _createUpdateButton: function () {
                return this._createGridButton(this.updateButtonClass, this.updateButtonTooltip, function (t, e) {
                    t.updateItem(), e.stopPropagation();
                });
            },
            _createCancelEditButton: function () {
                return this._createGridButton(this.cancelEditButtonClass, this.cancelEditButtonTooltip, function (t, e) {
                    t.cancelEdit(), e.stopPropagation();
                });
            },
            _createGridButton: function (t, e, i) {
                var s = this._grid;
                return o("<input>")
                    .addClass(this.buttonClass)
                    .addClass(t)
                    .attr({ type: "button", title: e })
                    .on("click", function (t) {
                        i(s, t);
                    });
            },
            editValue: function () {
                return "";
            },
        })),
            (t.fields.control = t.ControlField = i);
    })(jsGrid, jQuery),
    void 0 === psLib)
)
    var psLib = {};
(psLib.Sharer = function (t) {
    $(".ps-sharer-facebook, .ps-sharer-twitter, .ps-sharer-linkedIn, .ps-sharer-googlePlus", t).each(function () {
        var t = $(this),
            e = encodeURIComponent(location.href);
        t.is(".ps-sharer-facebook")
            ? (e = "https://www.facebook.com/sharer/sharer.php?u=" + e)
            : t.is(".ps-sharer-twitter")
            ? (void 0 !== t.data("sharertwittertext") && (e += "&text=" + encodeURIComponent(t.data("sharertwittertext"))),
              void 0 !== t.data("sharertwitterhashtags") && (e += "&hashtags=" + encodeURIComponent(t.data("sharertwitterhashtags"))),
              (e = "https://twitter.com/intent/tweet?url=" + e))
            : t.is(".ps-sharer-googlePlus")
            ? (e = "https://plus.google.com/share?url=" + e)
            : t.is(".ps-sharer-linkedIn") &&
              (void 0 !== t.data("sharerlinkedinsource") ? (e += "&source=" + encodeURIComponent(t.data("sharerlinkedinsource"))) : (e += "&source=" + encodeURIComponent("Porto Seguro")),
              void 0 !== t.data("sharerlinkedintitle") && (e += "&title=" + encodeURIComponent(t.data("sharerlinkedintitle"))),
              void 0 !== t.data("sharerlinkedinsummary") && (e += "&summary=" + encodeURIComponent(t.data("sharerlinkedinsummary"))),
              (e = "http://www.linkedin.com/shareArticle?mini=true&url=" + e)),
            t.attr({ target: "_blank", href: e });
    });
}),
    (function (y) {
        y.fn.psScrollBar = function (t) {
            var e = function () {
                    s(), (w.scrollbarX = w.trackX.find("." + b.CSS.scrollbar)), (w.scrollbarY = w.trackY.find("." + b.CSS.scrollbar));
                    var t = (void 0 !== w.scrollbarWidth ? w.scrollbarWidth : w.offsetSize) + "px";
                    w.scrollContentEl.css({ paddingRight: t });
                    var e = "-" + (void 0 !== w.scrollbarWidth ? 2 * w.scrollbarWidth : w.offsetSize) + "px";
                    w.scrollContentEl.css({ marginBottom: e });
                    var i = (void 0 !== w.scrollbarWidth ? w.scrollbarWidth : w.offsetSize) + "px";
                    w.contentEl.css({ paddingBottom: i }), 0 !== w.scrollbarWidth && w.contentEl.css({ marginRight: "-" + w.scrollbarWidth + "px" }), f(), n();
                },
                s = function () {
                    var t;
                    if (
                        (0 < w.children("." + b.CSS.scrollContent).length
                            ? ((w.trackX = w.find("." + b.CSS.track + ".horizontal")),
                              (w.trackY = w.find("." + b.CSS.track + ".vertical")),
                              (w.scrollContentEl = w.find("." + b.CSS.scrollContent)),
                              (w.contentEl = w.find("." + b.CSS.content)))
                            : ((w.scrollContentEl = y("<div/>")),
                              (w.contentEl = y("<div/>")),
                              w.scrollContentEl.addClass(b.CSS.scrollContent),
                              w.contentEl.addClass(b.CSS.content),
                              w.children().each(function () {
                                  w.contentEl.append(y(this));
                              }),
                              w.scrollContentEl.prepend(w.contentEl),
                              w.prepend(w.scrollContentEl)),
                        !w.trackX || !w.trackY)
                    ) {
                        var e = y("<div/>"),
                            i = y("<div/>");
                        e.addClass(b.CSS.track),
                            i.addClass(b.CSS.scrollbar),
                            e.append(i),
                            (w.trackX = e.clone(!0)),
                            w.trackX.addClass("horizontal"),
                            (w.trackY = e.clone(!0)),
                            w.trackY.addClass("vertical"),
                            w.prepend(w.trackX),
                            w.prepend(w.trackY);
                    }
                    w.attr("data-ps-scrollbar", "init");
                },
                n = function () {
                    b.autoHide &&
                        w.bind("mouseenter", function () {
                            o();
                        }),
                        w.scrollbarY.bind("mousedown", function (t) {
                            l(t);
                        }),
                        w.scrollbarX.bind("mousedown", function (t) {
                            r(t);
                        }),
                        w.scrollContentEl.bind("scroll", function (t) {
                            a(t);
                        }),
                        w.contentEl.bind("scroll", function (t) {
                            i(t);
                        }),
                        y(window).bind("resize", function () {
                            f();
                        });
                },
                i = function () {
                    p("x");
                },
                a = function () {
                    p("y");
                },
                o = function () {
                    p("x"), p("y");
                },
                r = function (t) {
                    d(t, "x");
                },
                l = function (t) {
                    d(t, "y");
                },
                d = function (t, e) {
                    t.preventDefault();
                    var i = "y" === (e = void 0 !== e ? e : "y") ? w.scrollbarY : w.scrollbarX,
                        s = "y" === e ? t.pageY : t.pageX;
                    (w.dragOffset[e] = s - i.get(0).getBoundingClientRect()[w.offsetAttr[e]]),
                        (w.currentAxis = e),
                        y(document).bind("mousemove", function (t) {
                            c(t);
                        }),
                        y(document).bind("mouseup", function (t) {
                            h(t);
                        });
                },
                c = function (t) {
                    var e, i, s;
                    t.preventDefault(), (s = "y" === w.currentAxis ? ((e = t.pageY), (i = w.trackY), w.scrollContentEl) : ((e = t.pageX), (i = w.trackX), w.contentEl));
                    var n,
                        a,
                        o = ((e - i[0].getBoundingClientRect()[w.offsetAttr[w.currentAxis]] - w.dragOffset[w.currentAxis]) / i.get(0)[w.sizeAttr[w.currentAxis]]) * w.contentEl.get(0)[w.scrollSizeAttr[w.currentAxis]];
                    s.get(0)[w.scrollOffsetAttr[w.currentAxis]] = o;
                },
                h = function () {
                    y(document).unbind("mousemove"), y(document).unbind("mouseup");
                },
                u = function () {
                    w.scrollbarX.removeClass("visible"), w.scrollbarY.removeClass("visible"), "number" == typeof w.flashTimeout && window.clearTimeout(w.flashTimeout);
                },
                p = function (t) {
                    g((t = void 0 !== t ? t : "y")), m(t);
                },
                f = function () {
                    console.log("recalculate()"),
                        (w.contentSizeX = w.contentEl.get(0)[w.scrollSizeAttr.x]),
                        (w.contentSizeY = w.contentEl.get(0)[w.scrollSizeAttr.y] - (void 0 !== w.scrollbarWidth || null !== w.scrollbarWidth ? w.scrollbarWidth : w.offsetSize)),
                        (w.scrollbarXSize = w.trackX.get(0)[w.sizeAttr.x]),
                        (w.scrollbarYSize = w.trackY.get(0)[w.sizeAttr.y]),
                        g("x"),
                        g("y"),
                        b.autoHide || (m("x"), m("y"));
                },
                g = function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a,
                        o =
                            (a =
                                "x" === (t = void 0 !== t ? t : "y")
                                    ? ((e = w.trackX), (i = w.scrollbarX), (s = w.contentEl.get(0)[w.scrollOffsetAttr[t]]), (n = w.contentSizeX), w.scrollbarXSize)
                                    : ((e = w.trackY), (i = w.scrollbarY), (s = w.scrollContentEl.get(0)[w.scrollOffsetAttr[t]]), (n = w.contentSizeY), w.scrollbarYSize)) / n,
                        r = s / (n - a),
                        l = Math.max(~~(o * (a - 2)) - 2, b.scrollbarMinSize),
                        d = ~~((a - 4 - l) * r + 2);
                    (w.isVisible[t] = a < n), w.isVisible[t] ? (e.css({ visibility: "visible" }), "x" === t ? i.css({ left: d + "px", width: l + "px" }) : i.css({ top: d + "px", height: l + "px" })) : e.css({ visibility: "hidden" });
                },
                m = function (t) {
                    (t = void 0 !== t ? t : "y"),
                        w.isVisible[t] &&
                            ("x" === t ? w.scrollbarX.addClass("visible") : w.scrollbarY.addClass("visible"),
                            b.autoHide &&
                                ("number" == typeof w.flashTimeout && window.clearTimeout(w.flashTimeout),
                                (w.flashTimeout = window.setTimeout(function () {
                                    u();
                                }, 1e3))));
                },
                v = function () {
                    var t = document.createElement("p");
                    (t.style.width = "100%"), (t.style.height = "200px");
                    var e = document.createElement("div");
                    (e.style.position = "absolute"),
                        (e.style.top = "0px"),
                        (e.style.left = "0px"),
                        (e.style.visibility = "hidden"),
                        (e.style.width = "200px"),
                        (e.style.height = "150px"),
                        (e.style.overflow = "hidden"),
                        e.appendChild(t),
                        document.body.appendChild(e);
                    var i = t.offsetWidth;
                    e.style.overflow = "scroll";
                    var s = t.offsetWidth;
                    return i == s && (s = e.clientWidth), document.body.removeChild(e), i - s;
                },
                b = y.extend({ autoHide: !0, CSS: { content: "ps-scrollbar-content", scrollContent: "ps-scrollbar-scroll-content", scrollbar: "ps-scrollbar-scrollbar", track: "ps-scrollbar-track" }, scrollbarMinSize: 25 }, t),
                w = this;
            return (
                (w.flashTimeout = 1e3),
                (w.content = null),
                (w.scrollContent = null),
                (w.dragOffset = { x: 0, y: 0 }),
                (w.isVisible = { x: !0, y: !0 }),
                (w.scrollOffsetAttr = { x: "scrollLeft", y: "scrollTop" }),
                (w.sizeAttr = { x: "offsetWidth", y: "offsetHeight" }),
                (w.scrollSizeAttr = { x: "scrollWidth", y: "scrollHeight" }),
                (w.offsetAttr = { x: "left", y: "top" }),
                (w.currentAxis = null),
                (w.scrollbarWidth = v()),
                (w.offsetSize = 20),
                (w.recalculate = function () {
                    f();
                }),
                e(),
                w
            );
        };
    })(jQuery),
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
//# sourceMappingURL=ps-lib.full-min.js.map
