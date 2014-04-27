angular.module('CustomDirectives', ["ngRoute"])
.directive('cdCode', [function () {
	return {
		priority: 9000
		,restrict: 'A'
		,scope: false
		,link: function ($scope, iElement, iAttrs) {
			if(!iAttrs.cdCode) return;
			var element = iElement[0], 
			options = iAttrs.cdCode.split(':');

			iAttrs.cdCode = options[0];
			iAttrs.flag = options[1];

			var scopes = {
				inParent: $scope.$parent, // Parent Scope
				inScope: $scope, // Current Scope
				inActual: iAttrs.flag === "inActual" && (function($scope, prop){
					do {
						if($scope.hasOwnProperty(prop)) return $scope;
					} while($scope = $scope.$parent);
					return $scope; // this is the outter most parent just in case it did not find any.
				})($scope, iAttrs.cdCode) // Existing Variable within the Scope or any Parent
			}, selectedScope;
			// console.log(scopes.inActual);

			selectedScope = scopes[iAttrs.flag] || scopes.inScope;
			selectedScope[iAttrs.cdCode] = element.outerHTML.replace(cdCodeRegExp,"");
		}
	};
}])