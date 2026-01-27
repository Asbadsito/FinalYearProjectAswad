package com.example.BackEnd.Diet;

import com.example.BackEnd.User.User;
import jakarta.persistence.*;

@Entity
@Table (name = "Diet")
public class Diet {

	@Id
	@Column(nullable = false , unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private User user;
}
