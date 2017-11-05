/* REQUIRES: SnapSVG y Sylvester */
var CustomSnapScripts = function () {
    var _this = this;

    _this.transforms = {
        //TRANSFORMS
        rotate: function (deg) {
            var rad = parseFloat(deg) * (Math.PI / 180),
                    costheta = Math.cos(rad),
                    sintheta = Math.sin(rad);
            var a = costheta,
                    b = sintheta,
                    c = -sintheta,
                    d = costheta;
            var M = $M([
                [a, c, 0],
                [b, d, 0],
                [0, 0, 1]
            ]);
            return {
                matrix: M,
                snap: _this.actions.ArrayMatrix2SnapMatrix(M)
            };
        },
        scale: function (sx, sy) {
            sx = sx || sx === 0 ? sx : 1;
            sy = sy || sy === 0 ? sy : 1;
            var M = $M([
                [sx, 0, 0],
                [0, sy, 0],
                [0, 0, 1]
            ]);
            return {
                matrix: M,
                snap: _this.actions.ArrayMatrix2SnapMatrix(M)
            };
        },
        scaleX: function (sx) {
            return this.scale(sx);
        },
        scaleY: function (sy) {
            return this.scale(1, sy);
        },
        skew: function (degX, degY) {
            var radX = parseFloat(degX) * (Math.PI / 180),
                    radY = parseFloat(degY) * (Math.PI / 180),
                    x = Math.tan(radX),
                    y = Math.tan(radY);
            var M = $M([
                [1, x, 0],
                [y, 1, 0],
                [0, 0, 1]
            ]);
            return {
                matrix: M,
                snap: _this.actions.ArrayMatrix2SnapMatrix(M)
            };
        },
        skewX: function (deg) {
            var rad = parseFloat(deg) * (Math.PI / 180),
                    x = Math.tan(rad);
            var M = $M([
                [1, x, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
            return {
                matrix: M,
                snap: _this.actions.ArrayMatrix2SnapMatrix(M)
            };
        },
        skewY: function (deg) {
            var rad = parseFloat(deg) * (Math.PI / 180),
                    y = Math.tan(rad);
            var M = $M([
                [1, 0, 0],
                [y, 1, 0],
                [0, 0, 1]
            ]);
            return {
                matrix: M,
                snap: _this.actions.ArrayMatrix2SnapMatrix(M)
            };
        },
        translate: function (tx, ty) {
            tx = tx ? tx : 0;
            ty = ty ? ty : 0;
            var M = $M([
                [1, 0, tx],
                [0, 1, ty],
                [0, 0, 1]
            ]);
            return {
                matrix: M,
                snap: _this.actions.ArrayMatrix2SnapMatrix(M)
            };
        },
        translateX: function (tx) {
            return this.translate(tx);
        },
        translateY: function (ty) {
            return this.translate(0, ty);
        }
    };
    _this.actions = {
        combineTransformations: function (transformationSet) {
            
        },
        A2M: function (matrix) {
            return _this.actions.ArrayMatrix2SnapMatrix(matrix);
        },
        ArrayMatrix2SnapMatrix: function (matrix) {
            return Snap.matrix(
                    matrix.e(1, 1),
                    matrix.e(2, 1),
                    matrix.e(1, 2),
                    matrix.e(2, 2),
                    matrix.e(1, 3),
                    matrix.e(2, 3)
                    )
        },
    };
    _this.helpers = {
        haveArgumentsUndefined: function () {
            var haveUndefined = false;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === 'undefined') {
                    haveUndefined = true;
                    break;
                }
            }
            return haveUndefined;
        },
        parsePoints: function (points, sx, sy) {
            var result = {};
            var startX = (typeof sx === 'undefined') ? 0 : sx;
            var startY = (typeof sy === 'undefined') ? 0 : sy;
            $.each(points, function (index) {
                if (isNaN(parseFloat(this))) {
                    return true;
                }
                if (index % 2 === 0) {
                    var point = {};
                    point.x = parseFloat(this) + parseFloat(startX);
                    result[Object.keys(result).length] = point;
                } else {
                    result[Object.keys(result).length - 1].y = parseFloat(this) + parseFloat(startY);
                }
            });
            return result;
        },
        complementaryDegree: function (degree) {
            return 180 - parseFloat(degree);
        },
        degToRad: function (degree) {
            return (parseFloat(degree) * (Math.PI / 180));
        }
    };

    _this.TransformationSet = function () {
        var _T = this;

        _T.set = {
            skew: [],
            translation: [],
            rotation: [],
            scale: []
        };

        _T.add = function (i, t) {
            _T.set[i].push(t);
        };
        _T.remove = function () {
        };
        _T.get = function () {
            return _T.combine( _T.order() );
        };
        _T.combine = function(set){
            var fmatrix = set[0];
            for (var i = 1; i < set.length; i++) {
                fmatrix = fmatrix.x(set[i]);
            }
            return {
                matrix: fmatrix,
                snap: _this.actions.ArrayMatrix2SnapMatrix(fmatrix)
            };
        };
        _T.order = function(){
            var final = [];
            for (var i = 0; i < _T.set.skew.length; i++) {
                final.push(_T.set.skew[i].matrix);
            }
            for (var i = 0; i < _T.set.rotation.length; i++) {
                final.push(_T.set.rotation[i].matrix);
            }
            for (var i = 0; i < _T.set.scale.length; i++) {
                final.push(_T.set.scale[i].matrix);
            }
            for (var i = 0; i < _T.set.translation.length; i++) {
                final.push(_T.set.translation[i].matrix);
            }
            return final;
        };

        return _T;
    };
    _this.PolygonBuilder = function (sx, sy) {
        var _builder = this;
        _builder.start_x = (typeof sx === 'undefined') ? 0 : sx;
        _builder.start_y = (typeof sy === 'undefined') ? 0 : sy;
        _builder.points = [];
        _builder.push = function (x, y) {
            this.points.push(x + _builder.start_x);
            this.points.push(y + _builder.start_y);
        };
        _builder.get = function () {
            return this.points;
        };
        return _builder;
    };
    _this.Parallelogram = function (w, h, d, sx, sy) {
        if (_this.helpers.haveArgumentsUndefined(w, h, d)) {
            throw new Error('Unable to create parallelogram. Incomplete parameters: Width: \'' + w + '\', Height: \'' + h + '\', Degree: \'' + d + '\'');
        }
        var Builder = new _this.PolygonBuilder(sx, sy);
        var rad = _this.helpers.degToRad(d);
        Builder.push(0, 0);
        Builder.push(Math.cos(rad) * w, Math.sin(rad) * w);
        Builder.push(Math.cos(rad) * w, (Math.sin(rad) * w) - h);
        Builder.push(0, -h);
        return Builder.get();
    };
    _this.RegularPolygon = function (e, ew, sx, sy) {
        if (_this.helpers.haveArgumentUndefined(e, ew)) {
            throw new Error('Unable to create parallelogram. Incomplete parameters: Edges: \'' + e + '\, Radius: \'' + ew + '\'');
        }
        var Builder, internal_d, external_d, current_d;
        Builder = new _this.PolygonBuilder(sx, sy);
        internal_d = 180 * (e - 2) / e; // e: Edges
        external_d = _this.helpers.complementary_degree(internal_d);
        current_d = external_d;
        Builder.push(0, 0);
        for (var i = 0; i <= e; i++) {
            var rad = _this.helpers.degToRad(current_d);
            Builder.push(ew * Math.cos(rad), ew * Math.sin(rad));
            current_d = current_d - external_d;
        }
        return Builder.get();
    };
    _this.SVGLoader = function () {
        var _this = this;
        _this.e = $(this);
        _this.count = 0;
        _this.toLoad = 0;
        _this.set = {};

        _this.elements = {};
        _this.add = function (index, file) {
            _this.set[index] = file;
            _this.toLoad++;
        };
        _this.load = function () {
            $.each(_this.set, function (index) {
                Snap.load(this, function (f) {
                    _this.elements[index] = f;
                    _this.e.trigger('svg_loaded');
                });
            });
        };
        //EVENTS
        _this.e.on('svg_loaded', function () {
            _this.count++;
            if (_this.count === _this.toLoad) {
                _this.e.trigger('loaded');
                _this.set = {};
            }
        });
        _this.get_elements = function () {
            return _this.elements;
        };

        return _this;
    };

    _this.SnapElementDefinitions = function (args) {
        var _S = {};
        _S.f;
        _S.t;
        _S.w;
        _S.h;
        _S.d;
        _S.a;

        _S.main = function (args) {
            _S.parseAcceptedArgs(args);
        };
        _S.parseAcceptedArgs = function (args) {
            _S.f = (typeof args.file === undefined) ? 'No file loaded' : args.file;
            _S.t = (typeof args.transformations === undefined) ? 'No transformations defined' : args.transformations;
            _S.w = (typeof args.width === undefined) ? 'No width defined' : args.width;
            _S.h = (typeof args.height === undefined) ? 'No height defined' : args.height;
            _S.d = (typeof args.degree === undefined) ? 'No degree defined' : args.degree;
            _S.a = (typeof args.attributes === undefined) ? 'No attributes defined' : args.attributes;
        };

        _S.addTransformation = function (index, matrix) {
            var dt = ['translattions', 'skews', 'rotations', 'scales'];
            if (dt.indexOf(index) !== -1) {
                _S.t[index] = matrix;
            } else {
                throw new Error('Unable to add ' + index + ' transformation');
            }

        };

        _S.getWidth = function () {
            var r;
            if (_S.w === 'WW') {
                r = $(window).width();
            } else
            if (_S.w.match(/WW_[0-9]/)) {
                var multiplier = parseInt(_S.w.split('_')[1].substr(0, 3)) * 0.01; //ENDS ON X.XX;
                r = parseFloat(($(window).width() * multiplier));
            } else {
                r = _S.w;
            }
            return parseFloat(r);
        };
        _S.getHeight = function () {
            var r;
            if (toString(_S.h) === 'WH') {
                r = $(window).height();
            } else
            if (toString(_S.h).match(/WH_[0-9]/)) {
                var multiplier = parseInt(_S.H.split('_')[1].substr(0, 3)) * 0.01; //ENDS ON X.XX;
                r = ($(window).height() * multiplier);
            } else {
                r = _S.h;
            }
            return parseFloat(r);
        };
        _S.getDegree = function () {
            return _S.d;
        };
        _S.getFile = function () {
            return _S.f;
        };
        _S.getTransformations = function () {
            return _S.t;
        };
        _S.getAttributes = function () {
            return _S.a;
        };

        _S.getTransformation = function (index) {
            return (typeof index !== undefined && typeof _S.t[index] !== undefined) ? _S.t[index] : new Error('Searched Transformation doesn\'t exists');
        };
        _S.getTransformationMatrix = function () {
            return _this.transforms.combineTransformations(_S.t);
        };

        _S.main(args);

        return _S;
    };

    return _this;
};

CSnap = new CustomSnapScripts();