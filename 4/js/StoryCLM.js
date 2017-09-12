; (function () {

    if (window.StoryCLMBridge) return;
    
    var messagingIframe;
    var sendMessageQueue = [];

    var responseCallbacks = {};
    var uniqueId = 1;

    var CUSTOM_PROTOCOL_SCHEME = 'storyclm';
    var QUEUE_HAS_MESSAGE = 'SCLM_QUEUE';

    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }

    function _GUID() {
        return UUIDcreatePart(4) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(6);
    };

    function UUIDcreatePart(length) {
        var uuidpart = "";
        for (var i = 0; i < length; i++) {
            var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
            if (uuidchar.length == 1) {
                uuidchar = "0" + uuidchar;
            }
            uuidpart += uuidchar;
        }
        return uuidpart;
    }

    function _invoke(command, data, responseCallback) {
        var message = { Command: command, Data: data };
        if (responseCallback)
        {
            var GUID = 'GUID_' + (uniqueId++) + _GUID();
            responseCallbacks[GUID] = responseCallback;
            message.GUID = GUID;
        }
        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + ':' + QUEUE_HAS_MESSAGE;
    }

    function _getQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        return messageQueueString;
    }

    function _storyCLMHandler(messageJSON) {
        setTimeout(function () {
            if (!messageJSON) return;
            var message = JSON.parse(messageJSON);
            if (!message.GUID) return;
            var responseCallback = responseCallbacks[message.GUID];
            if (typeof responseCallback !== "function") return;
            responseCallback(message);
            delete responseCallbacks[message.GUID];
        }, 1);
    }

    _createQueueReadyIframe(window.document);
    window.StoryCLMBridge = {
        Invoke: _invoke,
        GetQueue: _getQueue,
        StoryCLMHandler: _storyCLMHandler
    };
})();


function StoryCLMApiMessage(data)
{
    if (this instanceof StoryCLMApiMessage) {
        try {
            if (data) {
                this.status = data.Status;
                this.errorCode = data.ErrorCode;
                this.errorMessage = data.ErrorMessage;
                this.data = data.Data;
            }
            else {
                this.status = "error";
                this.errorCode = -2;
                this.errorMessage = "Data is empty.";
                this.data = {};
            }
        }
        catch (e)
        {
            this.status = "error";
            this.errorCode = -1;
            this.errorMessage = e.message;
            this.data = {};
        }
    }
    else return new StoryCLMApiMessage(data);
}

var StoryCLM = {};

StoryCLM.System = (function () {

    function _getInfo(callback)
    {
        StoryCLMBridge.Invoke("getAppInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        GetInfo: _getInfo
    };
})();

StoryCLM.Presentation = (function () {

    function _open(PresId, callback) {
        if (typeof PresId !== "number") return;
        StoryCLMBridge.Invoke("openPresentation", { presId: PresId } , function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
            });
    }

    function _close(callback) {
        StoryCLMBridge.Invoke("closePresentation", {});
    }

    function _setComplete(callback) {
        StoryCLMBridge.Invoke("setPresentationComplete", {});
    }

    function _getInfo(callback) {
        StoryCLMBridge.Invoke("getPresentationInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getPreviousSlide(callback) {
        StoryCLMBridge.Invoke("getPreviousSlide", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getNextSlide(callback) {
        StoryCLMBridge.Invoke("getNextSlide", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getBackForwardList(callback) {
        StoryCLMBridge.Invoke("getBackForwardList", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getMediaFiles(callback) {
        StoryCLMBridge.Invoke("getMediaFiles", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getPresentations(callback) {
        StoryCLMBridge.Invoke("getPresentations", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _openMediaFile(Name, callback) {
        if (typeof Name !== "string") return;
        StoryCLMBridge.Invoke("openMediaFile", { name: Name }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        Open: _open,
        Close: _close,
        SetComplete: _setComplete,
        GetInfo: _getInfo,
        GetPreviousSlide: _getPreviousSlide,
        GetNextSlide: _getNextSlide,
        GetBackForwardList: _getBackForwardList,
        GetMediaFiles: _getMediaFiles,
        GetPresentations: _getPresentations,
        OpenMediaFile: _openMediaFile
    };
})();


StoryCLM.User = (function () {

    function _get(callback) {
        StoryCLMBridge.Invoke("getUserInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        Get: _get
    };
})();

StoryCLM.Geolocation = (function () {

    function _get(callback) {
        StoryCLMBridge.Invoke("getGeoLocationInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        Get: _get
    };
})();


StoryCLM.CustomEvents = (function () {

    function _set(key, value, callback) {
        if (typeof key !== "string" || typeof value !== "string") return;
        StoryCLMBridge.Invoke("setCustomEvent", { key: key, value: value }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        Set: _set
    };
})();