import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cart";

const Shipping = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, userData } = useSelector((state) => state.USER);
  const { shippingAddress } = useSelector((state) => state.CART);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name,
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      pcode: shippingAddress?.pcode,
      country: shippingAddress?.country,
    },
  });

  useEffect(() => {
    if (!isAuth) {
      router.push("/login?redirect=shipping");
    }
  }, [isAuth, router]);

  const saveAddressHandler = (data) => {
    dispatch(saveShippingAddress(data));
  };

  return (
    <>
      <Head>
        <title>Azone | Shipping</title>
      </Head>

      <Container>
        <main className="default-margin shipping">
          <section className="form-container">
            <h1>Shipping Address</h1>
            <Form onSubmit={handleSubmit(saveAddressHandler)}>
              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "full name is required",
                    minLength: { value: 4, message: " min of 4 characters" },
                  })}
                />
              </Form.Group>
              {errors.name && <p className="error">* {errors.name?.message}</p>}

              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    required: "address is required",
                    minLength: { value: 5, message: " min of 5 characters" },
                  })}
                />
              </Form.Group>
              {errors.address && (
                <p className="error">* {errors.address?.message}</p>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="City"
                  {...register("city", {
                    required: "city is required",
                    minLength: { value: 3, message: " min of 3 characters" },
                  })}
                />
              </Form.Group>
              {errors.city && <p className="error">* {errors.city?.message}</p>}

              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  controlId="pcode"
                  type="text"
                  placeholder="Postal Code"
                  {...register("pcode", {
                    required: "postal code is required",
                    minLength: { value: 4, message: " min of 4 characters" },
                  })}
                />
              </Form.Group>
              {errors.pcode && (
                <p className="error">* {errors.pcode?.message}</p>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  controlId="country"
                  placeholder="Country"
                  type="text"
                  {...register("country", {
                    required: "country is required",
                    minLength: { value: 4, message: " min of 4 characters" },
                  })}
                />
              </Form.Group>
              {errors.country && (
                <p className="error">* {errors.country?.message}</p>
              )}

              <div className="d-grid gap-2">
                <Button className="button fw-bold" type="submit">
                  CONTINUE
                </Button>
              </div>
            </Form>
          </section>
        </main>
      </Container>
    </>
  );
};

export default Shipping;
