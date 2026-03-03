import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Badge, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { addOrder, updateStatus } from '@/store/orderSlice';

const OrderManager = () => {
  
  const dispatch = useDispatch();

  const [orders, setOrders] = useState<any[]>([]);  
  const [filter, setFilter] = useState('전체');

  const reduxOrders = useSelector((state: any) => state.order);

useEffect(() => {
  const savedOrders = localStorage.getItem('petbit_orders');
  
  if (savedOrders) {
    setOrders(JSON.parse(savedOrders));
  } else {
    setOrders(reduxOrders);
  }
}, [reduxOrders]);


  const handleStatusChange = (orderId: any, newStatus: any) => {
    const updatedOrders = orders.map(order => 
      order.orderId.toString() === orderId.toString() ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('petbit_orders', JSON.stringify(updatedOrders));
    alert(`주문번호 #${orderId} 상태가 [${newStatus}](으)로 변경되었습니다.`);
  };


  const filteredOrders = orders.filter(order => {
    const currentStatus = order.status || 'received';
    if (filter === '전체') return true;
    return order.status === filter;
  });

  const handleCancelOrder = (orderId: any) => {
    
    if (window.confirm("이 주문을 '취소' 처리하시겠습니까? 내역은 보존됩니다.")) {
      
      
      const updatedOrders = orders.map(order => 
        order.orderId === Number(orderId) ? { ...order, status: '취소' } : order
      );
      
      
      setOrders(updatedOrders);
      localStorage.setItem('petbit_orders', JSON.stringify(updatedOrders));
      
      alert("주문이 취소 처리되었습니다.");
    }
  };



  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">🛒 주문 내역 관리</h4>

      <Row className="mb-4 g-3">
        
        <Col>
          <Card className="text-center border-0 shadow-sm bg-primary text-white h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <div className="small opacity-75">전체 주문</div>
              <h4 className="fw-bold mb-0">{orders?.length || 0}건</h4>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm bg-warning text-dark h-100">
            <Card.Body>
              <div className="small opacity-75">배송 대기</div>
              <h4 className="fw-bold mb-0">
                {orders?.filter(o => o.status === 'received' || o.status === '대기').length || 0}건
              </h4>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm bg-info text-white h-100">
            <Card.Body>
              <div className="small opacity-75">배송 중</div>
              <h4 className="fw-bold mb-0">
                {orders?.filter(o => o.status === 'shipping' || o.status === '배송중').length || 0}건
              </h4>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm bg-success text-white h-100">
            <Card.Body>
              <div className="small opacity-75">배송 완료</div>
              <h4 className="fw-bold mb-0">
                {orders?.filter(o => o.status === 'completed' || o.status === '완료').length || 0}건
              </h4>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="text-center border-0 shadow-sm bg-danger text-white h-100">
            <Card.Body>
              <div className="small opacity-75">취소된 주문</div>
              <h4 className="fw-bold mb-0">
                {orders?.filter(o => o.status === 'cancel' || o.status === '취소').length || 0}건
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-body py-3 d-flex justify-content-between align-items-center">
          <span className="fw-bold">주문 목록</span>
          <Form.Select 
            size="sm" 
            style={{ width: '150px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="전체">전체 보기</option>
            <option value="대기">대기</option>
            <option value="배송중">배송중</option>
            <option value="완료">완료</option>
          </Form.Select>
        </Card.Header>
        
        <Table hover responsive className="mb-0 align-middle text-center">
          <thead className="table-body">
            <tr>
              <th>주문번호</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>결제금액</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.reverse().map((order) => (

                <tr key={order.orderId}>
                  <td className="text-muted small">#{order.orderId}</td>
                  <td className="fw-bold">{order.buyerName}</td>
                  <td>
                    {order.items.map((item: any, index: number) => (
                      <div 
                        key={item.id || index} 
                        className="small text-start py-1"
                        style={{ borderBottom: index === order.items.length - 1 ? 'none' : '1px solid #eee' }}
                      >
                        • {item.name} <small className="text-muted">({item.price.toLocaleString()}원)</small>
                      </div>
                    ))}
                  </td>
                  <td>{(order.amount || 0).toLocaleString()}원</td>
                  <td>
                    <Badge bg={
                      order.status === '취소' ? 'danger' :
                      order.status === '완료' ? 'success' : 
                      order.status === '배송중' ? 'info' : 'warning'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td>

                    <div className="d-flex justify-content-center gap-1">
                      <Button 
                        variant="outline-dark" 
                        size="sm"
                        onClick={() => handleStatusChange(order.orderId, '배송중')}
                        disabled={order.status !== '대기'}
                      >출고</Button>

                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleStatusChange(order.orderId, '완료')}
                        disabled={order.status === '완료'}
                      >완료</Button>

                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleStatusChange(order.orderId, '대기')}
                        disabled={order.status === '대기'}
                      >상태 초기화</Button>



                    </div>

                  </td>

                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      className="px-2 py-0"
                      onClick={() => handleCancelOrder(order.orderId)}
                    >주문 취소</Button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-5 text-muted">주문 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default OrderManager;