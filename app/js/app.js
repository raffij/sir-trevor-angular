'use strict';

var sirAngular = angular.module('sirAngular', ['ngNewRouter'])
                        .controller('AppController', ['$router', AppController]);

function AppController($router) {
  $router.config([
    { path: '/', component: 'editor' }
  ]);
}

var editorSt;

sirAngular.directive('sirTrevor', function() {
  return {
    require: '?ngModel',
    link: function(scope, elm, attr, ngModel) {
      
      if (!ngModel) return;

      if (!editorSt) {
        editorSt = new SirTrevor.Editor({
          el: $(elm),
          blockTypes: ["Text", "Video"]
        });
      }

      ngModel.$render = function(value) {
        $(elm).val(ngModel.$viewValue);
        editorSt.reinitialize();
      };

      scope.$on('$destroy', function() {
        editorSt && editorSt.destroy();
      });
    }
  };
});

sirAngular.controller('EditorController', function() {
  this.body = '';

  this.setBody = function() {
    this.body = '{"data":[{"type":"text","data":{"text":"Hello, Im **Sir Trevor**.Create some new blocks and see _what I can do_."}},{"type":"video","data":{"source":"youtube","remote_id":"hcFLFpmc4Pg"}}]}'; 
  }

  this.clearBody = function() {
    this.body = '';
  }
});
