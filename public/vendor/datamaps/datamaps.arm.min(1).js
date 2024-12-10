!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this;this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var f=0;f<c.length;f++)c[f]=l(c[f],c[f].options),delete c[f].options;"undefined"==typeof d&&(d=p.arcConfig);var g=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),h=n.geo.path().projection(e.projection);g.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b)),f=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b)),g=[(c[0]+f[0])/2,(c[1]+f[1])/2];if(d.greatArc){var i=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return h(i(b))}var j=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(g[0]+50*j)+","+(g[1]-75*j)+","+f[0]+","+f[1]}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),g.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b=f.path.centroid(i.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];return c?c:void 0}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(b,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo="__WORLD__",m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo={type:"Topology",objects:{arm:{type:"GeometryCollection",geometries:[{type:"Polygon",properties:{name:"Aragatsotn"},id:"AM.AG",arcs:[[0,1,2,3,4,5]]},{type:"Polygon",properties:{name:"Armavir"},id:"AM.AV",arcs:[[6,7,8,-3]]},{type:"Polygon",properties:{name:"Shirak"},id:"AM.SH",arcs:[[-5,9,10]]},{type:"Polygon",properties:{name:"Tavush"},id:"AM.TV",arcs:[[11,12,13,14],[15],[16]]},{type:"Polygon",properties:{name:"Ararat"},id:"AM.AR",arcs:[[17,18,19,-8,20,21]]},{type:"MultiPolygon",properties:{name:"Gegharkunik"},id:"AM.GR",arcs:[[[22]],[[23,24,-18,25,-12]]]},{type:"Polygon",properties:{name:"Kotayk"},id:"AM.KT",arcs:[[-13,-26,-22,26,-1,27]]},{type:"Polygon",properties:{name:"Lori"},id:"AM.LO",arcs:[[-14,-28,-6,-11,28]]},{type:"Polygon",properties:{name:"Erevan"},id:"AM.ER",arcs:[[-21,-7,-2,-27]]},{type:"Polygon",properties:{name:"Syunik"},id:"AM.SU",arcs:[[29,30]]},{type:"Polygon",properties:{name:"Vayots Dzor"},id:"AM.VD",arcs:[[31,-30,32,-19,-25]]}]}},arcs:[[[3101,7491],[23,-141],[0,-38],[-14,-57],[2,-17],[22,-29],[203,-149],[28,-13],[119,-19],[22,-9],[21,-12],[-2,-64],[-24,-105],[-152,-441],[5,-36],[26,-56],[2,-28],[-9,-29],[-28,-27],[-48,-29],[-117,-209],[-28,-28],[-27,-16],[-23,-6],[-21,-9],[-11,-20],[2,-25],[24,-41],[21,-20],[36,-27],[7,-16],[-1,-17],[-14,-21],[-17,-14],[-40,-26],[-8,-17],[0,-29],[5,-46],[40,-96]],[[3125,5509],[-24,-47]],[[3101,5462],[-185,40],[-69,33],[-57,44],[-15,8],[-17,6],[-52,30],[-18,23],[-17,18],[-24,9],[-34,-1],[-64,-15],[-37,-21],[-26,-19],[-19,-9],[-20,0],[-23,15],[-27,34],[-12,12],[-16,7],[-18,4],[-19,2],[-19,-3],[-20,-16],[-2,-24],[5,-28],[17,-62],[2,-39],[-36,-37],[-68,-28],[-375,3],[-24,8],[-24,15],[-49,41],[-49,57],[-30,18],[-120,43],[-45,26],[-80,67],[-13,7],[-23,9],[-82,16],[-29,11],[-17,12],[-39,62],[-14,14],[-17,2],[-22,-10],[-31,-38],[-19,-27],[-21,-21],[-21,-3],[-34,18],[-23,19],[-26,5],[-26,-11],[-73,-67],[-79,-48],[-4,0]],[[802,5673],[-45,105],[-141,182],[-85,81],[-32,64],[21,68],[27,46],[47,157]],[[594,6376],[55,-8],[13,6],[14,12],[23,33],[22,21],[65,37],[23,20],[16,32],[8,22],[6,24],[12,23],[21,20],[43,20],[88,24],[28,12],[96,60],[24,7],[21,-2],[50,-30],[16,-5],[39,-2],[20,-5],[18,-8],[65,-49],[18,-10],[16,-5],[52,-5],[131,4],[18,7],[11,12],[4,22],[5,15],[10,10],[19,5],[131,-7],[6,-5],[7,-7],[19,-27],[50,-86],[13,-16],[13,-11],[14,-7],[15,-2],[18,3],[21,8],[85,55],[86,33],[48,41],[12,6],[15,5],[53,6],[18,7],[13,9],[15,15],[29,15],[11,9],[16,21],[12,11],[24,14],[2,5],[-9,7],[-34,19],[-9,9],[-9,11],[-6,21],[0,29],[11,55],[32,106],[3,22],[-3,17],[-17,11],[-18,1],[-101,-17],[-46,-2],[-13,3],[-10,8],[-5,15],[-9,47],[-8,21],[-8,19],[-20,35],[-22,29],[-28,27],[-48,38],[-2,15],[9,19],[106,103],[53,71],[105,204]],[[2304,7733],[41,9],[15,1],[22,-4],[19,-10],[24,-24],[31,-39],[16,-17],[25,-11],[34,-4],[54,11],[34,18],[24,22],[24,35],[10,10],[11,6],[15,2],[43,-2],[50,-12],[166,-68],[80,-49],[21,-23],[23,-30],[15,-63]],[[3101,5462],[29,-41],[6,-55],[4,-17],[31,-35]],[[3171,5314],[-7,-35],[-28,-16],[-87,-35],[-30,-19],[-21,-25],[-48,-77],[-42,-39],[-15,-26],[-4,-18],[57,-110],[27,-78],[8,-41],[2,-69],[0,-3],[0,-1]],[[2983,4722],[-174,103],[-116,36],[-107,0],[-190,-52],[-90,-12],[-65,-19],[-33,-4],[-27,9],[-40,39],[-31,8],[-67,-18],[-110,-77],[-50,-18],[-380,65],[-346,191],[-289,83],[-144,80],[-41,119],[44,41],[142,31],[31,53],[-20,46],[-99,122],[-33,72],[58,45],[-4,8]],[[594,6376],[3,9],[0,28],[-128,109],[-67,75],[-13,54],[108,128],[68,47],[75,9],[-8,30],[-6,12],[-10,17],[20,-7],[14,-3],[14,-6],[19,-15],[-3,99],[42,85],[133,156],[-24,94],[20,25],[65,116],[9,34],[-16,285],[-11,68],[-29,78],[-132,208],[-32,81],[-17,94],[-7,83],[-14,78],[-36,81],[-99,123],[-124,102],[-136,68],[-135,19],[-61,56],[-50,118],[-26,131],[13,96],[32,-7],[31,-1],[31,7],[170,68],[135,5],[515,-71],[77,6],[62,26],[147,128],[135,55],[293,7],[69,16]],[[1710,9480],[-1,-6],[-36,-307],[2,-24],[9,-18],[28,-25],[22,-12],[73,-29],[16,-12],[20,-25],[58,-93],[26,-32],[25,-23],[57,-37],[9,-7],[6,-13],[3,-18],[-3,-30],[-9,-18],[-13,-13],[-28,-20],[-8,-10],[-3,-16],[5,-17],[17,-20],[19,-11],[22,-8],[71,-9],[71,4],[10,-7],[5,-15],[-23,-132],[-13,-21],[-36,-34],[-11,-23],[-5,-28],[-4,-44],[-13,-20],[-18,-13],[-26,-8],[-24,-2],[-22,5],[-51,27],[-12,4],[-10,-1],[-8,-3],[-5,-4],[-3,-4],[-9,-20],[-8,-22],[-26,-112],[-4,-11],[-24,-42],[0,-26],[10,-28],[25,-43],[15,-31],[12,-32],[7,-26],[17,-23],[24,-16],[111,-16],[23,-14],[22,-30],[21,-52],[10,-18],[25,-11],[22,-7],[132,5]],[[6118,7365],[-1,1],[-60,22],[-40,39],[-28,39],[-36,33],[-21,14],[-19,10],[-56,15],[-18,7],[-17,13],[-72,90],[-19,16],[-29,10],[-109,11],[-63,18],[-20,2],[-22,-7],[-92,-71],[-26,-16],[-122,-50],[-17,-13],[-15,-18],[-12,-21],[-38,-97],[-11,-19],[-13,-16],[-16,-13],[-19,-11],[-46,-17],[-133,-27],[-24,2],[-24,6],[-36,16],[-19,13],[-39,37],[-22,17],[-46,25],[-47,14],[-375,-79]],[[4296,7360],[-76,63]],[[4220,7423],[3,240],[-25,79],[-13,24],[-16,54],[-10,25],[-4,20],[0,21],[22,27],[23,19],[59,28],[108,29],[23,11],[19,16],[18,24],[17,32],[67,214],[13,28],[14,21],[15,13],[14,8],[10,9],[26,30],[20,15],[16,18],[8,21],[-18,32],[-36,32],[-12,13],[-14,30],[-10,9],[-38,18],[-9,6],[-11,6],[-11,2],[-44,0],[-46,5],[-21,6],[-40,22],[-79,70],[-30,34],[-12,20],[-2,22],[5,25],[103,117],[20,14],[20,6],[22,-2],[21,-10],[41,-29],[25,-8],[27,2],[34,15],[204,156],[8,26],[-5,33],[-37,55],[-32,26],[-34,17],[-26,7],[-24,23],[-15,40],[-13,86],[6,56],[7,30],[14,12],[45,25],[44,32],[15,16],[8,19],[2,21],[-7,25],[-32,34],[-108,70],[-75,8],[-1,0]],[[4476,9723],[-21,30],[-118,56],[-26,58],[61,62],[305,-48],[119,4],[39,26],[71,63],[40,25],[116,-244],[-31,-87],[17,-51],[54,-23],[207,0],[54,-18],[165,-127],[41,-59],[4,-66],[-108,-78],[-313,13],[-33,-132],[40,-69],[69,-45],[61,-7],[19,49],[9,75],[52,-27],[103,-106],[65,-40],[49,-52],[52,-43],[149,-17],[138,-57],[72,-11],[147,72],[30,15],[88,10],[19,-98],[-28,-133],[39,-42],[45,-11],[31,-9],[84,-68],[135,-172],[50,-50],[64,-21],[74,-5],[55,-29],[6,-91],[-59,-169],[-84,-94],[-244,-117],[-128,-61],[-124,-101],[-79,-139],[0,-99]],[[4988,8898],[45,95],[-35,118],[-125,29],[-49,-34],[-10,-57],[20,-62],[39,-50],[115,-39]],[[5601,8670],[33,46],[-90,77],[-13,3],[-13,-2],[-11,-7],[-9,-10],[30,-95],[73,-12]],[[5032,5355],[-16,-118],[-35,-136],[-2,-52],[6,-40],[134,-327],[12,-37],[7,-15],[7,-10],[8,-6],[35,-16],[13,-14],[3,-26],[-2,-93],[6,-37],[11,-36],[19,-47],[8,-37],[7,-89],[4,-28],[27,-62]],[[5284,4129],[-75,-169],[-22,-67],[-3,-15],[0,-137],[-9,-90]],[[5175,3651],[-24,31],[-107,54],[-119,-41],[-116,-91],[-19,-10],[-82,-46],[-108,-26],[-138,2],[-146,-27],[-90,-40],[-49,84],[-193,256],[-18,32],[-16,14],[-15,3],[-35,-5],[-16,2],[-58,36],[-115,133],[-42,-26],[-12,23],[-1,47],[-9,40],[-48,35],[-27,28],[-12,35],[-14,63],[-36,60],[-81,91],[-182,160],[-264,154]],[[3171,5314],[38,9],[14,-6],[22,-20],[7,-14],[3,-19],[-1,-19],[-9,-50],[-1,-23],[1,-15],[4,-17],[7,-18],[10,-16],[12,-14],[8,-7],[8,-5],[110,-26],[32,-14],[21,-19],[28,-67],[7,-10],[10,-10],[32,-26],[11,-3],[18,1],[38,9],[86,58],[138,185]],[[3825,5158],[30,-15],[31,-72],[22,-22],[38,-21],[21,-3],[158,28],[129,42],[237,134],[90,38],[114,33],[123,50],[96,12],[118,-7]],[[6666,7243],[-106,-81],[-108,33],[-19,39],[-7,43],[7,43],[19,41],[39,28],[44,13],[46,1],[46,-6],[82,-47],[-43,-107]],[[6118,7365],[0,-76],[45,-96],[60,-59],[64,-50],[55,-68],[13,-41],[7,-91],[14,-45],[30,-32],[65,-43],[27,-48],[102,-217],[187,-174],[735,-416],[3,-3],[134,-148],[63,-3],[22,6],[45,13],[69,5],[46,-25],[45,-44],[81,-107],[6,-24],[2,-24],[-2,-24],[-57,-265],[-38,-101],[-61,-81],[-70,-61],[-11,-32],[-38,-189],[-21,-44],[-43,-36],[-220,-22],[-519,87],[-200,-130],[4,-41]],[[6762,4616],[-12,1],[-28,19],[-16,22],[-8,8],[-10,9],[-11,3],[-15,-1],[-19,-19],[-11,-12],[-33,-52],[-44,-40],[-112,-59],[-53,-16],[-215,-38],[-79,1],[-98,-18],[-232,12],[-29,-6],[-99,-38],[-39,-22],[-40,-27],[-126,-117],[-149,-97]],[[5032,5355],[-47,72],[-215,252],[-12,26],[-2,27],[8,46],[17,27],[29,34],[-6,48],[-148,546],[-10,28],[-26,28],[-94,63],[-10,16],[-6,20],[6,29],[13,51],[5,29],[-4,35],[-13,38],[-34,55],[-23,28],[-18,16],[-17,3],[-72,-3],[-20,3],[-16,20],[-13,31],[-35,220],[0,38],[6,35],[21,42],[9,23],[-9,79]],[[3825,5158],[-24,62],[-21,15],[-20,7],[-62,-8],[-54,4],[-21,15],[-8,24],[5,28],[9,28],[9,26],[12,22],[10,14],[51,56],[13,17],[8,18],[-4,10],[-15,19],[-27,25],[-46,60],[-29,18],[-25,8],[-36,-10],[-88,-44],[-20,-5],[-123,-12],[-39,10],[-9,0],[-9,-4],[-20,-13],[-10,-4],[-17,-3],[-17,2],[-32,6],[-11,-1],[-8,-4],[-6,-5],[-4,-6],[-3,-5],[-9,-19]],[[3101,7491],[264,68],[78,6],[52,-35],[30,-14],[26,5],[62,27],[23,2],[20,-6],[158,-82],[129,-40],[151,-14],[33,0],[93,15]],[[1710,9480],[1,1],[73,17],[127,56],[63,7],[133,-37],[67,12],[62,33],[50,49],[16,40],[2,35],[8,30],[38,27],[33,0],[86,-35],[153,-104],[58,-22],[74,12],[30,19],[22,26],[26,23],[37,12],[39,-5],[169,-100],[69,-25],[71,-5],[77,22],[63,70],[21,15],[34,1],[16,-31],[12,-42],[17,-31],[65,-18],[46,41],[39,65],[41,53],[68,31],[63,-9],[133,-52],[462,-9],[83,11],[32,43],[-13,17]],[[7177,2904],[0,1],[-2,5],[-16,42],[-4,17],[-3,22],[85,333],[13,87],[-2,64],[-60,112],[8,45],[27,61],[167,286],[48,58],[55,32]],[[7493,4069],[25,-50],[142,-142],[67,-35],[104,-54],[199,-60],[87,-85],[122,-248],[99,-81],[120,-34],[54,-31],[45,-57],[74,-141],[47,-45],[70,-22],[110,23],[215,111],[108,-8],[45,-36],[75,-102],[47,-34],[62,-11],[200,19],[51,-11],[52,-35],[39,-53],[9,-68],[-28,-52],[-46,-29],[-37,-34],[-1,-68],[22,-44],[-2,-38],[-21,-31],[-38,-18],[-2,-1],[-231,-43],[-100,-63],[-41,-106],[43,-129],[103,-82],[228,-102],[50,-42],[23,-60],[17,-66],[31,-60],[76,-82],[135,-96],[21,-19],[21,-25],[4,-11],[11,-29],[-28,-13],[-66,-3],[-147,-106],[-38,-5],[-192,98],[-111,15],[-73,-69],[3,-127],[81,-81],[105,-61],[77,-63],[39,-135],[18,-117],[-9,-115],[-42,-131],[-2,-13],[-4,-12],[-11,-50],[-6,-51],[3,-50],[14,-48],[109,-236],[-56,16],[-329,150],[-44,9],[-33,-4],[-77,-25],[-122,-5],[-42,-10],[-61,-30],[-164,-122],[-56,-27],[-210,-28],[-184,358],[-165,466],[-63,131],[-83,119],[-66,112],[-29,108],[19,105],[76,102],[22,28],[6,29],[-7,31],[-21,33],[-64,62],[-180,89],[-46,23],[-76,60],[-60,66],[-65,53],[-179,47],[-8,19],[-18,43],[20,82],[106,177],[14,65],[-28,189],[10,105],[-1,70],[-28,51],[-72,52],[-87,34],[-73,-1],[-18,-4]],[[6762,4616],[6,-57],[100,-45],[329,-34],[87,-43],[68,-76],[141,-292]],[[7177,2904],[-387,-95],[-85,-36],[-253,-163],[-34,-14],[-35,-18],[-36,-8],[-36,6],[-34,20],[-100,103],[-55,29],[-150,14],[-46,19],[-31,47],[-38,85],[-78,112],[-20,28],[-85,-29],[-89,-84],[-117,-28],[-61,40],[-13,60],[31,148],[5,97],[-13,76],[-33,69],[-209,269]]],transform:{scale:[.0003166635023502342,.00024269937983798954],translate:[43.43629398600012,38.86370127400002]}},m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__",m.prototype.sdsTopo="__SDS__",m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;if(d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)){this.options.data[c]=l(e,this.options.data[c]||{});this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))}b.selectAll("."+c).transition().style("fill",d)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(e){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){
var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"object"==typeof exports?(n=require("d3"),o=require("topojson"),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();