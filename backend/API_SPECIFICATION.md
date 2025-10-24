# Treasury Management System - API Specification

## Database Models (Prisma Schema)

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
  AuditEntry      AuditEntry[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}

model Client {
  id                 String   @id @default(cuid())
  name               String
  accountIds         String[]
  relationshipManager String
  status             String   @default("active")
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  StatementFile      StatementFile[]
  Analysis           Analysis[]
  Report             Report[]
}

model StatementFile {
  id        String   @id @default(cuid())
  filename  String
  type      String
  size      Int
  uploadedAt DateTime @default(now())
  status    String   @default("uploading")
  clientId  String
  client    Client   @relation(fields: [clientId], references: [id])
  ParseResult ParseResult?
}

model ParseResult {
  id              String        @id @default(cuid())
  statementFileId String        @unique
  statementFile   StatementFile @relation(fields: [statementFileId], references: [id])
  totalTransactions Int
  dateRangeStart   DateTime
  dateRangeEnd     DateTime
  accounts         Json
  status           String
  errors           Json?
  createdAt        DateTime      @default(now())
}

model Analysis {
  id               String   @id @default(cuid())
  clientId         String
  client           Client   @relation(fields: [clientId], references: [id])
  statementFileIds String[]
  createdAt        DateTime @default(now())
  status           String   @default("processing")
  summary          Json
  liquidityMetrics Json
  spendingBreakdown Json
  idleBalanceAnalysis Json
  Recommendation   Recommendation[]
  Report           Report[]
}

model TreasuryProduct {
  id              String @id @default(cuid())
  name            String @unique
  category        String
  description     String
  features        String[]
  eligibilityRules Json
  benefits        Json
  pricing         Json
  isActive        Boolean @default(true)
  Recommendation  Recommendation[]
}

model Recommendation {
  id               String         @id @default(cuid())
  analysisId       String
  analysis         Analysis       @relation(fields: [analysisId], references: [id])
  productId        String
  product          TreasuryProduct @relation(fields: [productId], references: [id])
  priority         String
  rationale        String
  dataPoints       String[]
  benefitProjection Json
  status           String         @default("pending")
  createdAt        DateTime       @default(now())
  approvedBy       String?
  approvedAt       DateTime?
}

model Report {
  id           String   @id @default(cuid())
  title        String
  analysisId   String
  analysis     Analysis @relation(fields: [analysisId], references: [id])
  clientId     String
  client       Client   @relation(fields: [clientId], references: [id])
  format       String
  template     String
  createdAt    DateTime @default(now())
  createdBy    String
  fileSize     Int      @default(0)
  downloadCount Int     @default(0)
  status       String   @default("generating")
  filePath     String?
}

model SystemConfig {
  id           String @id @default(cuid())
  configKey    String @unique
  configValue  Json
  updatedAt    DateTime @updatedAt
  updatedBy    String
}

model AuditEntry {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  userName   String
  userEmail  String
  action     String
  resource   String
  resourceId String?
  details    String
  severity   String
  ipAddress  String
  userAgent  String?
  timestamp  DateTime @default(now())
}
```

---

## Authentication Endpoints

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:obj, tokens:obj}
ERR: {"400":"Invalid input or duplicate email", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:00:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2024-10-24T10:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2024-10-31T10:00:00Z"}}}

---

EP: POST /auth/login
DESC: Authenticate user and return access tokens.
IN: body:{email:str!, password:str!}
OUT: 200:{user:obj, tokens:obj}
ERR: {"401":"Invalid email or password", "400":"Invalid input", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:00:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2024-10-24T10:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2024-10-31T10:00:00Z"}}}

---

EP: POST /auth/logout
DESC: Logout user and blacklist refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"404":"Token not found", "400":"Invalid token", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh
DESC: Refresh access token using refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{tokens:obj}
ERR: {"401":"Invalid or expired refresh token", "400":"Invalid input", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_200: {"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2024-10-24T10:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2024-10-31T10:00:00Z"}}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"404":"User not found", "400":"Invalid email", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset user password using reset token.
IN: query:{token:str!} body:{password:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired reset token", "400":"Invalid password", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=resetToken123" -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify user email address using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired verification token", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verifyToken123"
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification link to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_204: {}

---

## User Management Endpoints

EP: GET /users
DESC: Get paginated list of users with filtering.
IN: headers:{Authorization:str!} query:{name:str?, role:str?, sortBy:str?, limit:int?, page:int?}
OUT: 200:{results:arr[obj], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:00:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: POST /users
DESC: Create a new user (Admin only).
IN: headers:{Authorization:str!} body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input or duplicate email", "401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"Jane Doe","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Doe","role":"USER","isEmailVerified":false,"createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:00:00Z"}

---

EP: GET /users/{userId}
DESC: Get specific user details.
IN: headers:{Authorization:str!} params:{userId:str!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:00:00Z"}

---

EP: PATCH /users/{userId}
DESC: Update user information.
IN: headers:{Authorization:str!} params:{userId:str!} body:{name:str?, email:str?, password:str?}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input or duplicate email", "401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"John Smith"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Smith","role":"USER","isEmailVerified":true,"createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:30:00Z"}

---

EP: DELETE /users/{userId}
DESC: Delete a user account.
IN: headers:{Authorization:str!} params:{userId:str!}
OUT: 200:{message:str}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"message":"User deleted successfully"}

---

## Dashboard Endpoints

EP: GET /dashboard/metrics
DESC: Get dashboard overview metrics.
IN: headers:{Authorization:str!}
OUT: 200:{totalClients:int, activeAnalyses:int, pendingRecommendations:int, totalPotentialSavings:float, recentActivity:arr[obj], topOpportunities:arr[obj]}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /dashboard/metrics -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"totalClients":47,"activeAnalyses":12,"pendingRecommendations":28,"totalPotentialSavings":485000,"recentActivity":[{"id":"act-1","type":"analysis","clientName":"ACME Corporation","timestamp":"2024-10-22T14:30:00Z","status":"completed"}],"topOpportunities":[{"clientName":"Global Manufacturing Ltd","potentialSavings":125000,"productCategory":"sweep"}]}

---

## Client Management Endpoints

EP: GET /clients
DESC: Get all clients.
IN: headers:{Authorization:str!}
OUT: 200:arr[{id:str, name:str, accountIds:arr[str], relationshipManager:str, status:str, createdAt:str, updatedAt:str}]
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /clients -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: [{"id":"1","name":"ACME Corporation","accountIds":["ACC-001","ACC-002"],"relationshipManager":"Sarah Johnson","status":"active","createdAt":"2024-01-15T09:00:00Z","updatedAt":"2024-10-20T14:30:00Z"}]

---

EP: POST /clients
DESC: Create a new client.
IN: headers:{Authorization:str!} body:{name:str!, accountIds:arr[str]!, relationshipManager:str!, status:str?}
OUT: 201:{id:str, name:str, accountIds:arr[str], relationshipManager:str, status:str, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input", "401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /clients -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"New Corp","accountIds":["ACC-007"],"relationshipManager":"Tom Wilson","status":"active"}'
EX_RES_201: {"id":"client-123","name":"New Corp","accountIds":["ACC-007"],"relationshipManager":"Tom Wilson","status":"active","createdAt":"2024-10-24T10:00:00Z","updatedAt":"2024-10-24T10:00:00Z"}

---

EP: GET /clients/{clientId}
DESC: Get specific client details.
IN: headers:{Authorization:str!} params:{clientId:str!}
OUT: 200:{id:str, name:str, accountIds:arr[str], relationshipManager:str, status:str, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "404":"Client not found", "500":"Internal server error"}
EX_REQ: curl -X GET /clients/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":"1","name":"ACME Corporation","accountIds":["ACC-001","ACC-002"],"relationshipManager":"Sarah Johnson","status":"active","createdAt":"2024-01-15T09:00:00Z","updatedAt":"2024-10-20T14:30:00Z"}

---

## Statement Upload & Processing Endpoints

EP: POST /statements/upload
DESC: Upload bank statement files for processing.
IN: headers:{Authorization:str!} body:{clientId:str!, files:arr[file]!}
OUT: 201:arr[{id:str, status:str, progress:int, filename:str, error:str?}]
ERR: {"400":"Invalid file or client ID", "401":"Unauthorized", "413":"File too large", "500":"Internal server error"}
EX_REQ: curl -X POST /statements/upload -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -F "clientId=1" -F "files[0]=@statement.pdf"
EX_RES_201: [{"id":"upload-123","status":"processing","progress":50,"filename":"statement.pdf"}]

---

EP: GET /statements/upload/{uploadId}/status
DESC: Get upload status for a specific file.
IN: headers:{Authorization:str!} params:{uploadId:str!}
OUT: 200:{id:str, status:str, progress:int, filename:str, error:str?}
ERR: {"401":"Unauthorized", "404":"Upload not found", "500":"Internal server error"}
EX_REQ: curl -X GET /statements/upload/upload-123/status -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":"upload-123","status":"completed","progress":100,"filename":"statement.pdf"}

---

EP: POST /statements/parse
DESC: Parse uploaded statement files to extract transaction data.
IN: headers:{Authorization:str!} body:{statementFileIds:arr[str]!}
OUT: 200:arr[{id:str, statementFileId:str, totalTransactions:int, dateRange:obj, accounts:arr[obj], status:str, errors:arr[str]?}]
ERR: {"400":"Invalid statement file IDs", "401":"Unauthorized", "404":"Statement files not found", "500":"Internal server error"}
EX_REQ: curl -X POST /statements/parse -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"statementFileIds":["file-123"]}'
EX_RES_200: [{"id":"parse-123","statementFileId":"file-123","totalTransactions":156,"dateRange":{"startDate":"2024-10-01T00:00:00Z","endDate":"2024-10-31T00:00:00Z"},"accounts":[{"accountId":"ACC-001","accountType":"Operating","openingBalance":425000,"closingBalance":470000}],"status":"success"}]

---

## Analysis Endpoints

EP: POST /statements/analyze
DESC: Perform comprehensive analysis on parsed statement data.
IN: headers:{Authorization:str!} body:{statementFileIds:arr[str]!, clientId:str!, analysisOptions:obj?}
OUT: 200:{id:str, clientId:str, statementFileIds:arr[str], createdAt:str, status:str, summary:obj, liquidityMetrics:obj, spendingBreakdown:arr[obj], idleBalanceAnalysis:obj}
ERR: {"400":"Invalid input", "401":"Unauthorized", "404":"Statement files not found", "500":"Internal server error"}
EX_REQ: curl -X POST /statements/analyze -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"statementFileIds":["file-123"],"clientId":"1","analysisOptions":{"idleBalanceThreshold":250000}}'
EX_RES_200: {"id":"analysis-123","clientId":"1","statementFileIds":["file-123"],"createdAt":"2024-10-22T10:00:00Z","status":"completed","summary":{"totalInflow":875000,"totalOutflow":650000,"netCashFlow":225000,"avgDailyBalance":456000,"transactionCount":156,"dateRange":{"startDate":"2024-10-01T00:00:00Z","endDate":"2024-10-31T00:00:00Z"}},"liquidityMetrics":{"avgDailyBalance":456000,"minBalance":385000,"maxBalance":525000,"volatility":0.15,"liquidityRatio":2.8},"spendingBreakdown":[{"category":"Payroll","amount":245000,"percentage":37.7,"transactionCount":8}],"idleBalanceAnalysis":{"avgIdleAmount":185000,"daysWithIdleBalance":22,"threshold":250000,"potentialYieldGain":8500}}

---

EP: GET /analysis/{analysisId}
DESC: Get specific analysis details.
IN: headers:{Authorization:str!} params:{analysisId:str!}
OUT: 200:{id:str, clientId:str, statementFileIds:arr[str], createdAt:str, status:str, summary:obj, liquidityMetrics:obj, spendingBreakdown:arr[obj], idleBalanceAnalysis:obj}
ERR: {"401":"Unauthorized", "404":"Analysis not found", "500":"Internal server error"}
EX_REQ: curl -X GET /analysis/analysis-123 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":"analysis-123","clientId":"1","statementFileIds":["file-123"],"createdAt":"2024-10-22T10:00:00Z","status":"completed","summary":{"totalInflow":875000,"totalOutflow":650000,"netCashFlow":225000}}

---

EP: GET /analysis/{analysisId}/transactions
DESC: Get paginated transaction data for an analysis.
IN: headers:{Authorization:str!} params:{analysisId:str!} query:{page:int?, limit:int?}
OUT: 200:{transactions:arr[obj], totalCount:int, page:int, totalPages:int}
ERR: {"401":"Unauthorized", "404":"Analysis not found", "500":"Internal server error"}
EX_REQ: curl -X GET "/analysis/analysis-123/transactions?page=1&limit=50" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"transactions":[{"id":"txn-1","date":"2024-10-20T00:00:00Z","amount":25000,"type":"credit","category":"Customer Payment","description":"WIRE TRANSFER FROM ABC CLIENT","counterparty":"ABC CLIENT CORP","balanceAfter":485000,"accountId":"ACC-001"}],"totalCount":156,"page":1,"totalPages":4}

---

## Treasury Products & Recommendations Endpoints

EP: GET /products
DESC: Get all available treasury products.
IN: headers:{Authorization:str!}
OUT: 200:arr[{id:str, name:str, category:str, description:str, features:arr[str], eligibilityRules:obj, benefits:obj, pricing:obj}]
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /products -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: [{"id":"prod-1","name":"Automated Investment Sweep","category":"sweep","description":"Automatically sweep idle balances into interest-bearing accounts","features":["Automatic daily sweeping","Customizable thresholds"],"eligibilityRules":{"minBalance":250000,"accountTypes":["Operating","Money Market"]},"benefits":{"yieldImprovement":2.5},"pricing":{"setupFee":500,"monthlyFee":150,"basisPoints":15}}]

---

EP: POST /recommendations/generate
DESC: Generate product recommendations based on analysis.
IN: headers:{Authorization:str!} body:{analysisId:str!, productFilters:obj?}
OUT: 200:arr[{id:str, analysisId:str, productId:str, priority:str, rationale:str, dataPoints:arr[str], benefitProjection:obj, status:str, createdAt:str}]
ERR: {"400":"Invalid analysis ID", "401":"Unauthorized", "404":"Analysis not found", "500":"Internal server error"}
EX_REQ: curl -X POST /recommendations/generate -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"analysisId":"analysis-123","productFilters":{"categories":["sweep","zba"]}}'
EX_RES_200: [{"id":"rec-123","analysisId":"analysis-123","productId":"prod-1","priority":"high","rationale":"Client maintains average idle balances of $185,000 for 22 days per month","dataPoints":["Average idle balance: $185,000"],"benefitProjection":{"annualYieldIncrease":8500,"paybackPeriod":3,"roi":12.5},"status":"pending","createdAt":"2024-10-22T11:00:00Z"}]

---

EP: GET /recommendations
DESC: Get recommendations for a specific analysis.
IN: headers:{Authorization:str!} query:{analysisId:str!}
OUT: 200:arr[{id:str, analysisId:str, productId:str, priority:str, rationale:str, dataPoints:arr[str], benefitProjection:obj, status:str, createdAt:str, approvedBy:str?, approvedAt:str?}]
ERR: {"400":"Missing analysis ID", "401":"Unauthorized", "404":"Analysis not found", "500":"Internal server error"}
EX_REQ: curl -X GET "/recommendations?analysisId=analysis-123" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: [{"id":"rec-123","analysisId":"analysis-123","productId":"prod-1","priority":"high","rationale":"Client maintains average idle balances of $185,000","dataPoints":["Average idle balance: $185,000"],"benefitProjection":{"annualYieldIncrease":8500},"status":"pending","createdAt":"2024-10-22T11:00:00Z"}]

---

EP: PUT /recommendations/{recommendationId}/approve
DESC: Approve a recommendation.
IN: headers:{Authorization:str!} params:{recommendationId:str!} body:{approvedBy:str!}
OUT: 200:{id:str, analysisId:str, productId:str, priority:str, rationale:str, dataPoints:arr[str], benefitProjection:obj, status:str, createdAt:str, approvedBy:str, approvedAt:str}
ERR: {"400":"Invalid input", "401":"Unauthorized", "404":"Recommendation not found", "500":"Internal server error"}
EX_REQ: curl -X PUT /recommendations/rec-123/approve -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"approvedBy":"admin@example.com"}'
EX_RES_200: {"id":"rec-123","analysisId":"analysis-123","productId":"prod-1","priority":"high","rationale":"Client maintains average idle balances","dataPoints":["Average idle balance: $185,000"],"benefitProjection":{"annualYieldIncrease":8500},"status":"approved","createdAt":"2024-10-22T11:00:00Z","approvedBy":"admin@example.com","approvedAt":"2024-10-24T10:00:00Z"}

---

EP: PUT /recommendations/{recommendationId}/reject
DESC: Reject a recommendation.
IN: headers:{Authorization:str!} params:{recommendationId:str!}
OUT: 200:{id:str, analysisId:str, productId:str, priority:str, rationale:str, dataPoints:arr[str], benefitProjection:obj, status:str, createdAt:str}
ERR: {"401":"Unauthorized", "404":"Recommendation not found", "500":"Internal server error"}
EX_REQ: curl -X PUT /recommendations/rec-123/reject -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":"rec-123","analysisId":"analysis-123","productId":"prod-1","priority":"high","rationale":"Client maintains average idle balances","dataPoints":["Average idle balance: $185,000"],"benefitProjection":{"annualYieldIncrease":8500},"status":"rejected","createdAt":"2024-10-22T11:00:00Z"}

---

## Report Generation Endpoints

EP: POST /reports/generate
DESC: Generate a report based on analysis data.
IN: headers:{Authorization:str!} body:{analysisId:str!, recommendationIds:arr[str]?, format:str!, template:str!, includeDataTables:bool?}
OUT: 200:{reportId:str, downloadUrl:str}
ERR: {"400":"Invalid input", "401":"Unauthorized", "404":"Analysis not found", "500":"Internal server error"}
EX_REQ: curl -X POST /reports/generate -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"analysisId":"analysis-123","format":"pdf","template":"standard","includeDataTables":true}'
EX_RES_200: {"reportId":"report-123","downloadUrl":"/reports/download/report-123.pdf"}

---

EP: GET /reports/download/{reportId}
DESC: Download a generated report file.
IN: headers:{Authorization:str!} params:{reportId:str!}
OUT: 200:blob
ERR: {"401":"Unauthorized", "404":"Report not found", "500":"Internal server error"}
EX_REQ: curl -X GET /reports/download/report-123 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." --output report.pdf
EX_RES_200: [Binary PDF data]

---

EP: GET /reports/history
DESC: Get paginated list of generated reports.
IN: headers:{Authorization:str!} query:{page:int?, limit:int?, clientId:str?}
OUT: 200:{reports:arr[obj], totalCount:int, page:int, totalPages:int}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET "/reports/history?page=1&limit=10&clientId=1" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"reports":[{"id":"report-123","title":"ACME Corporation - Q4 2024 Analysis Report","analysisId":"analysis-123","clientId":"1","clientName":"ACME Corporation","format":"pdf","template":"Standard Analysis Report","createdAt":"2024-10-22T14:30:00Z","createdBy":"Sarah Johnson","fileSize":2485760,"downloadCount":3,"status":"ready"}],"totalCount":5,"page":1,"totalPages":1}

---

EP: GET /reports/templates
DESC: Get available report templates.
IN: headers:{Authorization:str!}
OUT: 200:arr[{id:str, name:str, description:str, format:str, sections:arr[str], isCustomizable:bool}]
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /reports/templates -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: [{"id":"template-1","name":"Standard Analysis Report","description":"Comprehensive analysis report with key findings and recommendations","format":"pdf","sections":["Executive Summary","Client Overview","Cash Flow Analysis","Treasury Recommendations","Implementation Timeline"],"isCustomizable":true}]

---

EP: DELETE /reports/{reportId}
DESC: Delete a generated report.
IN: headers:{Authorization:str!} params:{reportId:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "404":"Report not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /reports/report-123 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_204: {}

---

## Admin Configuration Endpoints

EP: GET /admin/config
DESC: Get system configuration settings.
IN: headers:{Authorization:str!}
OUT: 200:{thresholds:obj, features:obj, integrations:obj, security:obj}
ERR: {"401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X GET /admin/config -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"thresholds":{"idleCashThreshold":100000,"liquidityWarningThreshold":50000,"lowBalanceThreshold":10000,"highRiskThreshold":500000},"features":{"enableAutoAnalysis":true,"enableEmailNotifications":true,"enableRecommendationEngine":true,"enableAdvancedReports":true},"integrations":{"bankApiEnabled":false,"webhooksEnabled":false,"apiRateLimit":1000,"maxFileSize":50},"security":{"sessionTimeout":60,"passwordExpiry":90,"requireMfa":false,"auditLogRetention":365}}

---

EP: PUT /admin/config
DESC: Update system configuration settings.
IN: headers:{Authorization:str!} body:{thresholds:obj?, features:obj?, integrations:obj?, security:obj?}
OUT: 200:{thresholds:obj, features:obj, integrations:obj, security:obj}
ERR: {"400":"Invalid configuration", "401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X PUT /admin/config -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"thresholds":{"idleCashThreshold":150000}}'
EX_RES_200: {"thresholds":{"idleCashThreshold":150000,"liquidityWarningThreshold":50000,"lowBalanceThreshold":10000,"highRiskThreshold":500000},"features":{"enableAutoAnalysis":true},"integrations":{"bankApiEnabled":false},"security":{"sessionTimeout":60}}

---

EP: POST /admin/config/reset
DESC: Reset configuration to default values.
IN: headers:{Authorization:str!}
OUT: 200:{thresholds:obj, features:obj, integrations:obj, security:obj}
ERR: {"401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X POST /admin/config/reset -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"thresholds":{"idleCashThreshold":100000,"liquidityWarningThreshold":50000,"lowBalanceThreshold":10000,"highRiskThreshold":500000},"features":{"enableAutoAnalysis":true,"enableEmailNotifications":true,"enableRecommendationEngine":true,"enableAdvancedReports":false},"integrations":{"bankApiEnabled":false,"webhooksEnabled":false,"apiRateLimit":1000,"maxFileSize":25},"security":{"sessionTimeout":60,"passwordExpiry":90,"requireMfa":false,"auditLogRetention":365}}

---

## Audit Trail Endpoints

EP: GET /admin/audit
DESC: Get paginated audit log entries.
IN: headers:{Authorization:str!} query:{page:int?, limit:int?, search:str?, userId:str?, action:str?, dateFrom:str?, dateTo:str?}
OUT: 200:{logs:arr[obj], totalCount:int, page:int, totalPages:int}
ERR: {"401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X GET "/admin/audit?page=1&limit=25&action=login" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"logs":[{"id":"audit-1","userId":"user-1","userName":"John Admin","userEmail":"admin@example.com","action":"login","resource":"authentication","details":"User logged into the system","severity":"low","ipAddress":"192.168.1.1","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36","timestamp":"2024-10-22T10:30:00Z"}],"totalCount":50,"page":1,"totalPages":2}

---

EP: GET /admin/audit/export
DESC: Export audit logs as CSV file.
IN: headers:{Authorization:str!} query:{search:str?, userId:str?, action:str?, dateFrom:str?, dateTo:str?}
OUT: 200:blob
ERR: {"401":"Unauthorized", "403":"Forbidden - Admin access required", "500":"Internal server error"}
EX_REQ: curl -X GET "/admin/audit/export?action=login&dateFrom=2024-10-01" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." --output audit-logs.csv
EX_RES_200: [CSV file data]
