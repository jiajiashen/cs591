
// modified from cs411 class demo

angular.module('cs591', ['ngRoute', 'ngCookies'])
    .directive('nameDisplay', function () {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"
        }
    })
    .controller('cs591ctrl', function ($scope, $http, $cookies) {

        //CREATE (POST)
        $scope.createUser = function () {
            if ($scope.dbID) {
                $scope.updateUser($scope.dbID)
            }
            else {
                const request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        name: $scope.name,
                        UID: $scope.UID,
                        department: $scope.department
                    }
                }
                $http(request)
                    .then(function (response) {
                            $scope.inputForm.$setPristine()
                            $scope.name = $scope.UID = $scope.department = ''
                            $scope.getUsers()
                            console.log(response)
                        },
                        function (error) {
                            if (error.status === 401) {
                                $scope.authorized = false
                                $scope.h2message = "Not authorized to add "
                                console.log(error)
                            }
                        }
                    )
            }
        }
        //READ (GET)
        $scope.getUsers = function () {
            $http.get('http://localhost:3000/api/db')
                .then(function (response) {
                    $scope.users = response.data

                })
        }
        //UPDATE (PUT)
        $scope.setUserUpdate = function (user) {
            $scope.buttonMessage = "Search For Weather"
            $scope.h2message = "Updating"
            $scope.name = user.name
            $scope.UID = user.UID
            $scope.dbID = user._id
            $scope.department = user.department

        }
        $scope.updateUser = function (userID) {
            const request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID,
                data: {
                    name: $scope.name,
                    UID: $scope.UID,
                    department: $scope.department,
                    _id: userID
                }
            }
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine()
                    $scope.name = $scope.UID = $scope.department = ''
                    $scope.h2message = "Add user"
                    $scope.buttonMessage = "Add User"
                    $scope.getUsers()
                    $scope.dbID = null
                })

        }



        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            const request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id,
            }
            $http(request)
                .then(function (response) {
                        $scope.inputForm.$setPristine()
                        $scope.name = $scope.UID = $scope.department = ''
                        $scope.getUsers()
                    }
                )
        }

        $scope.initApp = function ( ) {
            $scope.buttonState = "create"
            $scope.h2message = "Add user"
            $scope.buttonMessage = "Add User"
            $scope.authorized = false
            $scope.showLogin = false
            $scope.getUsers()
            //Grab cookies if present
            let authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
        }

        $scope.logout = function () {
            $http.get('/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        }
        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }

        $scope.register = function () {

            const request = {
                method: 'post',
                url: '/auth/register',
                data: {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Error registering"
                            console.log(error)
                        }
                    }
                )
        }

        $scope.showLoginForm = function () {
            $scope.showLogin = true
        }
        
        $scope.doTwitterAuth = function () {
            var openUrl = '/auth/twitter/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)

        }


        // show weather and restaurant on the html
        $scope.showWeather = function(input){
            $http.get('http://localhost:3000/wunderground/' + input)
                .then(function(response){
                    $scope.result = "Local Weather is " + response.data.weatherData.main.temp + " Celsius Degree"


                    const msg = response.data.businesses.jsonBody.businesses;
                    console.log(msg)



                    // restaurant one:
                    const message = response.data.businesses.jsonBody.businesses[0]
                    $scope.info1 = "Restaurant name: " + message.name
                    const loc = message.location
                    $scope.location1 = "Address: " + loc.address1 + " " + loc.city
                    $scope.rating1 = "Rating: " +  message.rating
                    $scope.phone1 = "Phone Number: " +  message.phone

                    // restaurant two:
                    const message2 = response.data.businesses.jsonBody.businesses[1]
                    $scope.info2 = "Restaurant name: " + message2.name
                    const loc2 = message2.location
                    $scope.location2 = "Address: " + loc2.address1 + " " + loc2.city
                    $scope.rating2 = "Rating: " +  message2.rating
                    $scope.phone2 = "Phone Number: " +  message2.phone

                    // restaurant three:
                    const message3 = response.data.businesses.jsonBody.businesses[2]
                    $scope.info3 = "Restaurant name: " + message3.name
                    const loc3 = message3.location
                    $scope.location3 = "Address: " + loc3.address1 + " " + loc3.city
                    $scope.rating3 = "Rating: " +  message3.rating
                    $scope.phone3 = "Phone Number: " +  message3.phone


                    // restaurant four:
                    const message4 = response.data.businesses.jsonBody.businesses[3]
                    $scope.info4 = "Restaurant name: " + message4.name
                    const loc4 = message4.location
                    $scope.location4 = "Address: " + loc4.address1 + " " + loc4.city
                    $scope.rating4 = "Rating: " +  message4.rating
                    $scope.phone4 = "Phone Number: " +  message4.phone

                    // restaurant five:
                    const message5 = response.data.businesses.jsonBody.businesses[4]
                    $scope.info5 = "Restaurant name: " + message5.name
                    const loc5 = message5.location
                    $scope.location5 = "Address: " + loc5.address1 + " " + loc5.city
                    $scope.rating5 = "Rating: " +  message5.rating
                    $scope.phone5 = "Phone Number: " +  message5.phone


                    //console.log(response.data)


                    for (var i = 0; i<20;i++){
                        const result = response.data.businesses.jsonBody.businesses[i]
                        //console.log(result.name)
                    }


                })
        }


  })
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/:status', {
                templateUrl: '',
                controller: 'authController'
            })
                .when(':status', {
                    templateUrl: '',
                    controller: 'authController'
                })
            .otherwise({
                redirectTo: '/'
            })
        }])


.controller('authController', function ($scope) {

    let authStatus =  $location.search();
console.log(authStatus)
    console.log('In authController')
    $scope.authorized = !!authStatus

})



.controller('listController', function ($scope) {
    $scope.display = false
    $scope.showInfo = function () {
        $scope.display = !$scope.display
    }
})
