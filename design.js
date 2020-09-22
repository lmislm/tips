var uploadManager = (function () {
	var uploadDatabse = {}

	return {
		add: function (id, uploadType, fileName, fileSize) {
			var flyWeightObj = UploadFactory.create(uploadType)

			var dom = document.createElement('div')
			dom.innerHTML = fileName + fileSize;
			dom.querySelector('.delFile').onclick = function () {
				flyWeightObj.delFile(id)
			}
			document.body.appendChild(dom)

			uploadDatabse[id] = {
				fileName,
				fileSize,
				dom
			}
			return flyWeightObj
		},
		setExternalState: function (id, flyWeightObj) {
			var uploadData = uploadDatabse[id]
			for (var i in uploadData) {
				flyWeightObj[i] = uploadData[i]
			}
		}
	}
})