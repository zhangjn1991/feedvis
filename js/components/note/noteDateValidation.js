angular.module('feedVisApp')
.directive('noteDateValidation', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {

         // var transformedInput = inputValue.toLowerCase().replace(/ /g, ''); 

         // if (transformedInput!=inputValue) {
         //   modelCtrl.$setViewValue(transformedInput);
         //   modelCtrl.$render();
         // }         

         // return transformedInput;         
         return "1423526400";
       });
     }
   };
});