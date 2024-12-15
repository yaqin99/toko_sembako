!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo={type:"Topology",objects:{ben:{type:"GeometryCollection",geometries:[{type:"Polygon",properties:{name:"Borgou"},id:"BJ.BO",arcs:[[0,1,2,3,4]]},{type:"Polygon",properties:{name:"Alibori"},id:"BJ.AL",arcs:[[-4,5,6]]},{type:"Polygon",properties:{name:"Collines"},id:"BJ.CL",arcs:[[7,8,9,10,11,-1]]},{type:"Polygon",properties:{name:"Atlantique"},id:"BJ.AQ",arcs:[[12,13,14,15,16,17]]},{type:"Polygon",properties:{name:"Littoral"},id:"BJ.LI",arcs:[[18,-13,19]]},{type:"Polygon",properties:{name:"Kouffo"},id:"BJ.CF",arcs:[[-16,20,21,22]]},{type:"Polygon",properties:{name:"Ouémé"},id:"BJ.OU",arcs:[[23,24,-20,-18,25]]},{type:"Polygon",properties:{name:"Zou"},id:"BJ.ZO",arcs:[[26,-26,-17,-23,27,-10]]},{type:"Polygon",properties:{name:"Plateau"},id:"BJ.PL",arcs:[[28,-24,-27,-9]]},{type:"Polygon",properties:{name:"Mono"},id:"BJ.CF",arcs:[[-15,29,-21]]},{type:"Polygon",properties:{name:"Atakora"},id:"BJ.AK",arcs:[[-6,-3,30,31]]},{type:"Polygon",properties:{name:"Donga"},id:"BJ.DO",arcs:[[-2,-12,32,-31]]}]}},arcs:[[[6378,4134],[-1,0],[-1715,9]],[[4662,4143],[27,57],[-19,10],[-10,3],[-20,4],[-325,45],[-65,15],[-30,10],[-25,10],[-22,12],[-20,13],[-12,11],[-11,14],[-14,33],[-5,26],[7,80],[7,18],[16,56],[21,39],[27,33],[4,9],[1,11],[-4,11],[-14,13],[-11,6],[-11,4],[-95,22],[-25,8],[-16,7],[-20,11],[-19,13],[-16,14],[-7,8],[-14,35],[-9,51],[1,92],[16,54],[47,70],[30,11],[25,7],[15,3],[53,5],[76,2],[123,-1],[18,1],[17,3],[14,4],[12,5],[19,9],[14,9],[12,21],[128,415],[0,23],[-29,29],[-55,24],[-66,34],[-43,34],[-6,7],[-63,90],[-4,21],[3,28],[28,85],[25,46],[0,31],[-29,79],[28,25],[2,1],[5,2],[4,7],[3,8],[-28,32]],[[4328,6171],[-14,31],[-1,6],[5,9],[11,12],[25,16],[18,8],[17,6],[31,7],[33,4],[177,3],[53,6],[129,22],[29,9],[24,10],[23,11],[11,8],[6,19],[3,33],[-25,115],[-47,74],[-10,26],[-49,62],[-16,12],[-20,13],[-83,38],[-19,13],[-12,12],[-3,4],[-3,9],[-1,24],[6,23],[21,27],[40,34],[81,53],[10,3],[10,5],[70,20]],[[4858,6958],[156,0],[170,19],[165,6],[165,14],[512,-19],[521,35],[178,-2],[474,-49],[785,33],[782,78],[1231,67],[1,0]],[[9998,7140],[1,-50],[-25,-43],[-82,-81],[-30,-43],[-3,-83],[-22,-30],[-49,-31],[-51,-3],[-208,53],[-68,6],[-64,-10],[-64,-31],[-21,-15],[-9,-10],[-3,-32],[-13,-19],[-82,-63],[-67,-73],[3,-30],[46,-37],[221,-112],[30,-20],[9,-26],[-9,-29],[-2,-9],[-30,-35],[-41,-15],[-47,-11],[-50,-24],[-22,-26],[-20,-138],[-33,-32],[-105,-62],[-85,-77],[-58,-26],[-195,10],[-127,-17],[-233,-47],[-53,-19],[-28,-32],[-8,-37],[12,-32],[40,-50],[25,-49],[-22,-42],[-106,-29],[-58,1],[-63,6],[-52,-8],[-25,-40],[4,-10],[17,-21],[-3,-8],[-199,-128],[-24,-11],[-52,-8],[-24,-9],[-62,-50],[-13,-45],[22,-45],[41,-51],[11,-27],[0,-104],[-20,-34],[-67,-63],[-108,-166],[-50,-50],[-80,-28],[-222,-28],[-38,0],[-32,7],[-32,11],[-35,9],[-36,2],[-99,-2],[-35,-3],[-35,-11],[-27,-15],[-32,-11],[-43,-3],[-251,10],[11,-43],[-7,-102],[-18,-44],[-11,-10],[-36,-27],[-8,-4],[5,-13],[14,-4],[16,-2],[13,-12],[-2,-24],[-40,-46],[-12,-25],[4,-15],[16,-25],[-4,-14],[-17,-8],[-55,-13],[-18,-12],[-1,-17],[0,-2]],[[4858,6958],[36,10],[-16,514],[6,27],[12,20],[33,28],[64,36],[193,80],[-105,50],[-38,13],[-9,1],[-15,1],[-16,3],[-16,5],[-29,6],[-40,4],[-31,1],[-160,112],[-633,557],[-15,9]],[[4079,8435],[428,213],[237,95],[174,48],[45,22],[12,15],[-3,18],[2,28],[35,46],[125,68],[46,42],[117,156],[-7,17],[-37,28],[-5,18],[19,20],[27,4],[31,-2],[28,4],[22,12],[25,23],[23,12],[32,1],[34,-6],[24,3],[2,27],[-7,21],[-21,7],[-31,4],[-34,8],[-34,13],[-23,13],[-18,16],[-110,152],[-31,90],[-3,36],[28,29],[79,17],[45,3],[74,-2],[42,2],[8,5],[26,18],[17,6],[24,-3],[19,-9],[16,-3],[19,17],[15,20],[23,4],[30,-2],[39,0],[9,-4],[5,-9],[10,-7],[24,1],[19,5],[29,14],[15,5],[116,15],[12,-1],[28,-8],[16,-1],[20,5],[39,14],[23,2],[114,-15],[30,8],[45,35],[11,13],[6,13],[9,11],[18,10],[35,6],[34,-11],[34,4],[30,12],[52,30],[36,12],[31,3],[66,-1],[33,3],[78,1],[38,25],[156,-68],[66,-18],[33,-17],[25,-20],[21,-36],[26,-14],[36,-9],[39,-7],[107,-6],[28,-4],[12,-8],[32,-30],[131,-95],[559,-250],[10,-8],[44,-16],[10,-9],[8,-35],[16,-36],[24,-30],[74,-61],[47,-26],[27,-13],[40,-13],[45,-6],[44,10],[46,14],[38,-4],[35,-10],[36,-6],[146,-44],[119,-21],[36,-12],[26,-12],[109,-76],[22,-10],[18,-5],[14,-7],[12,-12],[17,-26],[12,-12],[6,-15],[12,-12],[27,-7],[30,-26],[23,-9],[-72,-37],[-225,-188],[-39,-73],[-20,-25],[-65,-87],[5,-37],[49,-44],[582,-403],[78,-36],[27,-2],[31,2],[4,0],[26,0],[27,-13],[-33,-63],[0,-35],[13,-32],[24,-30],[34,-28],[66,-144],[-3,-48],[-71,-85],[-4,-28],[17,-19],[26,-14],[28,-11],[25,-14],[16,-18],[30,-53],[31,-17],[42,-7],[46,-4],[41,-12],[30,-31],[16,-47],[0,-39]],[[6378,4134],[63,-394],[8,-47],[-26,-55],[-25,-19],[-65,-36],[-17,-20],[-1,-14],[8,-30],[0,-15],[-25,-67],[-4,-31],[12,-39],[25,-35],[64,-68],[22,-34],[-2,-36],[-25,-29],[-34,-27],[-25,-28],[-9,-29],[-7,-97],[-41,-102],[-12,-102],[-12,-14],[-33,-31],[-7,-13],[2,-7],[1,-6],[26,-20],[37,-46],[78,-43],[29,-24],[9,-23],[-31,-218]],[[6361,2335],[-1,0],[-669,2],[-43,-1],[-49,-67],[-8,-46],[22,-42],[-7,-18],[-47,-7],[-32,-11],[-102,-71],[-38,-36],[8,-38],[23,-41]],[[5418,1959],[-583,132],[-229,36],[-189,9],[-171,-3],[-154,13],[-123,42],[-122,53],[-177,37],[-145,15],[-657,-19],[-64,3]],[[2804,2277],[0,28],[-3,321],[-2,256],[8,257],[6,186],[-35,138],[-16,15],[-20,3],[-9,7],[16,40],[0,28],[5,13],[107,88],[12,28],[-14,16],[-84,52],[-16,19],[-5,19],[-1,48]],[[2753,3839],[59,-2],[174,-3],[62,2],[17,0],[36,2],[282,37],[54,5],[39,1],[20,-2],[35,-7],[27,-9],[25,-10],[88,-47],[13,-4],[15,-5],[17,-3],[18,-3],[21,-1],[98,1],[20,-2],[15,-3],[14,-5],[12,-5],[48,-31],[24,-11],[28,-9],[31,-8],[95,-15],[14,-3],[38,-16],[15,-3],[18,-1],[79,0],[39,-4],[90,-16],[19,-2],[20,-1],[77,2],[55,7],[39,10],[28,8],[46,18],[25,19],[-18,9],[-23,39],[43,139],[-53,144],[-23,22],[-31,20],[25,50]],[[5548,294],[-153,-9],[-69,-10],[-57,-18],[-41,-19],[-30,-40]],[[5198,198],[-171,-8],[-261,-29],[-777,-44]],[[3989,117],[0,1],[2,13],[-11,30],[-28,42],[-50,36],[-10,49],[17,34],[71,91],[18,24],[9,19],[4,33],[-11,92],[-4,43],[4,15],[10,14],[25,20],[17,10],[26,14],[8,11],[6,17],[-4,30],[18,41]],[[4106,796],[43,44],[-3,32],[-6,20],[5,14],[11,16],[47,41],[27,15],[15,14],[51,65],[20,19],[16,25],[-30,39]],[[4302,1140],[978,2]],[[5280,1142],[111,-89],[32,-66],[11,-93],[13,-174],[3,-48],[23,-148],[36,-31],[18,-2],[19,-4],[14,-4],[39,-13],[14,-74],[-13,-39],[-52,-63]],[[5602,217],[-404,-19]],[[5548,294],[-10,-33],[24,-11],[16,-1],[16,-5],[8,-27]],[[4106,796],[-198,50],[-100,14],[-109,2],[-177,-19],[-205,-38],[-306,-35],[-71,0],[-54,4],[-178,42],[-14,3]],[[2694,819],[26,17],[13,25],[-19,39],[-25,33],[-14,28],[-2,27],[24,68],[-6,23],[-29,17],[-49,18],[-5,2],[-36,27],[-64,115],[246,-1],[59,9],[-2,237],[-2,235],[-2,241],[-2,159]],[[2805,2138],[105,-11],[69,-41],[25,-20],[170,-179],[19,-42],[12,-12],[18,-14],[6,-11],[5,-30],[13,-13],[26,-16],[50,-18],[126,-81],[15,-17],[12,-11],[42,-12],[50,-43],[42,-76],[31,-70],[40,-34],[22,-8],[19,-4],[52,-20],[68,-51],[53,-37],[52,-14],[44,-33],[15,-28],[7,-8],[18,-8],[111,-41],[28,-5],[21,-2],[34,7],[54,15],[23,-10]],[[5719,1260],[-6,-83],[31,-81],[156,-187],[67,-190],[62,-50],[158,-66],[50,-27],[127,-106],[1,-1]],[[6365,469],[-11,-15],[-12,-33],[-25,-73],[-1,-98],[-2,0],[-712,-33]],[[5280,1142],[5,33],[36,32],[53,35],[52,14],[91,4],[202,0]],[[5418,1959],[18,-30],[0,-72],[11,-14],[18,-12],[15,-16],[0,-25],[11,-19],[51,-96],[49,-53],[154,-52],[19,-11],[1,-9],[-4,-27],[72,-180],[16,-72],[-1,-1],[-3,-2],[-7,-5],[-14,-4],[-19,-1],[-24,-1],[-62,3]],[[2805,2138],[-1,139]],[[6361,2335],[-8,-53],[17,-63],[66,-60],[96,-57],[71,-59],[-8,-68],[-8,-14],[-2,-9],[-11,-3],[-70,6],[-34,1],[-25,-7],[-8,-18],[68,-398],[-3,-22],[-11,-16],[-26,-16],[-29,-31],[-15,-11],[-3,-11],[13,-21],[27,-17],[86,-35],[18,-15],[-12,-18],[-34,-9],[-41,-6],[-38,-9],[-84,-58],[10,-58],[44,-62],[16,-68],[-34,-68],[-9,-35],[17,-32],[24,-16],[28,-10],[33,-5],[41,-2],[19,-7],[6,-17],[11,-74],[-18,-18],[-40,-14],[-59,-25],[-37,-35],[-1,-33],[28,-68],[-7,-35],[-60,-87]],[[3989,117],[-335,-19],[-861,-98],[-23,34],[67,17],[418,49],[67,2],[-61,119],[-63,121],[-84,67],[-28,11],[-70,17],[-21,9],[-7,14],[8,35],[-4,16],[-21,14],[-54,22],[-8,11],[-4,19],[-24,4],[-32,-2],[-30,2],[-26,8],[-27,10],[-26,13],[-19,13],[-10,17],[2,15],[5,13],[0,13],[-36,32],[-42,17],[-21,18],[27,37],[48,32]],[[4328,6171],[-923,15],[-122,-23],[-114,-32],[-107,-43],[-138,-34],[-163,-19],[-205,11],[-138,15],[-158,10],[-137,2],[-184,-18],[-41,-8]],[[1898,6047],[-1,13],[-41,55],[-343,112],[-466,153],[-276,91],[-187,61],[-309,101],[-246,81],[-26,24],[-3,37],[45,167],[48,90],[2,63],[-25,146],[46,54],[177,83],[42,29],[10,17],[5,37],[6,17],[51,48],[-5,17],[-27,33],[-8,18],[10,32],[83,99],[99,-27],[44,-3],[58,0],[14,9],[8,19],[-3,19],[-19,8],[-26,6],[-11,15],[-2,18],[4,17],[11,3],[28,21],[19,19],[21,15],[15,3],[15,-3],[71,-6],[22,-7],[16,-8],[18,-3],[9,-4],[17,-16],[6,-3],[20,0],[36,9],[12,2],[100,-6],[33,-5],[9,-8],[23,-16],[24,-11],[11,7],[4,26],[-37,19],[-21,17],[-5,17],[-1,19],[-7,19],[-6,0],[-31,7],[-9,3],[-2,7],[6,21],[-4,6],[-31,4],[-20,-9],[-12,-3],[-3,25],[16,3],[107,12],[19,7],[22,29],[15,8],[34,0],[65,-15],[34,-6],[-17,28],[-13,55],[-60,49],[16,21],[33,15],[34,26],[31,-13],[25,-18],[-5,-8],[29,0],[17,4],[17,5],[28,3],[62,-2],[52,-7],[108,-25],[41,37],[5,13],[-7,16],[-32,15],[-7,13],[16,19],[37,-8],[37,-22],[21,-17],[22,13],[23,5],[23,-5],[23,-13],[56,24],[-6,20],[-32,23],[-18,27],[28,31],[65,21],[73,15],[54,17],[-31,34],[4,14],[27,19],[42,15],[39,7],[1,0],[34,9],[19,23],[53,-15],[62,-6],[306,-12],[-7,-11],[-7,-23],[-6,-10],[57,1],[68,-62],[63,11],[56,14],[150,16],[62,15],[51,8],[143,-5],[62,2],[127,25],[62,6],[57,-8],[31,10],[40,-3],[84,-19],[137,-26],[115,-5],[89,21],[15,8]],[[2753,3839],[-6,216],[-4,150],[-4,177],[-6,202],[-17,44],[-26,39],[-67,58],[-202,105],[-259,134],[-17,12],[-61,47],[-47,65],[-23,164],[-37,45],[-56,-13],[-48,24],[-32,40],[-11,33],[14,21],[57,43],[20,21],[4,16],[-1,33],[8,16],[5,20],[-26,75],[-4,126],[-6,176],[-3,119]]],transform:{scale:[.000307784603360326,.0006185963647600842],translate:[.759880818000113,6.21389923179639]}},m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){
a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();