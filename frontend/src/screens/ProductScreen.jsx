import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'

function ProductScreen() {
	const params = useParams()

	const [product, setProduct] = useState([])

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${params.id}`)
			setProduct(data)
		}

		fetchProduct()
	}, [params.id])

	return (
		<div>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
								color={'#f8e825'}
							/>
						</ListGroup.Item>
						<ListGroup.Item>
							<p>Price: ${product.price}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<p>Description: {product.description}</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0
											? 'In Stock'
											: 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Button
										size='lg'
										type='button'
										disabled={product.countInStock === 0}>
										Add To Cart
									</Button>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default ProductScreen
