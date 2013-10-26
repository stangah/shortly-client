var shortly = angular.module('shortlyApp', [])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'linksCtrl',
    templateUrl: 'templates/link.html'
  })
  // .when('/create', {
  //   controller: 'createCtrl',
  //   templateUrl: 'templates/create.html'

  // })
  .otherwise({

  });
})
.controller('linksCtrl',
  function($scope, $http) {
    $http.get('/links')
    .success(function(data, status, header, config) {
      $scope.links = data;
    })
    .error(function(data, status, header, config) {
    });
    $scope.sendMsg = function() {
      $scope.spinnerShow = true;
      var urldata = JSON.stringify({url: $scope.createdLink});
      for (var i = 0; i < $scope.links.length; i++) {
        if ($scope.createdLink === $scope.links[i].url) {
          $scope.error = "Link is already in the database";
        }
      }

      $http.post('/links', urldata)
        .success(function(data, status) {
          $scope.spinnerShow = false;
          $scope.links = [data];
        }).error(function(data, status) {
          $scope.spinnerShow = false;
          $scope.error = "Please enter a valid URL";
        });
    };

})
// .controller('createCtrl',
//   function($scope, $http) {
//     $scope.sendMsg = function() {
//       $scope.spinnerShow = true;
//       var urldata = JSON.stringify({url: $scope.link});
//       $http.post('/links', urldata)
//         .success(function(data, status) {
//           $scope.spinnerShow = false;
//           console.log(data);
//           $scope.message = data;
//         }).error(function(data, status) {
//           $scope.spinnerShow = false;
//           $scope.error = "Please enter a valid URL";
//         });
//     };
// })
.directive('linkView', function() {
  return {
    // restrict: 'EA',
    require: '^ngModel',
    scope: {
      ngModel: '=',
    },
    templateUrl: 'templates/linkView.html'
  };
});