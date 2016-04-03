(function(angular){
    'use strict';
angular.module('fileUploadModule', ['angularFileUpload', 'constModules'])
    .config([function(){
        //console.log("fileUploadModule :: config");
    }])
    .run([function(){
        //console.log("fileUploadModule :: running");
    }])
    .controller('fileUploadCtrl', ['$scope', 'FileUploader','fileUploadService', function($scope, FileUploader, fileUploadService) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'back-end/upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        uploader.remove = function(data){            
            fileUploadService.remove(data,false).then(function(){
                console.log("remove");
            });
        };
        
        // CALLBACKS
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }])
    .service("fileUploadService",['$http', 'PATH', '$q', function($http, PATH, $q){
        
        var obj = {
            remove: function(name, album){
              var deferred = $q.defer();
              var data = {
                  file: name,
                  status: {                      
                    remove: true,
                    album : album
                  },
              };                                                                    
              $http.post(PATH.upload, data)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                 })
                 .error(function(data, status, headers, config) {
                    deferred.reject(status);
                });
              return deferred.promise;
            }
        };
        
        return obj;
    }]);
    
})(window.angular);