FROM golang:1.18.3 AS compile

WORKDIR /go/src/hello

RUN go mod init lucasaz/hello

COPY hello.go ./

RUN go install lucasaz/hello

FROM scratch

COPY --from=compile /go/bin/hello ./

ENTRYPOINT [ "./hello" ]
