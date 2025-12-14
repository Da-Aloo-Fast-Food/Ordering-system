<?php
// backend/db.php
class Database {
    private $host = "localhost";
    private $db_name = "da_aloo_orders"; // CHANGE THIS to your database name
    private $username = "your_username"; // CHANGE THIS to your cPanel username
    private $password = "your_password"; // CHANGE THIS to your cPanel password
    public $conn;

    public function getConnection() {
        $this->conn = null;
        
        // Test connection first
        if (!$this->testConnection()) {
            die(json_encode([
                'error' => 'Database connection failed',
                'details' => 'Check credentials in db.php'
            ]));
        }
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username, 
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
        } catch(PDOException $exception) {
            // Log error to file
            $log = __DIR__ . '/db-errors.log';
            file_put_contents($log, date('Y-m-d H:i:s') . " - " . $exception->getMessage() . "\n", FILE_APPEND);
            
            die(json_encode([
                'error' => 'Database connection failed',
                'message' => 'Please check database configuration'
            ]));
        }
        return $this->conn;
    }
    
    private function testConnection() {
        // Simple test - try to connect without database first
        try {
            $test = new PDO(
                "mysql:host=" . $this->host,
                $this->username, 
                $this->password
            );
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>
