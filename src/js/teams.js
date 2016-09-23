(function($, Snap) {
    $(function() {
        var snap = Snap(500, 500);
        var sector = drawTeamChart(snap, {x:250, y:250}, 50, 95, teams);
    });

    function radiansToDegrees(rad) {
        return 360 * rad/(2*Math.PI);
    }

    function drawTeamChart(snap, center, rIn, rOut, teams) {
        var delta = 2*Math.PI / teams.length;
        teams.forEach(function(team, i) {
            var teamSlice = drawTeamSlice(snap, center, rIn, rOut, i * delta, delta, team);

            function hoverIn() {
                teamSlice.animate({
                    transform: 't' + 10*Math.cos(i*delta + delta/2) + ' ' + 10*Math.sin(i*delta + delta/2)
                }, 500, mina.linear);
            }
            function hoverOut() {
                teamSlice.animate({
                    transform: 't0 0'
                }, 500, mina.linear);
            }
            $('#'+team.attr.id).hover(hoverIn, hoverOut);
        })
    }

    function drawTeamSlice(snap, center, rIn, rOut, theta, delta, team) {
        var slice = drawPieSlice(snap, center, rIn, rOut, theta, delta, team.attr);

        var rMid = (rIn + rOut)/2;
        var startMid = {
            x: center.x + rMid * Math.cos(theta),
            y: center.y + rMid * Math.sin(theta)
        };
        var endMid = {
            x: center.x + rMid * Math.cos(theta + delta),
            y: center.y + rMid * Math.sin(theta + delta)
        };
        var textAnchor = {
            x: center.x + rMid * Math.cos(theta + delta/2),
            y: center.y + rMid * Math.sin(theta + delta/2)
        };

        var x = center.x + rMid * Math.cos(theta + delta/2);
        var y = center.y + rMid * Math.sin(theta + delta/2);

        snap.circle(textAnchor.x, textAnchor.y, 2);
        var largeArc = delta > 180 ? 1 : 0;
        var textPath = 'M' + startMid.x + ' ' + startMid.y + ' A' + rMid + ' ' + rMid + ' ' + 0 + ' ' + largeArc + ' ' + 1 + ' ' + endMid.x + ' ' + endMid.y

        var label = snap.text(startMid.x, startMid.y, team.name);
        label.attr({'textpath': textPath, 'text-anchor': 'middle'});

        return snap.group(slice, label);
    }

    function drawPieSlice(snap, center, rIn, rOut, theta, delta, attr) {
        var startOut = {
            x: center.x + rOut * Math.cos(theta),
            y: center.y + rOut * Math.sin(theta)
        };
        var endOut = {
            x: center.x + rOut * Math.cos(theta + delta),
            y: center.y + rOut * Math.sin(theta + delta)
        };
        var startIn = {
            x: center.x + rIn * Math.cos(theta + delta),
            y: center.y + rIn * Math.sin(theta + delta)
        };
        var endIn = {
            x: center.x + rIn * Math.cos(theta),
            y: center.y + rIn * Math.sin(theta)
        };
        var largeArc = delta > 180 ? 1 : 0;
        var path = "M" + startOut.x + " " + startOut.y +
            "A" + rOut + " " + rOut + " 0 " +
            largeArc + " 1 " + endOut.x + " " + endOut.y +
            "L" + startIn.x + " " + startIn.y +
            "A" + rIn + " " + rIn + " 0 " +
            largeArc + " 0 " + endIn.x + " " + endIn.y +
            "L" + startOut.x + " " + startOut.y + "Z";

        var path = snap.path(path);
        path.attr(attr);

        return path;
    }
})(jQuery, Snap);
