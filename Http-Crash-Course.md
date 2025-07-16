# HTTP Course

**HyperText Transfer Protocol**  

---

## 📦 What are HTTP Headers?

**metadata** → key-value pairs sent along with request or response.

Used for:

- Caching
- Authentication
- Managing state
- Compression
- Encoding

**X-Prefix** → legacy/deprecated headers (`X-*` were used before 2012)

### 📨 Types of Headers

- **Request Headers** – sent by client
- **Response Headers** – sent by server
- **Representation Headers** – for encoding/compression
- **Payload Headers** – describe body data

---

### 🧰 Common Headers (CORS & Security)

Most Commen Heaaders:
- `Accept: application/json`
- `User-Agent`
- `Authorization`
- `Content-Type`
- `Cookie`
- `Cache-Control`
CORS:
- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Credentials`
- `Access-Control-Allow-Methods`
Security:
- `Content-Security-Policy`
- `Cross-Origin-Embedder-Policy`
- `Cross-Origin-Opener-Policy`
- `X-XSS-Protection`

---

## 🔧 HTTP Methods

Basic set of operations used to interact with the server:

| Method   | Description                                |
|----------|--------------------------------------------|
| GET      | Retrieve a resource                        |
| HEAD     | Like GET but no response body              |
| OPTIONS  | Get supported HTTP methods                 |
| TRACE    | Loopback test, returns same data           |
| DELETE   | Delete a resource                          |
| PUT      | Replace a resource                         |
| POST     | Add/create a resource                      |
| PATCH    | Modify part of a resource                  |

---

## 📊 HTTP Status Codes

| Code | Category        | Meaning                       |
|------|------------------|-------------------------------|
| 1XX  | Informational     | Continue, Processing, etc.    |
| 2XX  | Success           | OK, Created, Accepted         |
| 3XX  | Redirection       | Temporary or Permanent        |
| 4XX  | Client Error      | Bad Request, Unauthorized     |
| 5XX  | Server Error      | Internal Error, Timeout       |

### 🔢 Examples:

- **100** Continue  
- **102** Processing  
- **200** OK  
- **201** Created  
- **202** Accepted  
- **307** Temporary Redirect  
- **308** Permanent Redirect  
- **400** Bad Request  
- **401** Unauthorized  
- **402** Payment Required  
- **404** Not Found  
- **500** Internal Server Error  
- **507** Gateway Timeout  

---
