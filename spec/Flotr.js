describe('Plots', function () {

  var
    nodeA, nodeB,
    a, b;

  beforeEach(function () {

    // Add imagediff matchers
    this.addMatchers(imagediff.jasmine);

    nodeA = buildNode();
    nodeB = buildNode();
  });

  afterEach(function () {
    destroyNode(nodeA);
    destroyNode(nodeB);
    a = b = null;
  });

  _.each(TestFlotr.ExampleList.examples, function (example, key) {

    it('should draw a `' + example.name + '`line graph', function () {

      a = executeExampleTest(example, StableFlotr, nodeA);
      b = executeExampleTest(example, TestFlotr, nodeB);

      expect(b).toImageDiffEqual(a);
    });
  });

  function executeExampleTest (example, flotr, node) {
    Math.seedrandom(example.key);
    Flotr = flotr;
    example.callback(node);
    return node.graph.ctx;
  }

  function buildNode () {
    var node = document.createElement('div');
    document.body.appendChild(node);
    node.style.width = '320px';
    node.style.height = '240px';
    return node;
  }

  function destroyNode (node) {
    document.body.removeChild(node);
  }
});

describe('Colors', function () {

  describe('Color Construction', function () {
    it('should have a color class', function () {
      expect(Flotr.Color).not.toBeUndefined();
    });

    it('should create a color', function () {
      var color = new Flotr.Color(0, 0, 0, 0);
      expect(color).toBeTruthy();
    });

    it('should have rgba attributes', function () {
      var color = new Flotr.Color(0, 0, 0, 0);
      expect(color.r).toEqual(0);
      expect(color.g).toEqual(0);
      expect(color.b).toEqual(0);
      expect(color.a).toEqual(1.0);
    });
  });

  describe('Color Manipulation', function () {

    var
      color;

    afterEach(function () {
      color = null;
    });

    it('normalizes colors to upper bound', function () {
      color = new Flotr.Color(1000, 1000, 1000, 10);
      expect(color.r).toEqual(255);
      expect(color.g).toEqual(255);
      expect(color.b).toEqual(255);
      expect(color.a).toEqual(1.0);
    });

    it('normalizes colors to lower bound', function () {
      color = new Flotr.Color(-1000, -1000, -1000, -10);
      expect(color.r).toEqual(0);
      expect(color.g).toEqual(0);
      expect(color.b).toEqual(0);
      expect(color.a).toEqual(0.0);
    });

    it('scales colors', function () {
	    color = new Flotr.Color(200, 200, 200, 1.0);
      color.scale(.5, .5, .5, .5);
      expect(color.r).toEqual(100);
      expect(color.g).toEqual(100);
      expect(color.b).toEqual(100);
      expect(color.a).toEqual(0.5);
    });
  });

  describe('Color Conversion', function () {

    var
      color;

    beforeEach(function () {
	    color = new Flotr.Color(200, 200, 200, 1.0);
    });
    afterEach(function () {
      color = null;
    });

    it('should convert colors to strings, rgb', function () {
      expect(color.toString()).toEqual('rgb(200,200,200)');
    });

    it('should convert colors to strings, rgba', function () {
      color.a = 0.5;
      color.normalize();
      expect(color.toString()).toEqual('rgba(200,200,200,0.5)');
    });

    it('should clone colors', function () {

      var
        color2 = color.clone();

      expect(color.toString()).toEqual(color2.toString());

      color.a = 0.5;
      color.normalize();
      color2 = color.clone();
      expect(color.toString()).toEqual(color2.toString());
    });
  });

});
