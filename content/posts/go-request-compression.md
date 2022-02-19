---
title: Request Compression In Go
date: 2022-02-06
categories:
  - Go
slug: go-request-compression
keywords: go
---
Request body compression reduces latency by reducing the request's payload size. In this article I will show you how to compress request body using **gzip**.

#### Reading Request Body

```go
body, err := ioutil.ReadAll(req.Body)
if err != nil {
    // handle error
}
```

**ioutil.ReadAll** reads the request body and returns a byte slice.

#### Compressing Request Body

```go
var buffer bytes.Buffer
gzipWriter := gzip.NewWriter(&buffer)
if _, err := gzipWriter.Write(body); err != nil {
    // handle error
}

compressedBody := ioutil.NopCloser(bytes.NewBuffer(buffer.Bytes()))

req.Body = compressedBody
```
To compress the body, first create a buffer then create a gzip writer and pass the buffer by reference. **gzipWriter.Write** will compress the body and store the compressed body in the initially passed buffer. Since **Buffer** objects do not implement the **Closer** method we cannot directly substitute the request body with the compressed body.  

**ioutil.NopCloser** adds a No-op Closer method to make the compressed body compliant to the **io.ReadCloser** interface which makes it legal to substitute the request body with the compressed request body.

#### Update Content length

```go
req.ContentLength = buffer.Len()
```
Because the body size has changed, update the request's **ContentLength** property with the new size.

#### Update headers

```go
req.Header.Set("Content-Encoding", "gzip")
req.Header.Set("Accept-Encoding", "gzip")
```

The **Content-Encoding** header lets the server know how to decode the payload to get the original message and **Accept-Encoding** tells the server that the client can handle **gzipped** response body.


#### Status 415

Servers respond with status code **415** when the payload format is unsupported. In this case, the server can return 415 if it doesn't support gzip compressed payloads. If a 415 is returned, delete the **Content-Encoding** header and retry the request with an uncompressed body.

