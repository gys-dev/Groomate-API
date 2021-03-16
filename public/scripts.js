const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDAwNDkwNDgzNDg3MiIsImVtYWlsIjoiZHVjeWs0MWNudHRAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlRyYW4iLCJsYXN0X25hbWUiOiJEdWNZIiwicGljdHVyZSI6Imh0dHBzOi8vc2NvbnRlbnQuZmRhZDMtMy5mbmEuZmJjZG4ubmV0L3YvdDEuMC05LzE1MjEzNTc4MF8xODcyNzU4MTQ5NTY0MzI4XzkwNTI0MDYxODY3NzM3MDY1Njdfbi5qcGc_X25jX2NhdD0xMDkmY2NiPTMmX25jX3NpZD0wOWNiZmUmX25jX29oYz02Y3BMdjc2R0ZnRUFYOGYwTmI2Jl9uY19odD1zY29udGVudC5mZGFkMy0zLmZuYSZvaD05YzI4ZjJmNDZmZjdjNDMwOWJmMzhmMzhiMzZlOWZmOCZvZT02MDU2OTMxNyIsImxvY2F0aW9uIjoie1wibGF0aXR1ZGVcIjoxNi4zMjAxMzksXCJsb25naXR1ZGVcIjoxMDcuNTc2NTh9IiwiY3JlYXRlZF9hdCI6bnVsbCwibWFqb3IiOm51bGwsImFjY2Vzc190b2tlbiI6IkVBQVBFbXFzVmczRUJBTmQ3UlpCZUk5YmZJSU5ESHdUZTdLMVlXZUlSZjlQQ1EyT1M0WTZEenhNMXJZWkF3ZU9maklBVGxhTGpqNkxONzhXOHdLMlZwNjJHN3F1WkIyV0REUXVnTHBaQjFaQlBubFh3TFhYNDZ1SUQ3Z2xmQXZJNWxLbVBzN3ZjMGxia1VGWWZHRTdkOEViSlBFNW9EMm9XT3Nxc1c1cDdXQjdieWZaQTJqS1pDejRKSGN1QU9MMFdBbzNCQTdpREVxRFlxN0NpTFFaQkZZaUwzYkJyanBkVkFMMWV2T1R3TEhFc1VOOHNQdXNMVTljciIsImdyb3VwSWQiOiJhZWYwZmViMDAyOWVkNGIwYTdlNGI3ZTUwM2Y2OTUxOCIsImlhdCI6MTYxNTYyODQ0NH0.yAuLF-wwKgMCilBsnYaquiqjkL2CFsQP-lysAyYYtoM"

const socket = io.connect('ws://localhost:3600', {
  query: `token=${token}`
})

socket.on('connect', function () {
  console.log("connected")
  socket.on('message', function (message) {
    console.log(message)
    socket.emit('onmessage', 'Hello from server')
  })

  socket.on('JoinGroup', function (message) {
    console.log(message)
  })

  socket.on('NewRequestJoin', function (message) {
    console.log(message)
  })

  socket.on('NewRequestMerge', function (message) {
    console.log(message)
  })

  socket.on('NewMessage', function (message) {
    console.log(message)
  })
 
})