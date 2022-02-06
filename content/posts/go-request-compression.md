---
title: Request Compression In Go
date: 2022-02-06
categories:
  - Go
slug: go-request-compression
keywords: go
---
Compressing the request body improves performance by reducing the request's payload size. In this article I will show you how to compress request body using **gzip**.

#### Reading Request Body

```go
body, err := ioutil.ReadAll(reqBody)
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

compressedBody := ioutil.NopCloser(bytes.NewBuffer(buffer.Bytes())), len(buffer.Bytes())
```

**Buffer** objects do not implement the **io.ReadCloser** because it doesn't have the **Closer** method. **ioutil.NopCloser**  adds a dummy closer method to make it compliant to io.ReadCloser so that we can use it as the new body

#### Update Content length

```go
req.ContentLength = len(buffer.Bytes())
```

Since the size of the body has changed, we also need to update the **ContentLength** property of the request with the new body size.

#### Update headers

```go
req.Header.Set("Content-Encoding", "gzip")
req.Header.Set("Accept-Encoding", "gzip")
```
The **Content-Encoding** header lets the server know that the request body is gzipped and the **Accept-Encoding** header informs the server that the client accepts gzipped responses.

#### Status 415

Servers respond with status code **415** if they don't support the specified content encoding. To handle this, delete the **Content-Encoding** header and retry the request with the uncompressed body.
