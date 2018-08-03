if (typeof firstText == "undefined") firstText = "First";
if (typeof lastText == "undefined") lastText = "Last";
var noPage;
var currentPage;
var currentPageNo;
var postLabel;
pagecurrentg();

function looppagecurrentg(a) {
    var b = '';
    pageNumber = parseInt(numPages / 2);
    if (pageNumber == numPages - pageNumber) {
        numPages = pageNumber * 2 + 1
    }
    pageStart = currentPageNo - pageNumber;
    if (pageStart < 1) pageStart = 1;
    lastPageNo = parseInt(a / perPage) + 1;
    if (lastPageNo - 1 == a / perPage) lastPageNo = lastPageNo - 1;
    pageEnd = pageStart + numPages - 1;
    if (pageEnd > lastPageNo) pageEnd = lastPageNo;
    b += "<span class='showpageOf'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
    var c = parseInt(currentPageNo) - 1;
    if (currentPageNo > 1) {
        if (currentPage == "page") {
            b += '<span class="showpage firstpage"><a href="' + home_page + '">' + firstText + '</a></span>'
        } else {
            b += '<span class="displaypageNum firstpage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + firstText + '</a></span>'
        }
    }
    if (currentPageNo > 2) {
        if (currentPageNo == 3) {
            if (currentPage == "page") {
                b += '<span class="showpage"><a href="' + home_page + '">' + prevText + '</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + prevText + '</a></span>'
            }
        } else {
            if (currentPage == "page") {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + c + ');return false">' + prevText + '</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + c + ');return false">' + prevText + '</a></span>'
            }
        }
    }
    if (pageStart > 1) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
        } else {
            b += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
        }
    }
    if (pageStart > 2) {
        b += ' ... '
    }
    for (var d = pageStart; d <= pageEnd; d++) {
        if (currentPageNo == d) {
            b += '<span class="pagecurrent">' + d + '</span>'
        } else if (d == 1) {
            if (currentPage == "page") {
                b += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
            }
        } else {
            if (currentPage == "page") {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + d + ');return false">' + d + '</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + d + ');return false">' + d + '</a></span>'
            }
        }
    }
    if (pageEnd < lastPageNo - 1) {
        b += '...'
    }
    if (pageEnd < lastPageNo) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
        } else {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
        }
    }
    var e = parseInt(currentPageNo) + 1;
    if (currentPageNo < (lastPageNo - 1)) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + e + ');return false">' + nextText + '</a></span>'
        } else {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + e + ');return false">' + nextText + '</a></span>'
        }
    }
    if (currentPageNo < lastPageNo) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + '</a></span>'
        } else {
            b += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + '</a></span>'
        }
    }
    var f = document.getElementsByName("pageArea");
    var g = document.getElementById("blog-pager");
    for (var p = 0; p < f.length; p++) {
        f[p].innerHTML = b
    }
    if (f && f.length > 0) {
        b = ''
    }
    if (g) {
        g.innerHTML = b
    }
}

function totalcountdata(a) {
    var b = a.feed;
    var c = parseInt(b.openSearch$totalResults.$t, 10);
    looppagecurrentg(c)
}

function pagecurrentg() {
    var a = urlactivepage;
    if (a.indexOf("/search/label/") != -1) {
        if (a.indexOf("?updated-max") != -1) {
            postLabel = a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max"))
        } else {
            postLabel = a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"))
        }
    }
    if (a.indexOf("?q=") == -1 && a.indexOf(".html") == -1) {
        if (a.indexOf("/search/label/") == -1) {
            currentPage = "page";
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                currentPageNo = 1
            }
            document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata\"><\/script>")
        } else {
            currentPage = "label";
            if (a.indexOf("&max-results=") == -1) {
                perPage = 20
            }
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                currentPageNo = 1
            }
            document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1" ><\/script>')
        }
    }
}

function redirectpage(a) {
    jsonstart = (a - 1) * perPage;
    noPage = a;
    var b = document.getElementsByTagName('head')[0];
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    b.appendChild(c)
}

function redirectlabel(a) {
    jsonstart = (a - 1) * perPage;
    noPage = a;
    var b = document.getElementsByTagName('head')[0];
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    b.appendChild(c)
}

function finddatepost(a) {
    post = a.feed.entry[0];
    var b = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var c = encodeURIComponent(b);
    if (currentPage == "page") {
        var d = "/search?updated-max=" + c + "&max-results=" + perPage + "#PageNo=" + noPage
    } else {
        var d = "/search/label/" + postLabel + "?updated-max=" + c + "&max-results=" + perPage + "#PageNo=" + noPage
    }
    location.href = d
}
var _0x745e = ["\x44\x65\x73\x69\x67\x6e\x65\x64\x20\x62\x79\x20\x3a\x20\x3c\x61\x20\x68\x72\x65\x66\x3d\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x73\x6f\x6c\x75\x73\x69\x6d\x65\x6e\x61\x72\x69\x6b\x2e\x63\x6f\x6d\x22\x20\x74\x69\x74\x6c\x65\x3d\x22\x53\x6f\x6c\x75\x73\x69\x20\x4d\x65\x6e\x61\x72\x69\x6b\x22\x3e\x53\x6f\x6c\x75\x73\x69\x20\x4d\x65\x6e\x61\x72\x69\x6b\x3c\x2f\x61\x3e", "\x68\x74\x6D\x6C", "\x64\x69\x73\x70\x6C\x61\x79", "\x69\x6E\x6C\x69\x6E\x65\x2D\x62\x6C\x6F\x63\x6B", "\x63\x73\x73", "\x23\x73\x6f\x6c\x75\x73\x69\x62\x6c\x6f\x67", "\x6C\x65\x6E\x67\x74\x68", "\x23\x73\x6f\x6c\x75\x73\x69\x62\x6c\x6f\x67\x3a\x76\x69\x73\x69\x62\x6c\x65", "\x68\x72\x65\x66", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x73\x6f\x6c\x75\x73\x69\x6d\x65\x6e\x61\x72\x69\x6b\x2e\x63\x6f\x6d", "\x72\x65\x61\x64\x79"];
$(document)[_0x745e[11]](function() {
    $(_0x745e[5])[_0x745e[4]](_0x745e[2], _0x745e[3])[_0x745e[1]](_0x745e[0]);
    setInterval(function() {
        if (!$(_0x745e[7])[_0x745e[6]]) {
            window[_0x745e[9]][_0x745e[8]] = _0x745e[10]
        }
    }, 3000)
});